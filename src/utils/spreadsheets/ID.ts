function getSpreadsheetID(spreadsheetLink: string) {
  const spreadsheetID = spreadsheetLink.replace('https://docs.google.com/spreadsheets/d/', '').split('/')[0];
  return spreadsheetID;
}

export { getSpreadsheetID }