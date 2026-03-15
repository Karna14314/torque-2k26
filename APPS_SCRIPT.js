// Google Apps Script — Torque 2K26 Registration Handler
// Deploy as Web App: Execute as Me, Anyone can access
// Sheet tab name: MASTER

const SHEET_NAME = 'MASTER';
const NOTIFICATION_EMAIL = 'torque2k26@gmail.com'; // update to real email

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    // Column order: A-P
    sheet.appendRow([
      new Date(),                      // A: Timestamp
      data.registrationId || '',       // B: Registration ID
      data.registrationType || '',     // C: Registration Type (ONLINE/ONSITE)
      data.packageName || '',          // D: Package Name
      data.amountDue || '',            // E: Amount Due
      data.selectedEvents || '',       // F: Selected Events (comma separated)
      data.name || '',                 // G: Name
      data.phone || '',                // H: Phone
      data.email || '',                // I: Email
      data.college || '',              // J: College
      data.transactionId || '-',       // K: Transaction ID
      data.screenshotProvided || 'No', // L: Screenshot Provided
      data.paymentMethod || '',        // M: Payment Method
      data.paymentStatus || '',        // N: Payment Status
      '',                              // O: Verified By (manual)
      ''                               // P: Notes (manual)
    ]);

    // Send confirmation to participant
    if (data.email && data.email !== '-') {
      sendConfirmationEmail(data);
    }

    // Send notification to organizer
    sendNotificationEmail(data);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, id: data.registrationId }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function sendConfirmationEmail(data) {
  const subject = `Torque 2K26 Registration Confirmed — ${data.registrationId}`;
  const body = `
Hi ${data.name},

Your registration for Torque 2K26 is confirmed!

Registration ID: ${data.registrationId}
Package: ${data.packageName}
Amount: ₹${data.amountDue}
Events: ${data.selectedEvents}
Registration Type: ${data.registrationType}

${data.registrationType === 'ONLINE'
  ? 'Payment Status: Pending Verification\nWe will verify your payment and confirm within 24 hours.'
  : 'Please pay at the registration desk on the event day.'}

See you at UCEK Kakinada!

— Team Torque 2K26
  `.trim();

  MailApp.sendEmail(data.email, subject, body);
}

function sendNotificationEmail(data) {
  const subject = `[Torque 2K26] New Registration — ${data.registrationId}`;
  const body = `
New registration received:

ID: ${data.registrationId}
Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
College: ${data.college}
Package: ${data.packageName} (₹${data.amountDue})
Type: ${data.registrationType}
Events: ${data.selectedEvents}
Payment Method: ${data.paymentMethod}
UTR: ${data.transactionId}
Screenshot: ${data.screenshotProvided}
  `.trim();

  MailApp.sendEmail(NOTIFICATION_EMAIL, subject, body);
}

function doGet(e) {
  // Used by /onsite2k26 page to fetch today's stats
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    const today = new Date().toDateString();

    let count = 0, cashTotal = 0, upiTotal = 0;

    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const timestamp = new Date(row[0]).toDateString();
      if (timestamp !== today) continue;
      count++;
      const amount = Number(row[4]) || 0;
      const method = String(row[12]);
      if (method.includes('CASH')) cashTotal += amount;
      else upiTotal += amount;
    }

    return ContentService
      .createTextOutput(JSON.stringify({ count, cashTotal, upiTotal }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
