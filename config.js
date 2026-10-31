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

  /* How often the page checks OneDrive for changes made by other people. */
  POLL_SECONDS: 10
};
