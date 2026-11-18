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
- a technician or administrator changes the status, progress, technician or expected completion,
- a technician or administrator replies with a comment (internal notes are never emailed),
- the complaint is marked resolved or completed.

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
   - Under advanced parameters, **Subject Filter**: `IT-20`
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
It is OFF (`IDLE_MINUTES: 0`). People stay signed in until they tap the sign-out button. To turn it
on, put a number of minutes there, for example `30`: after that long without touching the app the
person is signed out of the helpdesk, with a warning one minute before and a **Stay signed in**
button. With `IDLE_FULL_SIGNOUT: true` the Microsoft account on that phone is signed out too.

Note: Microsoft itself can still ask someone to sign in again, for example after about a day of
not using the app or after a password change. This is Microsoft's rule for web apps, not the
helpdesk's. The helpdesk renews the sign-in quietly in the background and, if Microsoft needs
more, sends the person to Microsoft, who usually bring them straight back without asking for a
password.

---------------------------------------------------------------------------
## Part 15. Answers to the security assessment

* **Roles are only checked in the browser (high).** True: this system has no server of its own.
  Every signed-in person has a Microsoft token that can open the OneDrive data folder, so the
  admin / technician / user roles protect the screens, not the files. Real protection needs a small
  server that checks each person's role (see the plan given with this update).
* **Sharing link in config.js (high).** The link is created by the helpdesk as an "organization"
  link, so only signed-in people from the school can use it. Check in OneDrive: open the folder
  `SYSHHB-Helpdesk`, choose Manage access, and make sure the link says "People in your organization"
  and not "Anyone". The link is not a secret: it only works for people who already have school accounts.
* **Security headers (medium).** GitHub Pages cannot send headers. Put Cloudflare (free) in front
  of `helpdesk.syayasan.edu.bn` and add the headers there: Strict-Transport-Security,
  X-Content-Type-Options: nosniff, and a Content-Security-Policy with frame-ancestors 'none'.
  Until then the page protects itself: it refuses to run when shown inside another website
  (`ALLOW_FRAMING: false`), and it applies its own Content Security Policy.
* **Public details in config.js (info).** The Client ID, Tenant ID, admin emails and folder IDs are
  not secrets. They are in every web app of this kind.

---------------------------------------------------------------------------
## Part 16. Microsoft sign-in library from your own website (no outside download)

The sign-in library (`msal-browser.min.js`, version 2.38.3) normally comes from jsDelivr on the internet.
You can serve it from your own website instead, so no outside code is loaded at all:
1. Upload `msal-browser.min.js` to GitHub, in the same place as `index.html`.
2. In `config.js` change `MSAL_LOCAL: false,` to `MSAL_LOCAL: true,` and commit.
3. Wait 2 minutes, close the app completely and open it again. Accounts > Security checks now says
   "The Microsoft sign-in library is served from your own website."
If sign-in ever stops working after this, set `MSAL_LOCAL` back to `false`.

The other way (still loading from the internet, but refusing a changed file) is the fingerprint in
`MSAL_SRI`. For the exact file version 2.38.3 the fingerprint is:
`MSAL_SRI: "sha384-OJTwghM0Gh3Zc+gmd6l0lz1pFw9KuHHq0mSEZgmQEKgMnuSWWDb3bU9KzuD7w2hU",`
Use only one of the two ways. Serving your own copy is simpler and safer.

---------------------------------------------------------------------------
## Part 17. The status "Closed" is now called "Completed"

Everywhere people read it (dashboard, complaint list, complaint page, history, notifications, emails,
WhatsApp message, exports, user guide), the last status is now **Completed** (Malay: **Selesai**).
The technician button is now **Complete**, and the switch in the reply box is **Complete on send**.
Old complaints, history lines and notifications that were saved with the word "Closed" are shown as "Completed" too.
Nothing in the data changes: the status is still saved as `closed` inside, so no old record breaks.
In Malay, **Resolved** is now **Diselesaikan** so it is not the same word as **Selesai** (Completed).

---------------------------------------------------------------------------
## Part 18. "Target date" is now called "Expected Completion"

Everywhere people read it, the date a technician sets for finishing a complaint is now called
**Expected Completion** (Malay: **Jangkaan Siap**): the complaint page, the Update panel, the dashboard card
"Past their expected completion", the reports, the history lines, notifications, emails, the WhatsApp message,
the CSV exports and the user guide. History lines and notifications that were saved earlier with the old
words are shown with the new words too. The date itself is saved exactly as before, so nothing breaks.

---------------------------------------------------------------------------
## Part 19. The loading screen (refresh screen)

The emblem fades in with a thin ring around it. A yellow arc on the ring, the loading meter under "Yayasan Sultan
Haji Hassanal Bolkiah" and the number in "Loading... 63%" all grow together (they are one animation), first fast
and then slowly, and wait near the end until the app is ready. Under it: "Thank you for your patience."
In Malay it reads "Memuatkan... 63%" and "Terima kasih kerana bersabar.".
The bar is time-based, not a measure of the real download, and it never shows 100% because the app takes over first.
People who have switched off animations on their phone see a still ring and bar.

---------------------------------------------------------------------------
## Part 20. The helpdesk now looks like the SYSHHB Portal

The page is a dark green gradient. The top of every screen is a glossy green panel with the system name,
"Yayasan Sultan Haji Hassanal Bolkiah", the bell, language, light/dark and sign-out buttons, the Gregorian and
Hijri date cards and the clock (yellow seconds). Cards are dark and rounded, the active tab in the bottom bar is a
glossy green pill, and the phone's status bar colour is the same green as the Portal. In light mode the page is a
light green gradient with white cards and the same green header panel. Nothing in the data or the settings changes.

---------------------------------------------------------------------------
## Part 21. Cover technician (for when a technician is on leave)

Accounts page (administrators only), panel **Cover technician**:
1. Choose the person, optionally write a note (for example "covering for Zulfa") and an end date.
2. Leave the box "Also make them a technician" ticked if the person is a normal user, so they can see and answer
   complaints. If they are already a technician or administrator nothing changes.
3. Press **Add cover technician**.

While the cover is active, that person also gets the email alerts that the helpdesk mailbox and the assigned
technician get: a new complaint, a reply from the person who complained, a reopened complaint and an escalation.
The cover ends after the end date, or when you press **Stop** (an ended cover stays in the list as "Ended" until you stop it).
Stop also puts the person back to User if the system had made them a technician; you are asked first.
Everything is written in the audit log (Cover technician added / stopped).

Good to know:
* The alert emails are sent from the phone of the person who acts (as before), so the cover receives them when
  someone uses the helpdesk. Status changes made by a technician still go to the person who complained only.
* The end date counts in Brunei time and the cover is active through the end date itself.
* Everyone who is signed in can read the cover list (it is needed to address the emails); only administrators can change it.

---------------------------------------------------------------------------
## Part 22. Wide screens follow the Document Storage layout

On computer screens (wider than about 820 pixels) the helpdesk uses the same frame as the SYSHHB Document Storage:
a 241-pixel side menu with a bigger logo and bold menu names, a taller green header panel (bigger title, taller date
cards, a bigger clock), page content that fills the full width next to the header panel, and a larger page heading.
The date is not repeated beside the page heading any more because the header already shows it.
Phones are unchanged.

---------------------------------------------------------------------------
## Part 23. Alerts for complaints that stay pending for more than 1 day

A complaint that is still **Open, In progress or On hold** more than 1 day (24 hours) after it was submitted triggers
an alert, and again for every further day until it is Resolved or Completed:
* **In the system:** a notification for every administrator and every technician (the bell, plus a message when the
  helpdesk opens). The dashboard shows a banner and a new first row in "Needs attention" ("Open, in progress or on hold
  over 1 day"); tapping either lists those complaints. Complaint cards show "Waiting 2d" (or "Not attended 2d" when nobody has attended an open one).
* **By email:** ONE email per round, listing every complaint that crossed a new day, with a link to each. It goes to the
  helpdesk mailbox (NOTIFY_EMAILS), every active technician and administrator, and any cover technician.
  The person who complained is not emailed. The subject starts with "[ALERT]" and is in English and Malay.
* Each complaint gets at most one reminder per day. If several team members have the helpdesk open at the same moment,
  only one of them creates each reminder, and usually the same person sends the one email (in rare cases of exactly
  simultaneous opening it can be split into two emails, but no complaint is ever listed twice).
* The audit log records every round ("Pending alert sent").

Good to know:
* The alerts are produced by the helpdesk itself, so they appear when at least one technician or administrator has the
  helpdesk open (it checks when it opens and every 5 minutes). If nobody opens it for a day, the alerts for that day come
  out the next time someone does. The "Needs attention" row and the banner always show the true count.
* The 1 day is counted from the moment the complaint was submitted, whatever its status is now.
* The emails are sent from the mailbox of the person whose helpdesk made the reminder (as with the other alert emails).
* The server version (helpdesk-server) lets only a technician or administrator create a reminder, only for a complaint that really
  is pending that long, and only once.

---------------------------------------------------------------------------
## Part 24. The Supervisor role

A new role, **Supervisor**, for someone who monitors the whole helpdesk. An administrator chooses it on the
Accounts page (Role: User, Technician, Supervisor, Admin). Malay name: **Penyelia**.

A supervisor CAN:
* see every complaint, the dashboard, the calendar and the reports, and create reports (the technician filter starts on "all");
* read the Audit log (read-only);
* get the same notifications as the administrators (the bell and the pop-ups), including the daily reminder for complaints
  pending over 1 day;
* get the same alert emails (new complaint, reply, reopened, escalated, and the daily reminder email);
* assign a complaint to a technician (Update, then Assigned to) and use the normal update panel and comments, including internal notes;
* use the user guide tab "For supervisors".

A supervisor CANNOT: open the Accounts page, add or change accounts and roles, use the cover-technician panel, import data,
change the Brunei calendar or the security settings, or delete complaints. Those stay with the administrators.

Details:
* A supervisor is not a technician: she does not appear in the "Assigned to" list, there is no "Assign to me" button, her
  "Start work" does not assign the complaint to her, and her updates do not count as "a technician has attended".
* Requesters' browsers cannot read the account list, so the administrator's browser keeps a small shared list of the
  supervisors' email addresses up to date automatically (it updates when an administrator opens the helpdesk after a role change).
  Until an administrator has opened the helpdesk once after you upgrade, a requester's action may not email the supervisors yet.
* In the server version (helpdesk-server) the same rules are enforced on the server.

---------------------------------------------------------------------------
## Part 25. Administrators can delete a complaint

On a complaint page, administrators see a **Delete** button (next to Comment). It asks for confirmation, then
permanently removes the complaint and every one of its comments (public and internal). This cannot be undone.
Nothing else is touched: other complaints, accounts, the audit log and past notifications are unaffected.
Only an administrator can do this — technicians, supervisors and the person who complained never see the button,
and the server refuses the request from anyone else. Every deletion is written to the audit log.

---------------------------------------------------------------------------
## Part 26. Administrators can reset the ticket numbering

Accounts page, panel **Reset ticket numbering** (administrators only): one row per year that has ever had a
complaint, plus the current year. Each row shows the next number that would be given out, and you can either type
a new number and press **Save**, or press **Reset to 0** to start that year's numbering over from `IT-year-0001`.

Only lower a number if you are sure no complaint already uses it or a higher one in that year. If you do, new
complaints for that year automatically skip past any numbers already in use (the server and the OneDrive version
both guarantee a number is never given out twice), so nothing breaks, but the numbers will not be perfectly
sequential. Every change is written to the audit log.

---------------------------------------------------------------------------
## Part 27. Import data (the panel works without the server now)

Accounts page, panel **Import data** (administrators only): upload one or more JSON files, each with a
top-level `"docs"` object, named `users.json`, `tickets.json`, `notifs.json`, `settings.json` or
`audit-YYYY-MM.json` (and a photos folder, if there is one). This now works on the live OneDrive-based
helpdesk too, not only after switching to the server. On OneDrive, all the new records for one shared file
(for example every complaint in `tickets.json`) are merged in with **one** read-and-write, so importing
hundreds of records takes a few seconds instead of minutes.

---------------------------------------------------------------------------
## Part 28. Administrators can submit a complaint on behalf of someone else

On **New complaint**, administrators see an extra field, **Submit on behalf of**:
* **Myself** (default): works exactly as before.
* **Anyone already in Accounts**: pick them from the list. The complaint is filed under their real
  name, email and phone, and the "we received your complaint" email goes to them, not to the admin.
* **Someone not listed...**: type their school email and their name. If they have never signed in before,
  nothing is created for them yet — the complaint is simply filed under that email and name. The **first
  time they do sign in**, they go through the normal "Confirm your details" step, exactly like anyone else's
  first sign-in, and from then on they see this complaint as their own.

The complaint's history keeps an honest record of this: a line reading "Complaint submitted on behalf of
&lt;name&gt; by &lt;admin's name&gt;." Only an administrator sees or can use this field; everyone else's New
complaint form is unchanged. The server enforces the same rule: only an administrator may set who a complaint
is really from, the email must be a `syayasan.edu.bn` address, and a name is required for anyone not already
registered.

---------------------------------------------------------------------------
## Part 29. The requester's email, and a safer place for Delete

**Email on the complaint page.** Staff now see the requester's email under "Requested by", next to the
phone number. If there is none on file — this is common for the complaints imported from the old
Spiceworks system, which had no email for many of them — administrators see **Add their email**
instead. Typing it in fixes future update emails for that complaint; it does not resend anything that
already failed to send. Only an administrator can add or change it, and it must be a `syayasan.edu.bn`
address. If the complaint's owner wasn't a real email (as with every Spiceworks import), saving a real
one also makes that the owner, so the real person can see the complaint as their own once they sign in.

**Delete moved out of the row of everyday buttons.** It used to sit at the end of Update.../Comment and
could be cramped or pushed out of view on some phones. It is now its own clearly marked row underneath,
so it is easy to find and hard to tap by accident.

---------------------------------------------------------------------------
## Part 30. Fixed: new complaints and replies weren't emailing every technician

The email for a new complaint, a reply from the person who complained, a reopened complaint, or an
escalation used to go only to the helpdesk mailbox, the one technician already assigned (if any), any
cover technician, and supervisors. A brand-new complaint has no assigned technician yet, so in practice
**no technician was emailed at all** until someone picked it up by hand.

Every one of those emails now goes to the helpdesk mailbox, **every active technician, supervisor and
administrator**, and any cover technician — the same full list the once-a-day pending reminder already
used. The person who just did the action is still left off their own notification.

On the server-backed version, a person who only has their own account (everyone except staff) cannot read
the account list directly, so their browser now uses the same small shared staff directory that already
carried the supervisors list — it now carries every technician and administrator too, kept in sync by an
administrator's browser.

---------------------------------------------------------------------------
## Part 30. Every staff member is told about a case update, not just new cases

New complaints already reached every administrator, technician and supervisor (and any cover
technician). Case **updates** did not: only the person who complained was told. Now, whenever a
technician, supervisor or administrator updates a complaint (status, progress, assignment, expected
completion, priority, or a message) — including to a complaint they didn't create — every other staff
member gets:
* **A notification** in the bell, just like for a new complaint.
* **An email**, subject starting with "[ALERT]", showing what changed and any message.

The person who made the update doesn't get a copy of their own notification (they already know).
Escalating to High or Urgent priority still sends its own, more specific "Escalated to..." alert
instead of the generic one — never both for the same update. The requester's own notification and
email are unchanged.

---------------------------------------------------------------------------
## Part 31. The User guide now looks like a documentation site (GitBook style)

The guide used to be a single swipeable card, one step at a time. It's now a two-pane layout like a
docs site: a left sidebar lists every section ("Using the helpdesk", "For technicians", and, for the
people who can see them, "For supervisors" and "For administrators") with all of that section's topics
underneath, and the right-hand pane shows the full page for whichever topic is selected, with a
breadcrumb at the top and "Previous" / "Next" links at the bottom that also move between sections.

On a phone, the sidebar becomes a slide-in panel opened with a **Contents** button; picking a topic
closes it automatically. Nothing about the guide's actual content changed, including which sections
each role can see — only how it's browsed.
