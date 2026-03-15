/**
 * TORQUE 2K26 Registration Backend
 * Google Apps Script for Two-Sheet Registration System
 * 
 * DEPLOYMENT INSTRUCTIONS:
 * 1. Go to script.google.com
 * 2. Create a new project named "Torque2K26-Registration"
 * 3. Replace the default code with this entire script
 * 4. Click "Deploy" > "New deployment"
 * 5. Select "Web app" type
 * 6. Set "Execute as" to your Google account
 * 7. Set "Who has access" to "Anyone"
 * 8. Click "Deploy" and copy the Web App URL
 * 9. Paste the URL in data.js as festInfo.appsScriptUrl
 */

// Sheet names
const SHEET_FULL = 'Registrations';
const SHEET_SUMMARY = 'Summary';

// Event and Workshop Names (based on data.js)
const EVENT_NAMES = [
  'Chess Monarch',
  'Project Expo',
  'Bridge Building',
  'Lathe Master',
  'Robo Race',
  'Design Freak',
  'Slide Plain',
  'Casting Crown',
  'Engine Montage',
  'Quiz',
  'Rhythmic Fusion'
];

const WORKSHOP_NAMES = [
  'Robotics',
  'Drone Technologies',
  'CNC Machines'
];

// Column headers for full details sheet
const HEADERS_FULL = [
  'Registration ID',
  'Registration Type',
  'Package Name',
  'Amount Paid',
  'Name',
  'Email',
  'Phone',
  'College',
  'Selected Events',
  'Selected Workshop',
  'Transaction ID',
  'Payment Status',
  'Timestamp',
  'Verification Status',
  'Verified By',
  'Notes'
];

// Column headers for summary and event sheets
const HEADERS_SUMMARY = [
  'Registration ID',
  'Name',
  'College',
  'Events',
  'Workshop',
  'Package',
  'Amount Paid',
  'Payment Status',
  'Timestamp'
];

/**
 * Handle POST requests from the registration form
 */
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get or create the spreadsheet
    const ss = getOrCreateSpreadsheet();
    
    // Get both main sheets
    const sheetFull = ss.getSheetByName(SHEET_FULL);
    const sheetSummary = ss.getSheetByName(SHEET_SUMMARY);
    
    // Format timestamp
    const timestamp = new Date(data.timestamp);
    const formattedTime = Utilities.formatDate(timestamp, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
    
    // Row data for full details sheet
    const rowFull = [
      data.registrationId || '',
      data.registrationType || 'ONLINE-PORTAL',
      data.packageName || '',
      data.amountPaid || 0,
      data.name || '',
      data.email || '',
      data.phone || '',
      data.college || '',
      data.selectedEvents || '',
      data.selectedWorkshop || '',
      data.transactionId || '',
      data.paymentStatus || 'PENDING-VERIFICATION',
      formattedTime,
      'PENDING',
      '',
      ''
    ];
    
    // Row data for summary sheets
    const rowSummary = [
      data.registrationId || '',
      data.name || '',
      data.college || '',
      data.selectedEvents || '',
      data.selectedWorkshop || '',
      data.packageName || '',
      data.amountPaid || 0,
      data.paymentStatus || 'PENDING-VERIFICATION',
      formattedTime
    ];
    
    // Append to main sheets
    sheetFull.appendRow(rowFull);
    sheetSummary.appendRow(rowSummary);
    
    // Append to specific event sheets
    if (data.selectedEvents) {
      const selectedEventsList = data.selectedEvents.split(',').map(s => s.trim());
      selectedEventsList.forEach(eventName => {
        const eventSheet = ss.getSheetByName(eventName);
        if (eventSheet) {
          eventSheet.appendRow(rowSummary);
        }
      });
    }
    
    // Append to specific workshop sheet
    if (data.selectedWorkshop && data.selectedWorkshop !== 'None') {
      const workshopSheet = ss.getSheetByName(data.selectedWorkshop);
      if (workshopSheet) {
        workshopSheet.appendRow(rowSummary);
      }
    }
    
    // Send confirmation email
    if (data.email && data.email !== '-' && data.email.includes('@')) {
      try {
        sendConfirmationEmail(data);
      } catch (mailError) {
        // Detailed error logging to the console (View > Executions)
        console.error('CRITICAL: Email failed to send for ' + data.email);
        console.error('Error Details:', mailError.toString());
      }
    }
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Registration recorded successfully',
        registrationId: data.registrationId
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log error for debugging
    console.error('Registration error:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.message
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'Torque 2K26 Registration API is running',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Get or create the Google Spreadsheet with all necessary sheets
 */
function getOrCreateSpreadsheet() {
  const scriptProperties = PropertiesService.getScriptProperties();
  const spreadsheetId = scriptProperties.getProperty('spreadsheetId');
  
  let ss;
  if (spreadsheetId) {
    try {
      ss = SpreadsheetApp.openById(spreadsheetId);
    } catch (e) {
      // Spreadsheet ID invalid or missing access, create new
    }
  }
  
  if (!ss) {
    ss = SpreadsheetApp.create('Torque 2K26 - Registrations');
    scriptProperties.setProperty('spreadsheetId', ss.getId());
    
    // Initial setup
    const defaultSheet = ss.getActiveSheet();
    defaultSheet.setName(SHEET_FULL);
    applyHeaderAndStyle(defaultSheet, HEADERS_FULL);
    
    const summarySheet = ss.insertSheet(SHEET_SUMMARY);
    applyHeaderAndStyle(summarySheet, HEADERS_SUMMARY);
    
    // Run full initialization for event tabs
    initializeSheets(ss);
  }
  
  return ss;
}

/**
 * Creates/Initializes individual sheets for all events and workshops
 */
function initializeSheets(ss) {
  if (!ss) ss = getOrCreateSpreadsheet();
  
  // Combine all categories to create sheets
  const allTabs = [...EVENT_NAMES, ...WORKSHOP_NAMES];
  
  allTabs.forEach(name => {
    let sheet = ss.getSheetByName(name);
    if (!sheet) {
      sheet = ss.insertSheet(name);
    }
    applyHeaderAndStyle(sheet, HEADERS_SUMMARY);
  });
  
  Logger.log('Initialization complete: Created/Verified ' + allTabs.length + ' entity tabs.');
}

/**
 * Utility to apply standard headers and formatting to a sheet
 */
function applyHeaderAndStyle(sheet, headers) {
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#d4af37')
    .setFontColor('#000000')
    .setHorizontalAlignment('center');
  
  sheet.setFrozenRows(1);
  
  // Auto-resize or set standard widths
  sheet.setColumnWidth(1, 140); // ID
  if (headers.length === HEADERS_FULL.length) {
    sheet.setColumnWidth(5, 180); // Name
    sheet.setColumnWidth(6, 220); // Email
    sheet.setColumnWidth(8, 200); // College
    sheet.setColumnWidth(9, 250); // Events
  } else {
    sheet.setColumnWidth(2, 180); // Name
    sheet.setColumnWidth(3, 200); // College
    sheet.setColumnWidth(4, 250); // Events
  }
}

/**
 * Manual setup entry point (run this once from GS editor)
 */
function setupSpreadsheet() {
  const ss = getOrCreateSpreadsheet();
  initializeSheets(ss);
  Logger.log('Spreadsheet setup complete: ' + ss.getUrl());
}

/**
 * Get registration statistics (for admin use)
 */
function getStats() {
  const ss = getOrCreateSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_SUMMARY);
  const data = sheet.getDataRange().getValues();
  
  const totalRegistrations = data.length - 1;
  const totalAmount = data.slice(1).reduce((sum, row) => sum + (parseFloat(row[6]) || 0), 0);
  
  const packageCounts = {};
  data.slice(1).forEach(row => {
    const pkg = row[5] || 'Unknown';
    packageCounts[pkg] = (packageCounts[pkg] || 0) + 1;
  });
  
  return {
    totalRegistrations,
    totalAmount,
    packageCounts,
    spreadsheetUrl: ss.getUrl()
  };
}

/**
 * Verify a registration payment
 */
function verifyPayment(registrationId, verifiedBy, notes) {
  const ss = getOrCreateSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_FULL);
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === registrationId) {
      sheet.getRange(i + 1, 14).setValue('VERIFIED');
      sheet.getRange(i + 1, 15).setValue(verifiedBy);
      sheet.getRange(i + 1, 16).setValue(notes || '');
      
      // Update Summary Status
      const summarySheet = ss.getSheetByName(SHEET_SUMMARY);
      const sData = summarySheet.getDataRange().getValues();
      for (let j = 1; j < sData.length; j++) {
        if (sData[j][0] === registrationId) {
          summarySheet.getRange(j + 1, 8).setValue('VERIFIED');
          break;
        }
      }
      
      return { success: true, message: 'Payment verified' };
    }
  }
  return { success: false, error: 'Registration not found' };
}

/**
 * Send a professional confirmation email to the participant
 */
function sendConfirmationEmail(data) {
  const subject = `Torque 2K26 Registration Confirmed [ID: ${data.registrationId}]`;
  
  // Clean up data for display
  const events = data.selectedEvents || 'None';
  const workshop = data.selectedWorkshop || 'None';
  const packageDisp = data.packageName || 'Standard';
  const amount = data.amountPaid || 0;
  
  const htmlBody = `
    <div style="font-family: 'Poppins', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0d0d0d; color: #f0ede6; padding: 0; border: 1px solid #d4af37; border-radius: 16px; overflow: hidden;">
      <!-- Header -->
      <div style="background-color: #1a1a1a; padding: 40px 20px; text-align: center; border-bottom: 2px solid #d4af37;">
        <h1 style="color: #d4af37; margin: 0; font-size: 28px; letter-spacing: 4px; text-transform: uppercase;">TORQUE 2K26</h1>
        <p style="color: rgba(240, 237, 230, 0.6); margin: 10px 0 0 0; font-size: 14px;">Mechanical Engineering Department • Igniting Innovation</p>
      </div>
      
      <!-- Body -->
      <div style="padding: 40px 30px;">
        <h2 style="color: #d4af37; margin-top: 0; font-size: 20px;">Registration Confirmed!</h2>
        <p style="line-height: 1.6;">Dear <strong>${data.name}</strong>,</p>
        <p style="line-height: 1.6;">Your registration for Torque 2K26 has been successfully recorded. We are thrilled to welcome you to our annual technical fest.</p>
        
        <!-- ID Box -->
        <div style="margin: 30px 0; padding: 25px; background: rgba(212, 175, 55, 0.05); border-left: 5px solid #d4af37; border-radius: 4px;">
          <p style="margin: 0; font-size: 12px; color: rgba(240, 237, 230, 0.4); text-transform: uppercase; letter-spacing: 2px;">Registration ID</p>
          <p style="margin: 5px 0 0 0; font-size: 24px; font-weight: 800; color: #d4af37; letter-spacing: 1px;">${data.registrationId}</p>
        </div>
        
        <!-- Details Table -->
        <div style="background: #151515; border-radius: 12px; padding: 20px; border: 1px solid rgba(212, 175, 55, 0.1);">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(212, 175, 55, 0.1); color: rgba(240, 237, 230, 0.5); font-size: 14px;">Package</td>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(212, 175, 55, 0.1); text-align: right; font-weight: 600;">${packageDisp}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(212, 175, 55, 0.1); color: rgba(240, 237, 230, 0.5); font-size: 14px;">Amount Paid</td>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(212, 175, 55, 0.1); text-align: right; font-weight: 600; color: #d4af37;">₹${amount}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(212, 175, 55, 0.1); color: rgba(240, 237, 230, 0.5); font-size: 14px;">Payment Status</td>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(212, 175, 55, 0.1); text-align: right; font-weight: 600; color: #4caf50;">RECORDED</td>
            </tr>
          </table>
        </div>
        
        <div style="margin-top: 30px;">
          <h3 style="color: #d4af37; font-size: 16px; margin-bottom: 10px; border-bottom: 1px solid rgba(212, 175, 55, 0.2); padding-bottom: 5px;">Your Schedule</h3>
          
          <div style="margin-bottom: 15px;">
            <p style="margin: 0; color: rgba(240, 237, 230, 0.4); font-size: 12px; text-transform: uppercase;">Events</p>
            <p style="margin: 5px 0 0 0; font-size: 14px; line-height: 1.5;">${events}</p>
          </div>
          
          <div style="margin-bottom: 15px;">
            <p style="margin: 0; color: rgba(240, 237, 230, 0.4); font-size: 12px; text-transform: uppercase;">Workshop</p>
            <p style="margin: 5px 0 0 0; font-size: 14px; line-height: 1.5;">${workshop}</p>
          </div>
        </div>
        
        <p style="margin-top: 40px; font-size: 13px; color: rgba(240, 237, 230, 0.6); line-height: 1.6; border-top: 1px solid rgba(212, 175, 55, 0.1); padding-top: 20px;">
          <strong>Important:</strong> Please carry a screenshot of this email or your Registration ID for on-the-spot verification at the registration desk.
        </p>
      </div>
      
      <!-- Footer -->
      <div style="background-color: #111; padding: 30px; text-align: center; font-size: 12px; color: rgba(240, 237, 230, 0.4);">
        <p style="margin: 0 0 10px 0;">This is an automated email. Please do not reply.</p>
        <p style="margin: 10px 0 0 0;">© 2026 Torque JNTUK. All Rights Reserved.</p>
      </div>
    </div>
  `;
  
  MailApp.sendEmail({
    to: data.email,
    subject: subject,
    htmlBody: htmlBody,
    noReply: true
  });
}

/**
 * MANDATORY PERMISSION TRIGGER
 * 
 * If emails are not working, follow these steps:
 * 1. Select "authorizeAndTestEmail" in the dropdown at the top of the Google Script editor.
 * 2. Click the "Run" button.
 * 3. A popup will appear asking for "Authorization Required".
 * 4. Click "Review Permissions", select your account, then click "Advanced" > "Go to Torque2K26 (unsafe)" and finally "Allow".
 */
function authorizeAndTestEmail() {
  const testEmail = Session.getActiveUser().getEmail();
  const dummyData = {
    registrationId: 'TEST-AUTH-99',
    name: 'Developer Test',
    email: testEmail,
    packageName: 'Full Access Pass',
    amountPaid: 1200,
    selectedEvents: 'Lathe Master, Quiz',
    selectedWorkshop: 'Robotics'
  };
  
  Logger.log('Triggering permissions for GmailApp and MailApp...');
  
  try {
    sendConfirmationEmail(dummyData);
    Logger.log('SUCCESS: Test email sent to ' + testEmail);
    Logger.log('If you received the email, the system is now fully authorized.');
  } catch (e) {
    Logger.log('FAILED: ' + e.toString());
    throw e;
  }
}
