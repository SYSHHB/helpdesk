# SYSHHB IT Helpdesk (GitHub Pages + Microsoft sign-in + OneDrive)

What you get
- The same helpdesk as before, hosted free on GitHub Pages.
- Everyone signs in with their school Microsoft account (no passwords to manage).
- All data is stored as files in a OneDrive folder owned by **it.helpdesk@syayasan.edu.bn**.
- **it.helpdesk@syayasan.edu.bn** is the administrator. **zulfa.zaini@syayasan.edu.bn** is a technician.
- The administrator can add, edit, disable and delete people on the **Accounts** page.

Files in this folder
- `index.html`  the whole app (do not edit)
- `config.js`   your settings (you edit this)
- `.nojekyll`   tells GitHub to publish the files as they are

You need about 30 minutes, a GitHub account, and someone who can open Microsoft Entra
(portal.azure.com) for the Yayasan tenant.

---------------------------------------------------------------------------
## Step 1. Create the GitHub site

1. On github.com click **New repository**. Name it, for example, `helpdesk`. Choose **Public**
   (GitHub Pages on a private repository needs a paid plan). Nothing secret is stored in the
   files. The data stays in OneDrive.
2. Click **uploading an existing file** and upload `index.html`, `config.js` and `.nojekyll`.
   Commit.
3. Go to **Settings > Pages**. Under "Build and deployment" choose **Deploy from a branch**,
   branch **main**, folder **/ (root)**, then Save.
4. After a minute your site address appears, like `https://YOURNAME.github.io/helpdesk/`.
   Write it down, including the final `/`.

## Step 2. Register the app with Microsoft

Do this once, signed in to portal.azure.com (Microsoft Entra ID) as an administrator.

1. **Microsoft Entra ID > App registrations > New registration**.
2. Name: `SYSHHB IT Helpdesk`. Supported account types: **Accounts in this organizational
   directory only**.
3. Redirect URI: choose platform **Single-page application (SPA)** and paste your site address
   from Step 1 (for example `https://YOURNAME.github.io/helpdesk/`). It must match exactly,
   including the final `/`. Click Register.
4. On the Overview page copy **Application (client) ID** and **Directory (tenant) ID**.
5. Open **API permissions > Add a permission > Microsoft Graph > Delegated permissions** and add
   `User.Read` and `Files.ReadWrite.All`. If you see the button **Grant admin consent for
   Yayasan**, click it. This avoids every staff member seeing a consent screen or an
   "admin approval required" message.

## Step 3. Fill in config.js

On GitHub open `config.js`, click the pencil icon and replace:

```
CLIENT_ID: "paste the Application (client) ID",
TENANT_ID: "paste the Directory (tenant) ID",
```

Leave the rest as it is for now. Commit. Wait a minute.

## Step 4. First start (creates the OneDrive folder)

1. Open your site address. Click **Sign in with Microsoft**.
2. Sign in as **it.helpdesk@syayasan.edu.bn**.
3. The helpdesk creates the folder **SYSHHB-Helpdesk** in that OneDrive and adds the two people
   from `config.js` (the administrator and Zulfa Zaini as technician).
4. A yellow note on the dashboard shows two lines, `DRIVE_ID` and `FOLDER_ID`. Keep this page open.

## Step 5. Share the folder so everyone can use it

Everyone who uses the helpdesk needs permission to the OneDrive folder, because that is where the
data lives. Choose one:

**Option A. Organisation link (simplest)**
1. Sign in to OneDrive as it.helpdesk@syayasan.edu.bn, find the folder **SYSHHB-Helpdesk**.
2. Share > the link setting > **People in Yayasan** > **Can edit** > Copy link.
3. In `config.js` paste it: `FOLDER_SHARE_URL: "https://...",` and commit.
   (Leave `DRIVE_ID` and `FOLDER_ID` empty in this option.)

**Option B. Specific people or a group (more private)**
1. Share the folder with a Microsoft 365 group or the named staff, **Can edit**.
2. In `config.js` paste the two lines from the yellow note:
   `DRIVE_ID: "...",` and `FOLDER_ID: "...",` and commit.
   New staff then need to be added to the group or the sharing list.

After you commit, reload the site. The yellow note disappears and everyone can sign in.

## Step 6. Day to day

- **First sign-in by a staff member**: they choose their staff group (Non Teaching Staff, Taska
  Teacher, Secondary Teacher or Primary Teacher) and become a **User**.
- **Technicians and administrators**: open **Accounts**, add their school email, choose the role,
  Save. They can sign in straight away.
- **Change a role or staff group**: Accounts > Edit.
- **Stop someone using it**: Accounts > Disable (they see "Account disabled").
- **Remove someone**: Accounts > Delete. If they sign in again they come back as a normal User.
  Use Disable if you want to block them.
- **People list**: everyone who signs in for the first time appears on **Accounts** automatically
  (marked **New** for 7 days). Use the search box and the Role, Status and Staff group filters to
  find people. Edit changes name, role or staff group. Delete removes the record.
- **Giving access to the OneDrive folder**: with the organisation link (Step 5, Option A) everyone in
  Yayasan already has access, so nothing else is needed. With Option B, the **Share access** button
  on a row (and adding someone with Add account) shares the folder with them straight from the
  website. It only works if you are signed in as the folder owner or someone allowed to share it.
- Reports, audit log, complaint photos, notifications, English and Bahasa Melayu, Gregorian and
  Brunei Hijri calendars all work as before.

## Good to know

- **Where the data is**: OneDrive folder `SYSHHB-Helpdesk`: `users.json`, `tickets.json` (with
  comments), `notifs.json`, `settings.json`, `audit-YYYY-MM.json` (one file per month) and a
  `photos` folder. OneDrive keeps version history, so you can restore an earlier version of any
  file. You can also copy the folder as a backup.
- **Updates from other people** appear within about 10 seconds. Change `POLL_SECONDS` to adjust.
- **Security**: the roles (user, technician, admin) are enforced by the page. The real lock is
  who has edit permission to the OneDrive folder. Anyone with edit permission can open the
  files directly in OneDrive. Share with specific people or a group if you need it stricter, and
  do not post the folder link publicly.
- **Size**: `tickets.json` is rewritten on every change. A few thousand complaints is fine. For a
  much larger volume ask for the data to be split by year.
- **Photos**: resized to about 170 KB and stored as small files in `photos`.
- **Sign-in library**: loaded from the jsDelivr CDN (`@azure/msal-browser` 2.38.3). If your
  network blocks it, download that file, put it next to `index.html` as `msal-browser.min.js`
  and change the `<script src=...>` line near the top of `index.html` to `msal-browser.min.js`.
- **Old complaints** from the earlier Claude-hosted version are not copied across automatically.

## Troubleshooting

- `AADSTS50011` redirect URI mismatch: the SPA redirect URI in Entra must equal your site
  address exactly, including the final `/` and `https`.
- `AADSTS65001` or "Need admin approval": click **Grant admin consent** in API permissions.
- `AADSTS700016` application not found: `CLIENT_ID` or `TENANT_ID` in `config.js` is wrong.
- "The helpdesk storage has not been set up yet": the administrator has not finished Step 4 or 5.
- "Microsoft returned 403/404": the person does not have edit permission to the folder
  (Step 5), or the link or IDs in `config.js` are wrong.
- "Live updates paused": the page lost contact with OneDrive. Tap the red bar to reload.

---------------------------------------------------------------------------
## Part 7. Email notifications (optional)

The person who made a complaint gets an email (English and Bahasa Melayu together) when:
- they submit it (with the complaint ID and the details),
- a technician or administrator changes the status, progress, technician or target date,
- a technician or administrator replies with a comment (internal notes are never emailed),
- the complaint is marked resolved or closed.

Choose one way to send them in `config.js` (`EMAIL_MODE`).

**Way 1: `"graph"` (quickest, about 5 minutes)**
1. In Entra > your app > API permissions > Add a permission > Microsoft Graph > Delegated >
   add **Mail.Send**. Click **Grant admin consent** if you see it.
2. In `config.js` set `EMAIL_MODE: "graph",` and commit.
3. Everyone signs in again once and accepts the new permission.
The email is sent from the mailbox of the person who did the action (for example, the technician).
When someone submits a complaint, the confirmation comes from their own address to themselves.

**Way 2: `"outbox"` (emails come from it.helpdesk@syayasan.edu.bn)**
No extra Microsoft permission is needed. The page drops each email into the OneDrive folder
`SYSHHB-Helpdesk/outbox`, and a Power Automate flow sends it. Emails arrive about 1 to 3 minutes
later. Set up the flow once:
1. In OneDrive, inside `SYSHHB-Helpdesk`, create a folder called `outbox`.
2. Sign in to make.powerautomate.com as it.helpdesk@syayasan.edu.bn. **Create > Automated cloud
   flow**. Name it `Helpdesk emails`. Trigger: **When a file is created (properties only)**
   (OneDrive for Business). Folder: click the folder icon and pick **SYSHHB-Helpdesk > outbox** from the list (do not type the path).
3. Add **Get file content** (OneDrive for Business). File: the trigger's **Id**.
4. Add **Compose**. Input (expression): `json(body('Get_file_content'))`.
5. Add **Send an email (V2)** (Office 365 Outlook):
   - To: expression `outputs('Compose')?['to']`
   - Subject: expression `outputs('Compose')?['subject']`
   - Body: expression `outputs('Compose')?['html']`
   - Each box must contain a blue chip made with the **fx** button, not typed text. If your version
     of the action shows an **Is HTML** switch under advanced options, set it to Yes. If it does not,
     the Body box is already an HTML editor and you can skip this.
6. Add **Delete file** (OneDrive for Business). File: the trigger's **Id**.
7. Save and turn the flow on. In `config.js` set `EMAIL_MODE: "outbox",` and commit.

If an email does not arrive: check the Junk folder, then the flow's **Run history**. In "graph"
mode the page shows an orange note when Microsoft refuses to send.

---------------------------------------------------------------------------
## Part 8. Install the helpdesk as an app on a phone

The package includes `manifest.webmanifest`, `sw.js` and an `icons` folder. Upload all of them to
the same place as `index.html` (the repository root). Keep the folder name `icons` exactly.

Then on the phone, open the helpdesk address in **Edge or Chrome**:
- Edge: tap the menu (three lines or dots) > **Add to phone** or **Install app**.
- Chrome: tap the menu (three dots) > **Install app** (or **Add to Home screen**).
The helpdesk then opens full screen from its own icon, like a normal app.

If the menu only offers **Create shortcut**, the manifest files are not on GitHub yet, or the page
has not reloaded since you uploaded them. Check that `https://YOURNAME.github.io/helpdesk/manifest.webmanifest`
opens in the browser and shows text. Then close the tab, open the helpdesk again, and retry.

---------------------------------------------------------------------------
## Part 9. Let people reply to helpdesk emails

When this is on, every helpdesk email says "You can reply to this email". The reply goes to
it.helpdesk@syayasan.edu.bn, a small Power Automate flow saves it in OneDrive, and the helpdesk adds
it to the complaint as a comment (marked "by email"). Only replies from the person who made the
complaint, or from technicians and admins, are accepted. Others are ignored and noted in the Audit log.

Every email also has a **Reply or view in the helpdesk** button that opens the complaint directly.
That button works without any setup.

**Set up the reply flow once (2 steps, signed in to Power Automate as it.helpdesk@syayasan.edu.bn)**
1. In OneDrive, inside `SYSHHB-Helpdesk`, create a folder named `inbox` (lowercase).
2. make.powerautomate.com > **Create** > **Automated cloud flow**. Name: `Helpdesk email replies`.
   Trigger: **When a new email arrives (V3)** (Office 365 Outlook). Click Create.
   - Folder: **Inbox**.
   - Under advanced parameters, **Subject Filter**: `SYSHHB-IT-`
3. Add the action **Create file** (OneDrive for Business):
   - Folder Path: click the folder icon and pick **SYSHHB-Helpdesk > inbox** (do not type it).
   - File Name: click the box, choose **fx**, paste `concat(guid(),'.json')`, click Add.
   - File Content: click the box, choose **fx**, paste `string(triggerBody())`, click Add.
4. Save. Make sure the flow is **On**.

**Then switch it on in the helpdesk**
In `config.js` on GitHub add this line under `EMAIL_MODE`:
```
  EMAIL_REPLIES: true,
```
Commit, wait 2 minutes, reopen the helpdesk.

Replies are picked up while a technician or admin has the helpdesk open (it checks every minute).
If nobody has it open, they appear the next time someone does.

---------------------------------------------------------------------------
## Part 10. Emails to the helpdesk team

When a person submits a complaint, replies on it, or reopens it, an email with the subject
`[ALERT] ...` is sent to **it.helpdesk@syayasan.edu.bn** and to the technician assigned to the
complaint. It includes the complaint details, the person's message and a button that opens
the complaint.

To send these emails to other addresses as well, add this line to `config.js`:
```
  NOTIFY_EMAILS: ["it.helpdesk@syayasan.edu.bn", "someone@syayasan.edu.bn"],
```
If you do not add it, the addresses in `ADMIN_EMAILS` are used.

These alert emails are ignored by the email-reply feature (Part 9), so they never turn into
duplicate comments. Replies to them are ignored too. To answer a person, use the helpdesk button.

---------------------------------------------------------------------------
## Part 11. Let new staff sign in on their own (no manual adding)

New people can sign in by themselves only when the OneDrive folder is open to everyone with a
school account. If it is shared person by person, they see "Almost there. You can't open the
helpdesk yet."

**Switch it on (about one minute)**
1. Sign in as administrator. On the **Home** page (or **Accounts**) you will see a yellow box:
   "New staff cannot sign in on their own yet."
2. Tap **Create the sign-up link**. A link appears. Tap **Copy**.
3. On GitHub open `config.js`, click the pencil icon and paste the link between the quote marks:
   ```
   FOLDER_SHARE_URL: "paste the link here",
   ```
   Commit, wait 2 minutes, reopen the helpdesk.
4. The box turns green: **Sign-up is open.**

After that, a new person only needs to tap **Sign in with Microsoft**, confirm their name, staff
group and phone number, and they appear in **Accounts** as a User. You can edit, disable or delete
them there later. Technicians and administrators still need to be added or changed by you.

If the button says it could not create the link, your Microsoft 365 may block organisation-wide
links. In OneDrive open the folder `SYSHHB-Helpdesk`, choose **Share**, set it to **People in your
organization** with **Can edit**, copy that link and paste it into `config.js` the same way.

---------------------------------------------------------------------------
## Part 12. If "Install app" does not appear on the phone

The phone only offers to install the helpdesk when ALL of these files are on GitHub, in the SAME
place as `index.html` (not inside a folder):
- `manifest.json`
- `sw.js`
- `app-icon-192.png`
- `app-icon-512.png`
- `app-icon-maskable.png`
- `app-apple-touch.png`

Upload them with **Add file > Upload files**. Wait 2 minutes, close the browser tab completely
and open the helpdesk again.

Not sure which one is missing? Tap **Install app on this phone** in the helpdesk. The window that
opens checks the files and shows a green tick for each one that is there, and a red cross with
the name of each one that is missing.

---------------------------------------------------------------------------
## Part 13. Security settings

These settings are in `config.js`.

**1. Content Security Policy (`CSP: true`)**
The page may only run its own code, load the Microsoft sign-in library, and talk to Microsoft
and OneDrive. Code injected by someone else is refused. If something stops working after an
update, set `CSP: false`, commit, and tell the developer. Set it back to `true` afterwards.
Note: GitHub Pages cannot send the "frame-ancestors" protection, so the page can still be
shown inside someone else's frame.

**2. Fingerprint for the Microsoft sign-in library (`MSAL_SRI`)**
1. Sign in as administrator and open **Accounts**.
2. In **Security checks**, tap **Create the fingerprint**, then **Copy**.
3. On GitHub open `config.js`, replace the line that starts with `MSAL_SRI` with the copied
   line, and commit.
From then on the browser refuses to run the library if it is ever changed. If everyone suddenly
cannot sign in and sees "failed its security check", clear the `MSAL_SRI` value and tell the
developer. The fingerprint is created from the library as it is today, so create it once and
do not change the library version without making a new one.

**3. Automatic sign-out (`IDLE_MINUTES`)**
After 30 minutes without touching the app, the person is signed out of the helpdesk. A message
warns them one minute before, with a **Stay signed in** button. It also works if the app was
closed and opened again later. Set `IDLE_MINUTES: 0` to turn it off. With
`IDLE_FULL_SIGNOUT: true` the Microsoft account on that phone is signed out too.
