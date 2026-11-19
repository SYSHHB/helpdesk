
---------------------------------------------------------------------------
## How updates reach users

- When you upload a new version of `index.html`, `update.js` or `sw.js`, each person's browser
  downloads it in the background. A banner appears at the bottom of the screen: **"A new version
  of the helpdesk is ready" > Reload**. Nothing reloads by itself, so a complaint being typed is
  never lost. Tap **Later** to keep working.
- To make sure phones pick up an update, change the version number at the top of `sw.js`
  (`CACHE = "syshhb-helpdesk-v11"` to `v12`) every time you release changes.
- **Important for developers:** the security policy in `index.html` contains a fingerprint
  (`sha256-...`) of the app's main script. If that script is edited, the app is blocked until the
  fingerprint is updated. Run this in the same folder after any change to `index.html`:

```
python3 -c "import re,hashlib,base64;h=open('index.html',encoding='utf-8').read();s=re.findall(r'<script(?![^>]*\bsrc=)[^>]*>(.*?)</script>',h,re.S)[1];print('sha256-'+base64.b64encode(hashlib.sha256(s.encode()).digest()).decode())"
```

  Paste the printed value in place of the old `sha256-...` in the `POLICY` text near the top of
  `index.html`, then commit. If you are unsure, set `CSP: false` in `config.js` temporarily.
