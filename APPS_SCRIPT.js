/*
╔════════════════════════════════════════════════════════════════════════════════╗
║                  TORQUE 2K26 REGISTRATION — GOOGLE APPS SCRIPT                 ║
║                         (Paste into script.google.com)                          ║
╚════════════════════════════════════════════════════════════════════════════════╝

SETUP STEPS:
───────────
1. Go to script.google.com → New Project
2. Name it "Torque 2K26 Registration"
3. Paste this entire file replacing the default code
4. Replace YOUR_SHEET_ID_HERE with your Google Sheet ID
   (Find it in Sheet URL: docs.google.com/spreadsheets/d/SHEET_ID/edit)
5. Replace YOUR_EMAIL with real coordinator emails in coordinatorMap
6. Add all 14 event/workshop names to coordinatorMap with their coordinator emails
7. Deploy → New Deployment → Web App
   • Execute as: Me (your account)
   • Who has access: Anyone
8. Copy the deployment URL (looks like: https://script.google.com/macros/d/...)
9. Paste deployment URL into src/data/data.js → festInfo.appsScriptUrl
10. Test locally with npm run dev before merging to main

GOOGLE SHEET SETUP:
──────────────────
1. Create a new Google Sheet
2. Add one sheet named exactly: MASTER
3. Optionally add a header row (A1:Q1) for readability:
   Timestamp | RegID | Category | Item | Type | Name | Phone | Email | College 
   | RollNo | YearBranch | Amount | PayMethod | TxnID | Status | VerifiedBy | Notes

4. The script will auto-fill columns A through Q:
   A = Timestamp (when registered)
   B = Registration ID (TR Q26-EVT-0001, TRQ26-WRK-0001, etc)
   C = Category (EVENT or WORKSHOP)
   D = Item Name (event/workshop name)
   E = Registration Type (INTERNAL, EXTERNAL, ONSITE)
   F = Participant Name
   G = Phone Number
   H = Email Address
   I = College Name
   J = Roll Number (- if not applicable)
   K = Year — Branch (e.g., "II — CE", or - if not applicable)
   L = Amount Due (in ₹, 0 for internal)
   M = Payment Method (WAIVED, UPI, CASH)
   N = Transaction ID (UTR number for external, - if N/A)
   O = Payment Status (WAIVED, PENDING VERIFICATION, PENDING — COLLECT AT VENUE)
   P = Verified By (for manual verification later)
   Q = Notes (for coordinator notes)

EMAILS:
───────
The script sends two emails automatically:
1. Participant Email: Confirmation with registration ID and next steps
2. Coordinator Email: Alert to event/workshop coordinator (if email configured)

Both emails are auto-generated and sent immediately upon registration.

TROUBLESHOOTING:
────────────────
• Check Apps Script Logs: Extensions → Apps Script → Logs
• Verify SHEET_ID is correct
• Confirm coordinator emails are valid
• Ensure MASTER sheet exists with correct name
• Test with a sample registration in dev mode
• Check spam folder if emails not received
*/

const SHEET_ID = '1JKZpT4sXZBKEl82yUZuJXncLXH_4umj1J-UEUHGk9CU'

/**
 * RUN THIS MANUALLY FIRST!
 * Click the 'Run' button choosing this function in the top toolbar
 * to authorize Google Drive and Email access.
 */
function triggerDrivePermission() {
  // Test Drive
  const folderName = "PERMISSION_CHECK";
  const folder = DriveApp.createFolder(folderName);
  DriveApp.removeFolder(folder);

  // Test Email
  MailApp.getRemainingDailyQuota();

  // Test Spreadsheet (MUST include this to trigger Manage permissions)
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const testSheet = ss.insertSheet("PERM_TEST");
  ss.deleteSheet(testSheet);

  console.log("All permissions check successful. You can now deploy.");
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents)
    console.log("Submitting registration for: " + data.name + " (" + (data.registrationId || "NEW") + ")")

    const ss = SpreadsheetApp.openById(SHEET_ID)
    const master = ss.getSheetByName('MASTER')

    if (!master) {
      throw new Error("Sheet tab named 'MASTER' not found. Please create one named 'MASTER' exactly.")
    }

    const lastRow = master.getLastRow()
    const count = String(lastRow).padStart(4, '0')
    const prefix = data.category === 'WORKSHOP' ? 'WRK' : 'EVT'
    const registrationId = data.registrationId ||
      ('TRQ26-' + prefix + '-' + count)

    // Handle screenshot if provided
    let screenshotUrl = '-';
    if (data.screenshotData) {
      try {
        const folderName = "Torque_2K26_Screenshots";
        let folder;
        const folders = DriveApp.getFoldersByName(folderName);
        if (folders.hasNext()) {
          folder = folders.next();
        } else {
          folder = DriveApp.createFolder(folderName);
        }

        const contentType = data.screenshotData.substring(5, data.screenshotData.indexOf(';'));
        const bytes = Utilities.base64Decode(data.screenshotData.split(',')[1]);
        const blob = Utilities.newBlob(bytes, contentType, data.screenshotName || ('screenshot_' + registrationId + '.png'));
        const file = folder.createFile(blob);
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        screenshotUrl = file.getUrl();
      } catch (e) {
        console.error("Screenshot upload failed: " + e.message);
        screenshotUrl = "ERROR: " + e.message + " (Run trigger function)";
      }
    }

    // --- Data Row to append ---
    const rowContent = [
      new Date(),
      registrationId,
      data.category,
      data.itemName,
      data.registrationType,
      data.name,
      data.phone,
      data.email,
      data.college,
      data.rollNo,
      data.branch || data.yearBranch || '-',
      data.amountDue,
      data.paymentMethod,
      data.transactionId || '-',
      data.paymentStatus || 'PENDING',
      screenshotUrl,
      '-' // VerifiedBy
    ]

    // 1. Append to MASTER
    master.appendRow(rowContent);

    // 2. Append to INDIVIDUAL sheet (Event/Workshop name)
    try {
      if (data.itemName) {
        // Sanitize name: remove [ ] ? * / \ : and limit length
        const sanitizedName = data.itemName.toString()
          .replace(/[\[\]\?\*\/\:\\]/g, '')
          .substring(0, 30);

        let individualSheet = ss.getSheetByName(sanitizedName);

        if (!individualSheet) {
          individualSheet = ss.insertSheet(sanitizedName);
          // Add headers to new sheet
          individualSheet.appendRow([
            "Timestamp", "ID", "Category", "Event/Workshop", "Type",
            "Name", "Phone", "Email", "College", "Roll No",
            "Branch/Year", "Amount", "Method", "Transaction ID",
            "Status", "Screenshot", "Verified By"
          ]);
          // Format headers
          individualSheet.getRange(1, 1, 1, 17).setFontWeight("bold").setBackground("#f3f3f3");
          individualSheet.setFrozenRows(1);
        }

        individualSheet.appendRow(rowContent);
      }
    } catch (e) {
      console.error("Individual sheet update failed: " + e.message);
      // Don't throw error here so MASTER still records the data
    }

    try {
      sendParticipantEmail(data, registrationId)
      sendCoordinatorEmail(data, registrationId)
    } catch (e) {
      console.error("Email failed: " + e.message)
    }
    return ContentService
      .createTextOutput(JSON.stringify({
        result: 'success',
        registrationId: registrationId
      }))
      .setMimeType(ContentService.MimeType.JSON)

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({
        result: 'error',
        message: err.message
      }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}

function sendParticipantEmail(data, registrationId) {
  try {
    const statusMessage =
      data.registrationType === 'INTERNAL'
        ? "You're all set! Carry your college ID on the event day."
        : data.registrationType === 'EXTERNAL'
          ? "Your payment is pending verification. A coordinator will confirm via phone before the event. Keep your Transaction ID (" + data.transactionId + ") handy."
          : "Visit the registration desk on the event day and pay ₹" + data.amountDue + " via " + data.paymentMethod + " at the venue."

    const amountText = data.amountDue == 0 ? 'FREE' : '₹' + data.amountDue

    const body =
      "Dear " + data.name + ",\n\n" +
      "Your registration for Torque 2K26 is confirmed!\n\n" +
      "─────────────────────────────\n" +
      "Registration ID : " + registrationId + "\n" +
      data.category + "          : " + data.itemName + "\n" +
      "Type            : " + data.registrationType + "\n" +
      "Amount          : " + amountText + "\n" +
      "─────────────────────────────\n\n" +
      statusMessage + "\n\n" +
      "Event Dates : March 26-27, 2026\n" +
      "Venue       : Dept. of Mechanical Engineering\n" +
      "              UCEK, Kakinada — 533003\n\n" +
      "For queries: torque2k26@gmail.com\n\n" +
      "See you there!\n" +
      "Team Torque 2K26\n" +
      "JNTUK — Dept. of Mechanical Engineering"

    MailApp.sendEmail({
      to: data.email,
      subject: '✅ Registration Confirmed — ' + data.itemName + ' | Torque 2K26',
      body: body
    })
  } catch (err) {
    Logger.log('Participant email failed: ' + err.message)
  }
}

function sendCoordinatorEmail(data, registrationId) {
  try {
    const coordinatorMap = {
      'Chess Monarch': 'torque2025@gmail.com',
      'Project Expo': 'torque2025@gmail.com',
      'Bridge Building': 'torque2025@gmail.com',
      'Lathe Master': 'torque2025@gmail.com',
      'Robo Race': 'torque2025@gmail.com',
      'Design Freak': 'torque2025@gmail.com',
      'Slide Plain': 'torque2025@gmail.com',
      'Casting Crown': 'torque2025@gmail.com',
      'Engine Montage': 'torque2025@gmail.com',
      'Quiz': 'torque2025@gmail.com',
      'Rhythmic Fusion': 'torque2025@gmail.com',
      'Robotics': 'torque2025@gmail.com'
      // Add more events/workshops as needed
    }

    const coordinatorEmail = coordinatorMap[data.itemName]
    if (!coordinatorEmail) return

    MailApp.sendEmail({
      to: coordinatorEmail,
      subject: '[Torque 2K26] New Registration — ' + data.itemName,
      body:
        'New registration received.\n\n' +
        'ID    : ' + registrationId + '\n' +
        'Name  : ' + data.name + '\n' +
        'Phone : ' + data.phone + '\n' +
        'Email : ' + data.email + '\n' +
        'Type  : ' + data.registrationType + '\n' +
        'Amount: ' + (data.amountDue == 0 ? 'FREE' : '₹' + data.amountDue) + '\n' +
        'Status: ' + data.paymentStatus + '\n' +
        (data.transactionId !== '-' ? 'UTR   : ' + data.transactionId + '\n' : '')
    })
  } catch (err) {
    Logger.log('Coordinator email failed: ' + err.message)
  }
}

/**
 * RUN THIS ONCE to pre-create all event and workshop tabs
 * in the spreadsheet with headers.
 */
function initializeAllSheets() {
  const ss = SpreadsheetApp.openById(SHEET_ID);

  // List from your data.js
  const names = [
    "Robotics",
    "Chess Monarch",
    "Project Expo",
    "Bridge Building",
    "Lathe Master",
    "Robo Race",
    "Design Freak",
    "Slide Plain",
    "Casting Crown",
    "Engine Montage",
    "Quiz",
    "Rhythmic Fusion"
  ];

  const headers = [
    "Timestamp", "ID", "Category", "Event/Workshop", "Type",
    "Name", "Phone", "Email", "College", "Roll No",
    "Branch/Year", "Amount", "Method", "Transaction ID",
    "Status", "Screenshot", "Verified By"
  ];

  names.forEach(name => {
    const sanitizedName = name.toString().replace(/[\[\]\?\*\/\:\\]/g, '').substring(0, 30);
    let sheet = ss.getSheetByName(sanitizedName);

    if (!sheet) {
      sheet = ss.insertSheet(sanitizedName);
      sheet.appendRow(headers);
      // Format headers
      sheet.getRange(1, 1, 1, 17).setFontWeight("bold").setBackground("#f3f3f3");
      sheet.setFrozenRows(1);
      console.log("Created sheet: " + sanitizedName);
    } else {
      console.log("Sheet already exists: " + sanitizedName);
    }
  });

  console.log("All sheets initialized successfully.");
}
