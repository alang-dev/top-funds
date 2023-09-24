import { IPortfolioItem, IPortfolioItemAtReportDate, NavHistoryItem } from '../_fmarket-api/types';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { getHistoryQuotes } from '../_fireant-api';

const PROJECTOR_LENGTH = 3;

function useNextTradingDateProjector(navHistoryItems: NavHistoryItem[] = [], fundPortfolio: IPortfolioItem[] = []) {
  const [projectNav, setProjectedNav] = useState<number>()

  useEffect(() => {
    setProjectedNav(undefined)
    if (navHistoryItems.length === 0 || fundPortfolio.length === 0) {
      return;
    }

    const navAverage = navHistoryItems.slice(-PROJECTOR_LENGTH).reduce((previousValue, currentValue) => previousValue + currentValue.nav, 0) / PROJECTOR_LENGTH;
    const totalPercentage = fundPortfolio.reduce((previousValue, currentValue) => previousValue + currentValue.netAssetPercent, 0);

    const lastMonth = dayjs().add(-1, 'month').format('YYYY-MM');
    const navAtEndOfLastMonth = navHistoryItems
      .filter(item => item.navDate.startsWith(lastMonth))
      .sort((a, b) => b.navDate.localeCompare(a.navDate))[0];

    (async () => {
      // Get Stock price at end of last month
      const baseItems: IPortfolioItemAtReportDate[] = [];
      for (const position of fundPortfolio) {
        const historyQuote = await getLatestStockPrice(position.stockCode, navAtEndOfLastMonth.navDate);
        baseItems.push({
          ...position,
          reportedDate: historyQuote.date,
          stockPrice: historyQuote.priceClose
        });
      }

      if (baseItems.length !== fundPortfolio.length) {
        return;
      }

      // Get latest stock price to project percentage
      let projectedPercentage = 0
      for (const position of baseItems) {
        const historyQuote = await getLatestStockPrice(position.stockCode);
        const itemPercentage = historyQuote.priceClose * position.netAssetPercent / position.stockPrice;
        projectedPercentage += itemPercentage
      }

      const bigErrorNav =  projectedPercentage * navAtEndOfLastMonth.nav / totalPercentage
      return (bigErrorNav + navAverage) / 2

    })().then(projectedNav => {
      setProjectedNav(projectedNav)
    })

  }, [navHistoryItems, fundPortfolio]);

  return projectNav
}

async function getLatestStockPrice(ticker: string, nextDate: string = dayjs().format('YYYY-MM-DD'), attempt: number = 1) {
  if (attempt > 22) {
    throw new Error('Max attempt exceed!');
  }

  try {
    const quotes = await getHistoryQuotes({ ticker, startDate: nextDate, endDate: nextDate });
    if (quotes.length === 0) {
      return getLatestStockPrice(ticker, dayjs(nextDate).add(-1, 'day').format('YYYY-MM-DD'), attempt + 1);
    }
    return quotes[0];
  } catch (err) {
    return getLatestStockPrice(ticker, nextDate, attempt + 1);
  }
}

export default useNextTradingDateProjector;
