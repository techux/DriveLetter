const { google } = require("googleapis");

// function getDriveClient(accessToken) {
//   return google
//     .drive({ version: "v3", auth: new google.auth.OAuth2() })
//     .setCredentials({ access_token: accessToken });
// }

const getDriveClient = (token) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_CALLBACK_URI
  );

  // Load refresh token from env or database
  oauth2Client.setCredentials({
    access_token: token,
    // refresh_token: process.env.REFRESH_TOKEN
  });

  return google.drive({ version: "v3", auth: oauth2Client });
};

async function driveFolder(drive, folderName) {
  const response = await drive.files.list({
    q: `name='${folderName}' and mimeType='application/vnd.google-apps.folder'`,
    fields: "files(id)",
  });

  if (response.data.files.length) {
    return response.data.files[0].id;
  }

  const folder = await drive.files.create({
    resource: {
      name: folderName,
      mimeType: "application/vnd.google-apps.folder",
    },
    fields: "id",
  });

  return folder.data.id;
}

module.exports = { getDriveClient, driveFolder };
