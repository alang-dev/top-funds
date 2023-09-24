import { FunInfo, NavHistory } from './types';
import dayjs from 'dayjs';

const BASE_URL = 'https://api.fmarket.vn/res'

const FETCH_HEADERS = {
  'accept': 'application/json, text/plain, */*',
  'content-type': 'application/json',
};

export async function getNavHistory(fundId: number): Promise<NavHistory> {
  const res = await fetch(`${BASE_URL}/product/get-nav-history`,
    {
      method: 'POST',
      body: JSON.stringify({
        isAllData: 0,
        productId: fundId,
        fromDate: dayjs().add(-1, 'year').format('YYYYMMDD'),
        toDate: dayjs().format('YYYYMMDD')
      }),
      headers: FETCH_HEADERS
    });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to get nav history data');
  }

  return res.json();
}


export async function getFundInfo(fundId: number): Promise<FunInfo> {
  const res = await fetch(`${BASE_URL}/products/${fundId}`, {
    headers: FETCH_HEADERS,
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to get fund info');
  }

  return res.json()
}
