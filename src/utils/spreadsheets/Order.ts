import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

import { IOrder } from "@/interfaces/models/IOrder";
import { IPurchasedProduct } from "@/interfaces/models/IPurchasedProduct";

import { EventType } from "@/enums/EventType";
import { OrderStatus } from "@/enums/OrderStatus";
import { ColumnIndex } from "@/configs/spreadsheets/ColumnIndex";

dayjs.extend(customParseFormat);

interface OrderParams {
  spreadsheetID: string;
  eventType: string;
  rowNo?: number;
}

interface UpdateOrderParams {
  spreadsheetID: string;
  rowNo: number;
  status: string;
}

async function getOrder({ spreadsheetID, eventType, rowNo }: OrderParams) {
  if (spreadsheetID === '') {
    return null;
  }

  if (!rowNo) {
    return null;
  }

  const serviceAccountAuth = new JWT({
    email: process.env.SPREADSHEET_SERVICE_ACCOUNT_EMAIL,
    key: process.env.SPREADSHEET_SERVICE_ACCOUNT_PRIVATE_KEY,
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets'
    ]
  });

  const spreadsheet = new GoogleSpreadsheet(spreadsheetID, serviceAccountAuth);
  await spreadsheet.loadInfo();

  const rows = await spreadsheet.sheetsByIndex[0].getRows<Record<string, string>>();
  rows.forEach(async (row) => {
    const dataObject = row.toObject();
    const dataKeys = Object.keys(dataObject);

    const timestamp: string = dataObject[dataKeys[ColumnIndex.TIMESTAMP]]!;
    if (!timestamp.includes('[')) {
      row.set(dataKeys[ColumnIndex.TIMESTAMP], `[${OrderStatus.PENDING}]${dataObject[dataKeys[ColumnIndex.TIMESTAMP]]}`);
      await row.save();
    }
  });

  const row = rows[rowNo - 2];
  const dataObject = row.toObject() as Record<string, string>;
  const dataKeys = Object.keys(dataObject);

  let purchasedProducts = dataKeys.filter((key, index) => index > ColumnIndex.AGREEMENT && dataObject[key] && dataObject[key] !== '').map<IPurchasedProduct>(key => ({
    name: key,
    qty: Number(dataObject[key].replace('pcs', '').replace('pc', '').trim())
  }));

  if (eventType === EventType.MAIL_ORDER) {
    purchasedProducts = purchasedProducts.slice(0, -1);
  }

  const order: IOrder = {
    rowNo: row.rowNumber,
    timestamp: dayjs(dataObject[dataKeys[ColumnIndex.TIMESTAMP]].split(']')[1], ['DD/MM/YYYY H:mm:ss', 'D/M/YYYY H:mm:ss', 'MM/DD/YYYY H:mm:ss', 'M/D/YYYY H:mm:ss'], true).format('YYYY-MM-DD HH:mm:ss'),
    status: dataObject[dataKeys[ColumnIndex.TIMESTAMP]].split(']')[0].replace('[', ''),
    customer: dataObject[dataKeys[ColumnIndex.NAME]],
    email: dataObject[dataKeys[ColumnIndex.EMAIL]],
    address: dataObject[dataKeys[ColumnIndex.ADDRESS]],
    phoneNumber: dataObject[dataKeys[ColumnIndex.PHONENUMBER]],
    socialMedia: dataObject[dataKeys[ColumnIndex.SOCIALMEDIA]],
    purchasedProducts,
    preferedExpedition: eventType === EventType.MAIL_ORDER ? dataObject[dataKeys[dataKeys.length - 1]] : undefined
  };

  return order;
}

async function getOrders({ spreadsheetID, eventType }: OrderParams) {
  if (spreadsheetID === '') {
    return [];
  }

  const serviceAccountAuth = new JWT({
    email: process.env.SPREADSHEET_SERVICE_ACCOUNT_EMAIL,
    key: process.env.SPREADSHEET_SERVICE_ACCOUNT_PRIVATE_KEY,
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets'
    ]
  });

  const spreadsheet = new GoogleSpreadsheet(spreadsheetID, serviceAccountAuth);
  await spreadsheet.loadInfo();

  const rows = await spreadsheet.sheetsByIndex[0].getRows<Record<string, string>>();
  rows.forEach(async (row) => {
    const dataObject = row.toObject();
    const dataKeys = Object.keys(dataObject);

    const timestamp: string = dataObject[dataKeys[ColumnIndex.TIMESTAMP]]!;
    if (!timestamp.includes('[')) {
      row.set(dataKeys[ColumnIndex.TIMESTAMP], `[${OrderStatus.PENDING}]${dataObject[dataKeys[ColumnIndex.TIMESTAMP]]}`);
      await row.save();
    }
  });

  const orders = rows.map<IOrder>((row) => {
    const dataObject = row.toObject() as Record<string, string>;
    const dataKeys = Object.keys(dataObject);

    let purchasedProducts = dataKeys.filter((key, index) => index > ColumnIndex.AGREEMENT && dataObject[key] && dataObject[key] !== '').map<IPurchasedProduct>(key => ({
      name: key,
      qty: Number(dataObject[key].replace('pcs', '').replace('pc', '').trim())
    }));

    if (eventType === EventType.MAIL_ORDER) {
      purchasedProducts = purchasedProducts.slice(0, -1);
    }

    return {
      rowNo: row.rowNumber,
      timestamp: dayjs(dataObject[dataKeys[ColumnIndex.TIMESTAMP]].split(']')[1], ['DD/MM/YYYY H:mm:ss', 'D/M/YYYY H:mm:ss', 'MM/DD/YYYY H:mm:ss', 'M/D/YYYY H:mm:ss'], true).format('YYYY-MM-DD HH:mm:ss'),
      status: dataObject[dataKeys[ColumnIndex.TIMESTAMP]].split(']')[0].replace('[', ''),
      customer: dataObject[dataKeys[ColumnIndex.NAME]],
      email: dataObject[dataKeys[ColumnIndex.EMAIL]],
      address: dataObject[dataKeys[ColumnIndex.ADDRESS]],
      phoneNumber: dataObject[dataKeys[ColumnIndex.PHONENUMBER]],
      socialMedia: dataObject[dataKeys[ColumnIndex.SOCIALMEDIA]],
      purchasedProducts,
      preferedExpedition: eventType === EventType.MAIL_ORDER ? dataObject[dataKeys[dataKeys.length - 1]] : undefined
    }
  });

  return orders;
}

async function updateOrderStatus({ spreadsheetID, rowNo, status }: UpdateOrderParams) {
  if (spreadsheetID === '') {
    return;
  }

  const serviceAccountAuth = new JWT({
    email: process.env.SPREADSHEET_SERVICE_ACCOUNT_EMAIL,
    key: process.env.SPREADSHEET_SERVICE_ACCOUNT_PRIVATE_KEY,
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets'
    ]
  });

  const spreadsheet = new GoogleSpreadsheet(spreadsheetID, serviceAccountAuth);
  await spreadsheet.loadInfo();

  const rows = await spreadsheet.sheetsByIndex[0].getRows<Record<string, string>>();
  const row = rows[rowNo - 2];

  const dataObject = row.toObject();
  const dataKeys = Object.keys(dataObject);

  row.set(dataKeys[ColumnIndex.TIMESTAMP], `[${status}]${dataObject[dataKeys[ColumnIndex.TIMESTAMP]]?.split(']')[1]}`);
  await row.save();
}

export {
  getOrder,
  getOrders,
  updateOrderStatus
}