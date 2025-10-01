/* global Native */

const is = {
  mac: /Mac/i.test(navigator.platform),
  linux: /Linux/i.test(navigator.platform)
};

const open = async (tab, tabId, referrer) => {
  const {url} = tab;
  const {title} = tab;

  const prefs = await chrome.storage.local.get({
    'media-player': 'MPV',
    'path': null,
    'send-title-meta': true,
    'one-instance': true,
    'send-referrer': true,
    'send-user-agent': true,
    'custom-arguments': [],
    'runtime': 'com.add0n.node'
  });

  const args = {
    pre: [],
    url,
    post: []
  };

  if (prefs['custom-arguments'].length) {
    args.pre.push(...prefs['custom-arguments']);
  }

  // MPV specific arguments
  if (prefs['send-referrer'] && referrer) {
    args.pre.push(`--http-header-fields=Referer: ${referrer}`);
  }
  
  if (prefs['send-user-agent']) {
    args.pre.push(`--user-agent=${navigator.userAgent}`);
  }

  if (title && prefs['send-title-meta']) {
    args.pre.push(`--force-media-title=${title}`);
  }

  // decode Google URLs
  if (url.startsWith('https://www.google.') && url.includes('&url=')) {
    args.url = decodeURIComponent(url.split('&url=')[1].split('&')[0]);
  }

  const native = new Native(tabId, prefs.runtime);
  const executable = await open.executable(prefs);

  if (is.mac) {
    native.exec(executable.path, [
      ...args.pre,
      args.url,
      ...args.post
    ]);
  }
  else if (is.linux) {
    native.exec(executable.name, [
      ...args.pre,
      args.url,
      ...args.post
    ]);
  }
  else { // Windows
    const res = await native.env();
    const paths = open.suggestions(prefs, res);

    const r = await chrome.runtime.sendNativeMessage(prefs.runtime, {
      permissions: ['fs'],
      args: [...paths],
      script: `
        const fs = require('fs');
        const exist = path => new Promise(resolve => fs.access(path, fs.F_OK, e => {
          resolve(e ? false : true);
        }));
        Promise.all(args.map(exist)).then(d => {
          push({d});
          done();
        }).catch(e => push({e: e.message}));
      `
    }).catch(e => {
      console.warn('Unexpected Error', e);
      return '';
    });

    let path = executable.path;
    if (r && r.d) {
      // Check common MPV installation paths
      for (let i = 0; i < paths.length; i++) {
        if (r.d[i]) {
          path = paths[i];
          break;
        }
      }
    }
    
    await chrome.storage.local.set({
      path,
      ['path-' + prefs['media-player']]: path
    });

    native.exec(path, [
      ...args.pre,
      args.url,
      ...args.post
    ]);
  }
};

open.executable = prefs => {
  if (is.mac) {
    if (prefs.path) {
      return {
        name: prefs.path,
        path: prefs.path
      };
    }
    return {
      name: 'mpv',
      path: '/usr/local/bin/mpv'
    };
  }
  else if (is.linux) {
    return {
      name: 'mpv'
    };
  }
  else { // Windows
    if (prefs.path) {
      return {
        path: prefs.path
      };
    }
    return {
      path: 'C:\\Program Files\\mpv\\mpv.exe'
    };
  }
};

open.suggestions = (prefs, res) => {
  // Common MPV installation paths on Windows
  return [
    res.env['ProgramFiles'] + '\\mpv\\mpv.exe',
    res.env['ProgramFiles(x86)'] + '\\mpv\\mpv.exe',
    res.env['LOCALAPPDATA'] + '\\mpv\\mpv.exe',
    'C:\\mpv\\mpv.exe',
    res.env['ProgramFiles'] + '\\mpv.net\\mpv.exe'
  ];
};