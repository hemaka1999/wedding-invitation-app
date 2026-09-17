/**
 * Admin Authentication & API Configuration (TypeScript)
 */

export const authConfig = {
  // Hardcoded 8-character strong password for the admin dashboard
  adminPassword: process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "Wed2026!",
  
  // Storage key for session management
  sessionKey: "wedding_admin_session_auth",
  
  // Google Apps Script API URL
  googleSheetApiUrl: process.env.NEXT_PUBLIC_GOOGLE_SHEET_API_URL || ""
};
