'use client';

import { useState } from 'react';
import { 
  ArrowUpIcon, 
  ArrowDownIcon, 
  ShoppingBagIcon, 
  UsersIcon, 
  CurrencyDollarIcon, 
  ChartBarIcon 
} from '@heroicons/react/24/outline';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const salesData = [
  { name: 'Jan', revenue: 4000, orders: 2400, customers: 2400 },
  { name: 'Feb', revenue: 3000, orders: 1398, customers: 2210 },
  { name: 'Mar', revenue: 2000, orders: 9800, customers: 2290 },
  { name: 'Apr', revenue: 2780, orders: 3908, customers: 2000 },
  { name: 'May', revenue: 1890, orders: 4800, customers: 2181 },
  { name: 'Jun', revenue: 2390, orders: 3800, customers: 2500 },
  { name: 'Jul', revenue: 3490, orders: 4300, customers: 2100 },
];

const categoryData = [
  { name: 'Shoes', value: 35 },
  { name: 'Clothing', value: 25 },
  { name: 'Accessories', value: 20 },
  { name: 'Electronics', value: 15 },
  { name: 'Others', value: 5 },
];

const topProducts = [
  { id: 1, name: 'Nike Air Max 270', sales: 1250, revenue: 187500 },
  { id: 2, name: 'Adidas Ultraboost 21', sales: 980, revenue: 176400 },
  { id: 3, name: 'Puma RS-X', sales: 850, revenue: 93500 },
  { id: 4, name: 'New Balance 574', sales: 720, revenue: 64780 },
  { id: 5, name: 'Reebok Classic', sales: 680, revenue: 51000 },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('monthly');
  const [chartType, setChartType] = useState('line');

  // Calculate summary metrics
  const totalRevenue = salesData.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrders = salesData.reduce((sum, item) => sum + item.orders, 0);
  const totalCustomers = salesData.reduce((sum, item) => sum + item.customers, 0);
  const avgOrderValue = totalRevenue / totalOrders || 0;

  // Calculate percentage changes
  const revenueChange = ((salesData[6].revenue - salesData[5].revenue) / salesData[5].revenue) * 100;
  const ordersChange = ((salesData[6].orders - salesData[5].orders) / salesData[5].orders) * 100;
  const customersChange = ((salesData[6].customers - salesData[5].customers) / salesData[5].customers) * 100;
  const aovChange = ((avgOrderValue - (salesData[5].revenue / salesData[5].orders)) / (salesData[5].revenue / salesData[5].orders)) * 100;

  const renderChart = () => {
    if (chartType === 'line') {
      return (
        <LineChart
          data={salesData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="revenue"
            name="Revenue ($)"
            stroke="#8884d8"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="orders"
            name="Orders"
            stroke="#82ca9d"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="customers"
            name="Customers"
            stroke="#ffc658"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      );
    } else {
      return (
        <BarChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="revenue" name="Revenue ($)" fill="#8884d8" />
          <Bar dataKey="orders" name="Orders" fill="#82ca9d" />
          <Bar dataKey="customers" name="Customers" fill="#ffc658" />
        </BarChart>
      );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="mt-1 text-sm text-gray-500">
          Track and analyze your store's performance
        </p>
      </div>

      {/* Date Range Selector */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <button
            type="button"
            className={`px-3 py-1.5 text-sm font-medium rounded-md ${
              timeRange === 'daily'
                ? 'bg-pink-100 text-pink-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setTimeRange('daily')}
          >
            Daily
          </button>
          <button
            type="button"
            className={`px-3 py-1.5 text-sm font-medium rounded-md ${
              timeRange === 'weekly'
                ? 'bg-pink-100 text-pink-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setTimeRange('weekly')}
          >
            Weekly
          </button>
          <button
            type="button"
            className={`px-3 py-1.5 text-sm font-medium rounded-md ${
              timeRange === 'monthly'
                ? 'bg-pink-100 text-pink-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setTimeRange('monthly')}
          >
            Monthly
          </button>
          <button
            type="button"
            className={`px-3 py-1.5 text-sm font-medium rounded-md ${
              timeRange === 'yearly'
                ? 'bg-pink-100 text-pink-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setTimeRange('yearly')}
          >
            Yearly
          </button>
        </div>
        <div className="flex space-x-2">
          <button
            type="button"
            className={`p-1.5 rounded-md ${
              chartType === 'line' ? 'bg-pink-100 text-pink-600' : 'text-gray-500 hover:bg-gray-100'
            }`}
            onClick={() => setChartType('line')}
            title="Line Chart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18v4H3V4z"
              />
            </svg>
          </button>
          <button
            type="button"
            className={`p-1.5 rounded-md ${
              chartType === 'bar' ? 'bg-pink-100 text-pink-600' : 'text-gray-500 hover:bg-gray-100'
            }`}
            onClick={() => setChartType('bar')}
            title="Bar Chart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-5 mt-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="px-4 py-5 bg-white rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0 p-3 rounded-md bg-pink-50">
              <CurrencyDollarIcon className="w-6 h-6 text-pink-600" />
            </div>
            <div className="ml-5
            ">
              <p className="text-sm font-medium text-gray-500 truncate">Total Revenue</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                ${totalRevenue.toLocaleString()}
              </p>
              <div className="flex items-center mt-1">
                {revenueChange >= 0 ? (
                  <ArrowUpIcon className="w-4 h-4 text-green-500" />
                ) : (
                  <ArrowDownIcon className="w-4 h-4 text-red-500" />
                )}
                <span
                  className={`ml-1 text-sm font-medium ${
                    revenueChange >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {Math.abs(revenueChange).toFixed(1)}% from last {timeRange}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-5 bg-white rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0 p-3 rounded-md bg-green-50">
              <ShoppingBagIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500 truncate">Total Orders</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {totalOrders.toLocaleString()}
              </p>
              <div className="flex items-center mt-1">
                {ordersChange >= 0 ? (
                  <ArrowUpIcon className="w-4 h-4 text-green-500" />
                ) : (
                  <ArrowDownIcon className="w-4 h-4 text-red-500" />
                )}
                <span
                  className={`ml-1 text-sm font-medium ${
                    ordersChange >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {Math.abs(ordersChange).toFixed(1)}% from last {timeRange}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-5 bg-white rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0 p-3 rounded-md bg-blue-50">
              <UsersIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500 truncate">Total Customers</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {totalCustomers.toLocaleString()}
              </p>
              <div className="flex items-center mt-1">
                {customersChange >= 0 ? (
                  <ArrowUpIcon className="w-4 h-4 text-green-500" />
                ) : (
                  <ArrowDownIcon className="w-4 h-4 text-red-500" />
                )}
                <span
                  className={`ml-1 text-sm font-medium ${
                    customersChange >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {Math.abs(customersChange).toFixed(1)}% from last {timeRange}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-5 bg-white rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0 p-3 rounded-md bg-yellow-50">
              <ChartBarIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500 truncate">Avg. Order Value</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                ${avgOrderValue.toFixed(2)}
              </p>
              <div className="flex items-center mt-1">
                {aovChange >= 0 ? (
                  <ArrowUpIcon className="w-4 h-4 text-green-500" />
                ) : (
                  <ArrowDownIcon className="w-4 h-4 text-red-500" />
                )}
                <span
                  className={`ml-1 text-sm font-medium ${
                    aovChange >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {Math.abs(aovChange).toFixed(1)}% from last {timeRange}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chart */}
      <div className="p-5 bg-white rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900">Sales Overview</h3>
        <div className="mt-4 h-80">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-5 mt-5 lg:grid-cols-2">
        {/* Category Distribution */}
        <div className="p-5 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Sales by Category</h3>
          <div className="flex items-center justify-center h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products */}
        <div className="p-5 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Top Selling Products</h3>
          <div className="mt-4">
            <div className="overflow-hidden border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Product
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Sales
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Revenue
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {topProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.sales.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          ${product.revenue.toLocaleString()}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
