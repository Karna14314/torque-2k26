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

// Column headers for summary sheet (limited fields)
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
    
    // Get both sheets
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
    
    // Row data for summary sheet
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
    
    // Append to both sheets
    sheetFull.appendRow(rowFull);
    sheetSummary.appendRow(rowSummary);
    
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
 * Get or create the Google Spreadsheet with both sheets
 */
function getOrCreateSpreadsheet() {
  // Try to get existing spreadsheet by ID (if stored in Properties)
  const scriptProperties = PropertiesService.getScriptProperties();
  const spreadsheetId = scriptProperties.getProperty('spreadsheetId');
  
  if (spreadsheetId) {
    try {
      const ss = SpreadsheetApp.openById(spreadsheetId);
      if (ss) return ss;
    } catch (e) {
      // Spreadsheet not found, create new one
    }
  }
  
  // Create new spreadsheet
  const ss = SpreadsheetApp.create('Torque 2K26 - Registrations');
  const newId = ss.getId();
  
  // Store the ID for future use
  scriptProperties.setProperty('spreadsheetId', newId);
  
  // Rename default sheet to full details
  const defaultSheet = ss.getActiveSheet();
  defaultSheet.setName(SHEET_FULL);
  
  // Add headers to full details sheet
  defaultSheet.getRange(1, 1, 1, HEADERS_FULL.length).setValues([HEADERS_FULL]);
  defaultSheet.getRange(1, 1, 1, HEADERS_FULL.length).setFontWeight('bold');
  defaultSheet.getRange(1, 1, 1, HEADERS_FULL.length).setBackground('#d4af37');
  defaultSheet.getRange(1, 1, 1, HEADERS_FULL.length).setFontColor('#000000');
  defaultSheet.setFrozenRows(1);
  
  // Create summary sheet
  const summarySheet = ss.insertSheet(SHEET_SUMMARY);
  summarySheet.getRange(1, 1, 1, HEADERS_SUMMARY.length).setValues([HEADERS_SUMMARY]);
  summarySheet.getRange(1, 1, 1, HEADERS_SUMMARY.length).setFontWeight('bold');
  summarySheet.getRange(1, 1, 1, HEADERS_SUMMARY.length).setBackground('#d4af37');
  summarySheet.getRange(1, 1, 1, HEADERS_SUMMARY.length).setFontColor('#000000');
  summarySheet.setFrozenRows(1);
  
  // Set column widths for better readability
  defaultSheet.setColumnWidth(1, 150);  // Registration ID
  defaultSheet.setColumnWidth(5, 200);  // Name
  defaultSheet.setColumnWidth(6, 250);  // Email
  defaultSheet.setColumnWidth(8, 200);  // College
  defaultSheet.setColumnWidth(9, 300);  // Events
  defaultSheet.setColumnWidth(13, 180); // Timestamp
  
  summarySheet.setColumnWidth(1, 150);  // Registration ID
  summarySheet.setColumnWidth(2, 200);  // Name
  summarySheet.setColumnWidth(3, 200);  // College
  summarySheet.setColumnWidth(4, 300);  // Events
  summarySheet.setColumnWidth(5, 200);  // Workshop
  summarySheet.setColumnWidth(6, 200);  // Package
  
  return ss;
}

/**
 * Manual function to create/setup spreadsheet (run once from editor)
 */
function setupSpreadsheet() {
  const ss = getOrCreateSpreadsheet();
  Logger.log('Spreadsheet created/found: ' + ss.getUrl());
  Logger.log('Spreadsheet ID: ' + ss.getId());
}

/**
 * Get registration statistics (for admin use)
 */
function getStats() {
  const scriptProperties = PropertiesService.getScriptProperties();
  const spreadsheetId = scriptProperties.getProperty('spreadsheetId');
  
  if (!spreadsheetId) {
    return { error: 'No spreadsheet found' };
  }
  
  const ss = SpreadsheetApp.openById(spreadsheetId);
  const sheet = ss.getSheetByName(SHEET_SUMMARY);
  const data = sheet.getDataRange().getValues();
  
  // Calculate stats (skip header row)
  const totalRegistrations = data.length - 1;
  const totalAmount = data.slice(1).reduce((sum, row) => sum + (parseFloat(row[6]) || 0), 0);
  
  // Count by package
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
 * Verify a registration payment (for admin use)
 */
function verifyPayment(registrationId, verifiedBy, notes) {
  const scriptProperties = PropertiesService.getScriptProperties();
  const spreadsheetId = scriptProperties.getProperty('spreadsheetId');
  
  if (!spreadsheetId) {
    return { success: false, error: 'No spreadsheet found' };
  }
  
  const ss = SpreadsheetApp.openById(spreadsheetId);
  const sheet = ss.getSheetByName(SHEET_FULL);
  const data = sheet.getDataRange().getValues();
  
  // Find the registration by ID
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === registrationId) {
      // Update verification status
      sheet.getRange(i + 1, 14).setValue('VERIFIED');
      sheet.getRange(i + 1, 15).setValue(verifiedBy);
      sheet.getRange(i + 1, 16).setValue(notes || '');
      sheet.getRange(i + 1, 12).setValue('VERIFIED');
      
      // Also update summary sheet
      const summarySheet = ss.getSheetByName(SHEET_SUMMARY);
      const summaryData = summarySheet.getDataRange().getValues();
      for (let j = 1; j < summaryData.length; j++) {
        if (summaryData[j][0] === registrationId) {
          summarySheet.getRange(j + 1, 8).setValue('VERIFIED');
          break;
        }
      }
      
      return { success: true, message: 'Payment verified successfully' };
    }
  }
  
  return { success: false, error: 'Registration not found' };
}
