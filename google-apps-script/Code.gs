/**
 * Google Apps Script Web App backend for Wedding Invitation & Guest Management System
 * 
 * Instructions:
 * 1. Create a Google Sheet with a header row in Sheet1 (or "Guests"):
 *    Col A: id
 *    Col B: title
 *    Col C: guest_name
 *    Col D: invitation_type
 *    Col E: custom_text
 *    Col F: seats
 *    Col G: phone
 *    Col H: rsvp_status
 *    Col I: attending_count
 *    Col J: wishes
 *    Col K: created_at
 * 
 * 2. In Google Sheets, go to Extensions > Apps Script, paste this entire code into Code.gs, and Save.
 * 3. Click Deploy > New deployment.
 * 4. Select type "Web app".
 * 5. Description: "Wedding API v1"
 * 6. Execute as: "Me"
 * 7. Who has access: "Anyone"  <-- CRITICAL for public access without login
 * 8. Click Deploy, Authorize access, and copy the Web App URL!
 */

function doGet(e) {
  var params = e ? e.parameter : {};
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  
  if (data.length <= 1) {
    return createJsonResponse({ success: true, data: [] });
  }
  
  var headers = data[0];
  var guests = [];
  
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    if (!row[0]) continue; // Skip empty rows
    
    var guest = {
      id: String(row[0]),
      title: String(row[1] || "Mr."),
      guest_name: String(row[2] || ""),
      invitation_type: String(row[3] || "Single"),
      custom_text: String(row[4] || ""),
      seats: Number(row[5]) || 1,
      phone: String(row[6] || ""),
      rsvp_status: String(row[7] || "Pending"),
      attending_count: Number(row[8]) || 0,
      wishes: String(row[9] || ""),
      created_at: String(row[10] || new Date().toISOString())
    };
    guests.push(guest);
  }
  
  // Single guest fetch by ID
  if (params.id) {
    var found = guests.find(function(g) {
      return g.id.toLowerCase() === String(params.id).toLowerCase();
    });
    return createJsonResponse({ success: true, data: found || null });
  }
  
  // Get all guests
  return createJsonResponse({ success: true, data: guests });
}

function doPost(e) {
  try {
    var contents = e.postData ? e.postData.contents : "";
    var body = JSON.parse(contents);
    var action = body.action;
    
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = sheet.getDataRange().getValues();
    
    if (action === "create_guest") {
      var g = body.guest;
      sheet.appendRow([
        g.id,
        g.title,
        g.guest_name,
        g.invitation_type,
        g.custom_text || "",
        g.seats,
        g.phone || "",
        g.rsvp_status || "Pending",
        g.attending_count || 0,
        g.wishes || "",
        g.created_at || new Date().toISOString()
      ]);
      return createJsonResponse({ success: true, message: "Guest created" });
    }
    
    if (action === "update_guest") {
      var g = body.guest;
      for (var i = 1; i < data.length; i++) {
        if (String(data[i][0]) === String(g.id)) {
          var rowNum = i + 1;
          sheet.getRange(rowNum, 2).setValue(g.title);
          sheet.getRange(rowNum, 3).setValue(g.guest_name);
          sheet.getRange(rowNum, 4).setValue(g.invitation_type);
          sheet.getRange(rowNum, 5).setValue(g.custom_text || "");
          sheet.getRange(rowNum, 6).setValue(g.seats);
          sheet.getRange(rowNum, 7).setValue(g.phone || "");
          return createJsonResponse({ success: true, message: "Guest updated" });
        }
      }
      return createJsonResponse({ success: false, message: "Guest not found" });
    }
    
    if (action === "delete_guest") {
      var targetId = body.id;
      for (var i = 1; i < data.length; i++) {
        if (String(data[i][0]) === String(targetId)) {
          sheet.deleteRow(i + 1);
          return createJsonResponse({ success: true, message: "Guest deleted" });
        }
      }
      return createJsonResponse({ success: false, message: "Guest not found" });
    }
    
    if (action === "rsvp") {
      var targetId = body.id;
      for (var i = 1; i < data.length; i++) {
        if (String(data[i][0]) === String(targetId)) {
          var rowNum = i + 1;
          sheet.getRange(rowNum, 8).setValue(body.rsvp_status);
          sheet.getRange(rowNum, 9).setValue(body.attending_count);
          sheet.getRange(rowNum, 10).setValue(body.wishes || "");
          return createJsonResponse({ success: true, message: "RSVP updated" });
        }
      }
      return createJsonResponse({ success: false, message: "Guest not found" });
    }
    
    return createJsonResponse({ success: false, message: "Invalid action" });
  } catch (err) {
    return createJsonResponse({ success: false, error: err.toString() });
  }
}

function createJsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
