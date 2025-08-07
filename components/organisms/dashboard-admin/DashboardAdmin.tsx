'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/atoms/card';
import { Tabs, TabsContent } from '@/components/atoms/tabs';
import { ApiUrl } from '@/constants/api-url';
import { useEffectOnce } from '@/hooks/use-effect-once';
import { httpRequest } from '@/lib/apis/httpRequest';
import { formatCurrency } from '@/lib/utils';
import { IStatistics } from '@/types';
import { CreditCard, ListOrdered, ScanBarcode, User } from 'lucide-react';
import { useState } from 'react';

const DashboardAdmin = () => {
  const [statistics, setStatistics] = useState<IStatistics>();

  const getStatistics = async () => {
    const { data } = await httpRequest.get(ApiUrl.GET_STATISTICS);
    setStatistics(data.result);
  };

  useEffectOnce(() => {
    getStatistics();
  });

  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-base font-medium">Products</CardTitle>
              <ScanBarcode className="w-5 h-5 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statistics?.totalProducts}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-base font-medium">Customers</CardTitle>
              <User className="w-5 h-5 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statistics?.totalCustomers}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-base font-medium">Orders</CardTitle>
              <ListOrdered className="w-5 h-5 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statistics?.totalOrders}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-base font-medium">Payments</CardTitle>
              <CreditCard className="w-5 h-5 text-gray-500" />
            </CardHeader>
            <CardContent>
              {statistics && (
                <div className="text-2xl font-bold">
                  {formatCurrency(statistics.totalPaidPayments || 0, 'EUR')}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default DashboardAdmin;
