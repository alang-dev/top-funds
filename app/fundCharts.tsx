'use client';

import { BadgeDelta, BadgeDeltaProps, BarChart, Card, LineChart, Text, Title } from '@tremor/react';
import { FundOption, FunInfo, NavHistoryItem } from './_fmarket-api/types';
import { useEffect, useMemo, useState } from 'react';
import { getFundInfo, getNavHistory } from './_fmarket-api/api';
import { toVnd } from './_utils/intl';
import useNextTradingDateProjector from './_hooks/useNextTradingDateProjector';
import dayjs from 'dayjs';

interface Props {
  fund: FundOption;
}

export default function FundCharts({ fund }: Props) {
  const [navHistory, setNavHistory] = useState<NavHistoryItem[]>([]);
  const [fundInfo, setFundInfo] = useState<FunInfo>();

  const projectedNav = useNextTradingDateProjector(navHistory, fundInfo?.data.productTopHoldingList);

  useEffect(() => {
    getNavHistory(fund.id).then(response => {
      setNavHistory(response.data);
    });

    getFundInfo(fund.id).then(data => {
      setFundInfo(data);
    });
  }, [fund.id]);

  return (
    <>
      <Card>
        <Title>
          {fundInfo?.data.shortName} - {fundInfo?.data.name}
          <NavProjector
            projectedNav={projectedNav}
            closedOrderBookTime={fundInfo?.data.productTradingSession.closedOrderBookTime}
            latestNav={navHistory[navHistory.length - 1]?.nav}
          />
        </Title>
        <Text>
          Lịch sử Giá/CCQ
        </Text>
        <LineChart
          className='mt-4 h-80'
          data={navHistory}
          categories={['nav']}
          index='navDate'
          colors={['green']}
          valueFormatter={toVnd}
          yAxisWidth={60}
        />

        <Title className='mt-6'>Danh mục đầu tư lớn (Theo báo
          cáo {fundInfo?.data.productFund.updateAssetHoldingTime})</Title>
        <Text>Phiên khớp lệnh tiếp theo <strong>{fundInfo?.data.productTradingSession.tradingTimeString}</strong></Text>

        <BarChart
          className='mt-6'
          data={fundInfo?.data.productTopHoldingList || []}
          index='stockCode'
          categories={['netAssetPercent']}
          colors={['purple']}
          yAxisWidth={48}
          valueFormatter={formatPercentage}
        />
      </Card>
    </>
  );
}

interface NavProjectorProps {
  closedOrderBookTime?: number;
  projectedNav?: number;
  latestNav?: number;
}

function NavProjector({ closedOrderBookTime, projectedNav, latestNav }: NavProjectorProps) {
  const badgeProps: BadgeDeltaProps | undefined = useMemo(() => {
    if (!projectedNav || !latestNav) {
      return { children: 'Projecting...', deltaType: 'unchanged' }
    }

    return {
      deltaType: projectedNav > latestNav ? 'moderateIncrease' : 'moderateDecrease',
      children: (
        <b>
          {dayjs(closedOrderBookTime).format('DD/MM/YYYY') + ': ' + toVnd(projectedNav) + ' (' + (100 * (projectedNav / latestNav - 1)).toFixed(2) + '%)'}
        </b>
      )
    };
  }, [closedOrderBookTime, latestNav, projectedNav]);
  return <BadgeDelta {...badgeProps} className='ml-2' />
}

const formatPercentage = (number: number) => {
  return `${number} %`;
};
