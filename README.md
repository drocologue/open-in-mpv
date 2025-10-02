# Open in MPV

OPEN IN MPV IS A FORK OF OPEN IN VLC SO I STOLE EVERYTHING AND MODIFY THE MANIFEST WITH CLAUDE TO USE MPV INSTEAD OF VLC SO DOWNLOAD THIS https://github.com/drocologue/open-in-mpv/tree/master/0.4.3_0%20-%20Copie and load inside chrome with developper mode, u should also have [ytb dl ins](https://github.com/yt-dlp/yt-dlp) installed and set inside ur path, mpv should also be inside ur path and  i think it should work i will maybe make a preview video of this but im lazy  so there we go

preview inside this post https://www.reddit.com/r/mpv/comments/1nvjwt2/open_any_video_in_mpv_even_embedded/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button






in case i never update this thing, go on chromewebstore install the original open in vlc it will be stocked inside this %LOCALAPPDATA%\Google\Chrome\User Data\Default\Extensions u can sort by newly created to found it then, take the open.js inside and give it to claude ai alongside with this prompt and u should be able to fix it:

"I have an updated version of open.js from the Open in VLC extension. I need you to modify it to work with MPV player instead of VLC. The changes should:
1. Replace VLC command-line arguments with MPV equivalents:

Use --http-header-fields=Referer: <url> for referrer
Use --user-agent=<agent> for user agent
Use --force-media-title=<title> for media title

2. Update Windows executable paths to:

C:\Program Files\mpv\mpv.exe
C:\Program Files (x86)\mpv\mpv.exe
%LOCALAPPDATA%\mpv\mpv.exe
C:\mpv\mpv.exe
C:\Program Files\mpv.net\mpv.exe

**3. Update Linux/Mac paths to use mpv command
**4. Change default media-player from 'VLC' to 'MPV'
Here's the original open.js file:
[paste the new open.js content here]"


THEN what it give u copy paste it inside open.js after delete everything inside it before
