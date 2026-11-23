/* SYSHHB IT Helpdesk settings.
   Edit this file on GitHub, then wait a minute for the site to update. */
window.HELPDESK_CONFIG = {
  /* From Microsoft Entra ID > App registrations > your app > Overview */
  CLIENT_ID: "598ea952-e9df-4684-a109-85832dc34e59",
  TENANT_ID: "d3ab4c65-3ba1-4c04-98fd-66a0c7730cdf",

  /* Only accounts that end with this domain can sign in. */
  ALLOWED_DOMAIN: "syayasan.edu.bn",

  /* These people are always administrators. */
  ADMIN_EMAILS: ["it.helpdesk@syayasan.edu.bn"],

  /* Created automatically the first time the helpdesk starts. */
  SEED_USERS: [
    { email: "it.helpdesk@syayasan.edu.bn", name: "IT Helpdesk", role: "admin", dept: "" },
    { email: "zulfa.zaini@syayasan.edu.bn", name: "Zulfa Zaini", role: "technician", dept: "" }
  ],

  /* Where the data is kept: a folder in the OneDrive of it.helpdesk@syayasan.edu.bn */
  FOLDER_NAME: "SYSHHB-Helpdesk",

  /* SIGN-UP FOR EVERYONE: in the helpdesk, sign in as admin, tap "Create the sign-up link",
     copy the link and paste it between the quotes below. Then new staff can sign in by themselves. */
  FOLDER_SHARE_URL: "https://syayasanedu-my.sharepoint.com/:f:/g/personal/it_helpdesk_syayasan_edu_bn/IgAKpIW5K99YR45CJ9Jw58-qAcka9cxl_Yrk_0kNIXuTFYY",
  /* The folder the data is kept in (you can leave these as they are). */
  DRIVE_ID: "b!R_lPWUdjfEuqzVrRupLxSE47Uqs5BWdEtWJhDv2jn1e619-HvmPEQrnstLIZc1T6",
  FOLDER_ID: "01O26XY4QKUSC3SK67LBDY4QRH2JYOPT5K",

  /* Email notifications to the person who made the complaint:
     "off"    no emails (use this until you finish the steps in README, part 7)
     "graph"  sent from the signed-in person's own mailbox (quickest; needs the Mail.Send permission)
     "outbox" sent from it.helpdesk@syayasan.edu.bn by a small Power Automate flow (needs the flow) */
  EMAIL_MODE: "graph",

  /* Who gets the [ALERT] emails when a person submits, replies on or reopens a complaint.
     The technician assigned to the complaint is always added. */
  NOTIFY_EMAILS: ["it.helpdesk@syayasan.edu.bn"],

  /* Set to true only after you build the reply flow (README, part 9). */
  EMAIL_REPLIES: false,

  /* Hijri date on the login page. Signed-in people always see the dates from the calendar
     settings. A phone that has never signed in cannot read them, so copy the two lines shown in
     Calendar > Brunei calendar settings (in the helpdesk) over these two lines. */
  HIJRI_ADJ: -1,
  HIJRI_STARTS: {},

  /* SECURITY
     CSP: true keeps the page limited to its own code (recommended). If something stops working
     after an update, set it to false, tell the developer, and set it back to true. */
  CSP: true,
  /* The helpdesk refuses to be shown inside another website (protects against click-tricking).
     Set to true only if you deliberately embed it, for example in a Teams tab. */
  ALLOW_FRAMING: false,
  /* 0 = never sign people out automatically: they stay signed in until they tap sign out.
     To turn automatic sign-out on, put the number of idle minutes here, for example 30. */
  IDLE_MINUTES: 0,
  /* false = only the helpdesk signs out (one tap to sign back in).
     true = also sign out of the Microsoft account on this phone (asks for the password again). */
  IDLE_FULL_SIGNOUT: false,
  /* Fingerprint that locks the Microsoft sign-in library. Create it in the helpdesk:
     Accounts > Security checks > Create the fingerprint, then paste the line here. */
  MSAL_SRI: "sha384-OJTwghM0Gh3Zc+gmd6l0lz1pFw9KuHHq0mSEZgmQEKgMnuSWWDb3bU9KzuD7w2hU",
  /* true = load the Microsoft sign-in library from your own website (the file msal-browser.min.js next to
     index.html) instead of from the internet. Upload that file to GitHub first, then set this to true. */
  MSAL_LOCAL: false,

  /* How often the page checks OneDrive for changes made by other people. */
  POLL_SECONDS: 10
};
