'use client';

import { Card, Tab, TabGroup, TabList, Title } from '@tremor/react';
import Chart from './fundCharts';
import { FundOption, FUNDS } from './_fmarket-api/types';
import { useState } from 'react';

export default function IndexPage() {
  const [fund, setFund] = useState<FundOption>(FUNDS[0]);

  function onFundChange(index: number) {
    setFund(FUNDS[index]);
  }

  return (
    <main className='p-4 md:p-10 mx-auto max-w-7xl'>
      <Card className='mb-6'>
        <Title>Các quỹ được chọn lọc</Title>
        <TabGroup onIndexChange={onFundChange}>
          <TabList className='border-none'>
            {FUNDS.map(fund => {
              return (
                <Tab key={fund.id}>{fund.ticker}</Tab>
              );
            })}
          </TabList>
        </TabGroup>

        <div className='mt-4 text-gray-500 text-sm'>
          <p>Các chứng chỉ quỹ này được đánh giá và phân tích dựa trên các tiêu chí như:</p>
          <ol className='list-disc flex gap-10 pl-6'>
            <li>Lịch sử công ty quản lý</li>
            <li>Độ uy tín của đội ngũ quản lý</li>
            <li>Phí mua bán, phí quản lý</li>
            <li>Và một vài chỉ số tài chính quan trọng khác</li>
          </ol>
        </div>
      </Card>

      <Chart fund={fund} />
    </main>
  );
}
