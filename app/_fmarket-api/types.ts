
export interface FundOption {
  ticker: string
  id: number
}

export const FUNDS: FundOption[] = [
  { ticker: 'VESAF', id: 23 },
  { ticker: 'DCDS', id: 28 },
];

export interface NavHistory {
  data: NavHistoryItem[]
}

export interface FunInfo {
  data: {
    id: number,
    name: string
    shortName: string
    description: string
    productTradingSession: {
      closedOrderBookTime: number,
      tradingTimeString: string
    }
    productTopHoldingList: IPortfolioItem[]
    productFund: {
      updateAssetHoldingTime: string
    }
  }
}

export interface NavHistoryItem {
  id: number,
  createdAt: number,
  nav: number,
  navDate: string,
  productId: number
}

export interface IPortfolioItem {
  id: number;
  stockCode: string;
  industry: string;
  type: string;
  netAssetPercent: number;
  updatedAt: number;
}

export interface IPortfolioItemAtReportDate extends IPortfolioItem {
  reportedDate: string
  stockPrice: number
}
