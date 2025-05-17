import Layout from "@/components/Layout";
import { useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import { useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Cell, 
  Legend,
} from "recharts";


type Collection = {
  id: number;
  total: number;
  growth: number;
  chart: { date: string; value: number }[];
};
type Payout = { id: number; amount: number; date: string; breakdown: { date: string; amount: number }[] };
type Transaction = {
  id: number;
  total: number;
  growth: number;
  chart: { date: string; value: number }[];
};

type PayoutSummary = {
  id: number;
  total: number;
  growth: number;
  chart: { date: string; value: number }[];
};

type TopCollection = { id: number; label: string; amount: number; percent: number };
type ActiveStats = { id: number; active: number; inactive: number };
type PaymentMethod = { id: number; method: string; value: number; amount: number };


export default function Dashboard() {
  const [showCurrentMonth, setShowCurrentMonth] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedRange, setSelectedRange] = useState("Compared to previous Month");
  const [collections, setCollections] = useState<Collection | null>(null);
  const [transactions, setTransactions] = useState<Transaction | null>(null);
  const [payout, setPayout] = useState<Payout | null>(null);
  const [payouts, setPayouts] = useState<PayoutSummary | null>(null);
  const [topCollections, setTopCollections] = useState<TopCollection[]>([]);
  const [activeStats, setActiveStats] = useState<ActiveStats | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const COLORS = ['#3b82f6', '#e5e7eb']; // Blue for active, Gray for inactive
  const pieData = activeStats
    ? [
        { name: 'Active Collection', value: activeStats.active },
        { name: 'Inactive Collection', value: activeStats.inactive },
      ]
    : [];

  

  const handleSelect = (option: string) => {
    setSelectedRange(option);
    setShowCurrentMonth(false);
    setShowDropdown(false);
    // Optional: Trigger filter or API fetch here
  };
  useEffect(() => {
    fetch("/db.json")
      .then(res => res.json())
      .then(data => {
        setCollections(data.collections[0]);
        setTransactions(data.transactions[0]);
        setPayout(data.payout[0]);
        setPayouts(data.payouts[0]);
        setTopCollections(data.topCollections);
        setActiveStats(data.activeVsInactive[0]);
        setPaymentMethods(data.collectionsByMethod);
      });
  }, []);
  
  return (
    <Layout>
      <h1 className="text-xl font-semibold mb-4">Overview dashboard</h1>
      
      <div className="flex items-center justify-end mb-4 space-x-2 relative">
      {/* This Month Button */}
      <button
        onClick={() => {
          setShowCurrentMonth(true);
          setShowDropdown(false);
          setSelectedRange("Compared to previous Month"); // ✅ reset label
        }}
        className={`flex items-center gap-1 px-3 py-1 rounded border text-sm ${
          showCurrentMonth ? "bg-white shadow text-black" : "text-gray-500"
        }`}
      >
        <Calendar size={16} />
        This Month
      </button>


      {/* Dropdown Button */}
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className={`flex items-center gap-1 px-3 py-1 rounded border text-sm ${
            !showCurrentMonth ? "bg-white shadow text-black" : "text-gray-500"
          }`}
        >
          {selectedRange}
          <ChevronDown size={16} />
        </button>

        {/* Dropdown */}
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-44 bg-white border rounded shadow z-50">
            {["Today", "Last 7 Days", "This Month", "This Year"].map((option) => (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
{showCurrentMonth ? (
  // This Month Cards
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

  {/* Card 1 */}
  <div className="bg-white p-4 rounded-lg shadow-sm border">
    <div className="flex justify-between items-center">
      <h2 className="text-sm font-medium text-gray-500 mb-1">Total Collections</h2>
      <a href="#" className="text-xs text-blue-600 font-medium hover:underline">View All</a>
    </div>
    <p className="text-xl font-semibold text-gray-800">
      RM{collections?.total?.toLocaleString()} <span className="text-green-600 text-sm">↑ {collections?.growth}%</span>
    </p>

    {/* ✅ Add this chart block below */}
    {collections?.chart && (
      <ResponsiveContainer width="100%" height={120}>
        <LineChart
          width={250}
          height={100}
          data={collections?.chart}
          margin={{ top: 5, right: 5, left: 0, bottom: 5 }} // ✅ trim margins
        >
          <XAxis dataKey="date" fontSize={10} />
          <YAxis fontSize={10} hide />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    )}
  </div>


{/* Card 2 */}
<div className="bg-white p-4 rounded-lg shadow-sm border">
  <div className="flex justify-between items-center">
    <h2 className="text-sm font-medium text-gray-500 mb-1">Total Transactions</h2>
    <a href="#" className="text-xs text-blue-600 font-medium hover:underline">View All</a>
  </div>
  <p className="text-xl font-semibold text-gray-800">
    {transactions?.total}{" "}
    <span className="text-red-500 text-sm">
      ↓ {transactions?.growth !== undefined ? Math.abs(transactions.growth) : "0"}%
    </span>
  </p>

  {/* ✅ Add this chart if chart data exists */}
  {transactions?.chart && (
  <ResponsiveContainer width="100%" height={120}>
    <LineChart data={transactions.chart} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
      <XAxis dataKey="date" fontSize={10} />
      <YAxis fontSize={10} hide />
      <Tooltip />
      <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} />
    </LineChart>
  </ResponsiveContainer>
)}

</div>


  {/* Card 3 - Upcoming FPX Payout */}
  <div className="bg-white p-4 rounded-lg shadow-sm border">
    <div className="flex justify-between items-center">
      <h2 className="text-sm font-medium text-gray-500">Upcoming FPX Payout</h2>
      <a href="#" className="text-xs text-blue-600 font-medium hover:underline">See details</a>
    </div>
    <p className="text-xl font-bold text-gray-800 mt-1">
      RM{payout?.amount?.toLocaleString()}
    </p>
    <p className="text-xs text-gray-500 mt-1">
      Expected to reach your bank account on {payout?.date}
    </p>

    {/* Divider */}
    <hr className="my-3 border-t border-gray-200" />

    {/* Breakdown */}
    <div>
      <h3 className="text-xs text-gray-400 font-medium mb-2">COLLECTION DATE</h3>
      {payout?.breakdown?.map((item, index) => (
        <div key={index} className="flex justify-between text-sm text-gray-700 font-medium mb-1">
          <span>{item.date}</span>
          <span>RM{item.amount?.toLocaleString()}</span>
        </div>
      ))}
    </div>
  </div>


  {/* Card 4 */}
  <div className="bg-white p-4 rounded-lg shadow-sm border">
    <div className="flex justify-between items-center">
      <h2 className="text-sm font-medium text-gray-500 mb-1">Total Payouts</h2>
      <a href="#" className="text-xs text-blue-600 font-medium hover:underline">View All</a>
    </div>
    <p className="text-xl font-semibold text-gray-800">
      RM{payouts?.total?.toLocaleString()} <span className="text-green-600 text-sm">↑ {payouts?.growth}%</span>
    </p>

    {payouts?.chart && (
  <ResponsiveContainer width="100%" height={120}>
    <LineChart data={payouts.chart} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
      <XAxis dataKey="date" fontSize={10} />
      <YAxis fontSize={10} hide />
      <Tooltip />
      <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} />
    </LineChart>
  </ResponsiveContainer>
)}


  </div>

  {/* Card 5 - Top Performing Collections */}
  <div className="bg-white p-4 rounded-lg shadow-sm border h-60 flex flex-col">
    <h2 className="text-sm font-medium text-gray-500 mb-2">Top 5 Performing Collections</h2>

    {/* Bars take up remaining space */}
    <div className="flex-1 flex flex-col justify-between">
      {topCollections?.slice(0, 5).map((item) => (
        <div key={item.id}>
          {/* Label */}
          <div className="text-[7px] font-medium text-gray-700">{item.label}</div>

          {/* Bar wrapper */}
          <div className="relative w-full bg-gray-100 h-3 rounded overflow-visible">
            {/* Text over bar */}
            <div className="absolute inset-y-0 left-2 flex items-center text-[7px] font-semibold text-blue-700 z-10">
              RM {item.amount.toLocaleString()}
            </div>

            {/* Blue bar */}
            <div
              className="h-3 bg-blue-500 rounded"
              style={{ width: `${item.percent}%` }}
            />
          </div>

          {/* Percent on bottom right */}
          <div className="text-right text-[7px] text-gray-500 mt-1">{item.percent}%</div>
        </div>
      ))}
    </div>
  </div>





  {/* Card 6 */}
  <div className="bg-white p-4 rounded-lg shadow-sm border">
    <h2 className="text-sm font-medium text-gray-500 mb-1">Active vs. Inactive Collections</h2>

    {activeStats && (
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={[
              { name: 'Active Collection', value: activeStats.active },
              { name: 'Inactive Collection', value: activeStats.inactive }
            ]}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={60}
            innerRadius={40}
            fill="#3b82f6"
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
          >
            <Cell fill="#3b82f6" />
            <Cell fill="#e5e7eb" />
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            formatter={(value: string, entry: any) => {
              const count =
                entry.payload.name === "Active Collection"
                  ? activeStats.active
                  : activeStats.inactive;
              return (
                <span className="text-xs text-gray-700">{value}: {count}</span>
              );
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    )}
  </div>


  {/* Card 7 */}
  <div className="bg-white p-4 rounded-lg shadow-sm border">
    <h2 className="text-sm font-medium text-gray-500 mb-1">Collections by Payment Methods</h2>

    {paymentMethods?.length > 0 && (
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={paymentMethods}
            dataKey="value"
            nameKey="method"
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={55}
            label={({ percent, x, y }) => (
              <text
                x={x}
                y={y}
                fill="#3b82f6"
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={10}
              >
                {(percent * 100).toFixed(0)}%
              </text>
            )}
          >
            {paymentMethods.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={['#3b82f6', '#60a5fa', '#93c5fd'][index % 3]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number, name: string, props: any) => [
              `RM${props.payload.amount.toLocaleString()}`,
              name,
            ]}
          />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            formatter={(value: string, entry: any) => {
              const amount = entry.payload.amount.toLocaleString();
              return (
                <span className="text-xs text-gray-700">
                  {value}: RM{amount}
                </span>
              );
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    )}
  </div>




</div>

) : (
  // Previous Month Comparison Cards
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {/* e.g. Last month, % changes, breakdown */}
  </div>
)}

    </Layout>
  );
}
