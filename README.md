# Open in MPV

**Open in MPV** is a fork of Open in VLC. I took everything and modified the manifest with Claude to use MPV instead of VLC.

## Installation Instructions

1. **Download the extension:**  
   Get it from [https://github.com/drocologue/open-in-mpv/tree/master/0.4.3_0%20-%20Copie](https://github.com/drocologue/open-in-mpv/tree/master/0.4.3_0%20-%20Copie)

2. **Load in Chrome:**  
   Enable Developer Mode in Chrome and load the unpacked extension.

3. **Prerequisites:**
   - Install [yt-dlp](https://github.com/yt-dlp/yt-dlp) and add it to your PATH
   - Install MPV and add it to your PATH

If everything is set up correctly, it should work. I might make a preview video later, but I'm lazy, so here we go.

## Preview
Check out the preview in this Reddit post:  
[https://www.reddit.com/r/mpv/comments/1nvjwt2/open_any_video_in_mpv_even_embedded/](https://www.reddit.com/r/mpv/comments/1nvjwt2/open_any_video_in_mpv_even_embedded/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button)

## Manual Update Instructions

In case I never update this extension, here's how to do it yourself:

1. Go to the Chrome Web Store and install the original **Open in VLC** extension
2. Find it in `%LOCALAPPDATA%\Google\Chrome\User Data\Default\Extensions`  
   (Sort by "Date Created" to find the newest one)
3. Extract the `open.js` file
4. Give it to Claude AI along with this prompt:

```
I have an updated version of open.js from the Open in VLC extension. I need you to modify it to work with MPV player instead of VLC. The changes should:

1. Replace VLC command-line arguments with MPV equivalents:
   - Use --http-header-fields=Referer: <url> for referrer
   - Use --user-agent=<agent> for user agent
   - Use --force-media-title=<title> for media title

2. Update Windows executable paths to:
   - C:\Program Files\mpv\mpv.exe
   - C:\Program Files (x86)\mpv\mpv.exe
   - %LOCALAPPDATA%\mpv\mpv.exe
   - C:\mpv\mpv.exe
   - C:\Program Files\mpv.net\mpv.exe

3. Update Linux/Mac paths to use mpv command

4. Change default media-player from 'VLC' to 'MPV'

Here's the original open.js file:
[paste the new open.js content here]
```

5. Copy the output from Claude and paste it into `open.js` (delete the old content first)

That's it!
