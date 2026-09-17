# 📊 Step-by-Step Guide: Connect Google Sheets to Your Wedding Invitation App

This guide explains how to connect a public/shared **Google Sheet** to your Next.js application using **Google Apps Script** as a free API backend.

---

## 🛠️ Step 1: Create the Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a **New Blank Spreadsheet**.
2. Rename the document to **"Wedding Guest List"**.
3. In **Row 1** (the header row), add the following exact column titles across Columns A to K:

| Column | Header Name | Description |
| :--- | :--- | :--- |
| **A** | `id` | Unique 6-character short ID (e.g. `amal92`) |
| **B** | `title` | Guest Salutation (`Dr.`, `Mr.`, `Mrs.`, `Miss`, `Rev.`, etc.) |
| **C** | `guest_name` | Guest full name (e.g. `Amal Wijesinghe & Partner`) |
| **D** | `invitation_type` | `Single`, `Couple`, `Family`, or `Custom` |
| **E** | `custom_text` | Custom text (used if invitation_type is `Custom`) |
| **F** | `seats` | Number of reserved seats (e.g. `2`) |
| **G** | `phone` | WhatsApp/Contact number (e.g. `+94771234567`) |
| **H** | `rsvp_status` | `Pending`, `Attending`, or `Declined` |
| **I** | `attending_count` | Number of attending guests confirmed in RSVP |
| **J** | `wishes` | Guest blessing/wishes message |
| **K** | `created_at` | ISO date string timestamp |

*(Optional)* Add a couple of initial sample rows in rows 2 and 3 to verify data loading!

---

## 📜 Step 2: Add the Google Apps Script Code

1. In your Google Sheet menu bar, click **Extensions** > **Apps Script**.
2. Erase any code currently inside `Code.gs`.
3. Copy and paste the entire script from `google-apps-script/Code.gs` in this repository:

```javascript
function doGet(e) {
  var params = e ? e.parameter : {};
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  
  if (data.length <= 1) {
    return createJsonResponse({ success: true, data: [] });
  }
  
  var guests = [];
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    if (!row[0]) continue;
    
    guests.push({
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
    });
  }
  
  if (params.id) {
    var found = guests.find(function(g) {
      return g.id.toLowerCase() === String(params.id).toLowerCase();
    });
    return createJsonResponse({ success: true, data: found || null });
  }
  
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
        g.id, g.title, g.guest_name, g.invitation_type, g.custom_text || "",
        g.seats, g.phone || "", g.rsvp_status || "Pending",
        g.attending_count || 0, g.wishes || "", g.created_at || new Date().toISOString()
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
    }
    
    if (action === "delete_guest") {
      for (var i = 1; i < data.length; i++) {
        if (String(data[i][0]) === String(body.id)) {
          sheet.deleteRow(i + 1);
          return createJsonResponse({ success: true, message: "Guest deleted" });
        }
      }
    }
    
    if (action === "rsvp") {
      for (var i = 1; i < data.length; i++) {
        if (String(data[i][0]) === String(body.id)) {
          var rowNum = i + 1;
          sheet.getRange(rowNum, 8).setValue(body.rsvp_status);
          sheet.getRange(rowNum, 9).setValue(body.attending_count);
          sheet.getRange(rowNum, 10).setValue(body.wishes || "");
          return createJsonResponse({ success: true, message: "RSVP updated" });
        }
      }
    }
    
    return createJsonResponse({ success: false, message: "Action not completed" });
  } catch (err) {
    return createJsonResponse({ success: false, error: err.toString() });
  }
}

function createJsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. Click the **Save** icon (💾) or press `Ctrl + S`.

---

## 🚀 Step 3: Deploy as a Web App

1. In the top right corner of Apps Script, click **Deploy** > **New deployment**.
2. Click the gear icon (⚙️) next to **Select type** and choose **Web app**.
3. Configure the deployment parameters carefully:
   - **Description**: `Wedding Invitation API`
   - **Execute as**: `Me (your email address)`
   - **Who has access**: **`Anyone`**  *(⚠️ CRITICAL: Must be set to "Anyone" so guests can RSVP without logging into Google)*
4. Click **Deploy**.
5. Grant Permissions:
   - Google will display a popup: *"Authorization required"*. Click **Authorize access**.
   - Select your Google Account.
   - If Google shows *"Google hasn't verified this app"*, click **Advanced** -> **Go to Untitled project (unsafe)** -> Click **Allow**.
6. Copy the generated **Web App URL** (it will look like `https://script.google.com/macros/s/AKfycbx.../exec`).

---

## 🔑 Step 4: Configure Your Local Environment Variables

1. In your local project directory `d:/Project/test invitation card project/`, create or edit `.env.local`:
   ```env
   NEXT_PUBLIC_GOOGLE_SHEET_API_URL=https://script.google.com/macros/s/YOUR_DEPLOYED_SCRIPT_ID/exec
   NEXT_PUBLIC_ADMIN_PASSWORD=Wed2026!
   ```
2. Restart your Next.js local server (`npm run dev`).
3. Now all guest creation, edits, deletions, and RSVP submissions will save live into your Google Sheet!

---

## 💡 Troubleshooting Tips

- **Using Offline LocalStorage**: If `NEXT_PUBLIC_GOOGLE_SHEET_API_URL` is empty or left blank, the app will automatically run on local browser storage (`LocalStorage`), allowing full testing offline!
- **Modifying Code in Apps Script**: Whenever you edit your Apps Script code, remember to click **Deploy** > **Manage deployments** > **Edit** (pencil icon) > select **New version** > click **Deploy**. (Or create a new deployment URL).
