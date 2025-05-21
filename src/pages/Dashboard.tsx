
import { Header } from "@/components/Header";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWallet } from "@/context/WalletContext";
import { useExpenses } from "@/context/ExpenseContext";
import { BarChart, LineChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Separator } from "@/components/ui/separator";
import { BarChart3, LineChart as LineChartIcon, History, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

type ExpensesByMonth = {
  name: string;
  expenses: number;
  income: number;
}[];

type ExpensesByCategory = {
  name: string;
  value: number;
}[];

const Dashboard = () => {
  const { user } = useWallet();
  const { expenses } = useExpenses();
  const navigate = useNavigate();
  
  if (!user?.isConnected) {
    navigate('/');
    return null;
  }
  
  // Sample data for charts - in a real app, this would be calculated from actual expenses
  const expensesByMonth: ExpensesByMonth = [
    { name: 'Jan', expenses: 400, income: 240 },
    { name: 'Feb', expenses: 300, income: 139 },
    { name: 'Mar', expenses: 200, income: 980 },
    { name: 'Apr', expenses: 278, income: 390 },
    { name: 'May', expenses: 189, income: 480 },
    { name: 'Jun', expenses: 239, income: 380 },
    { name: 'Jul', expenses: 349, income: 430 },
  ];

  const expenseHistory = expenses.slice(-5).map(expense => ({
    name: expense.description,
    amount: expense.amount,
    date: new Date().toLocaleDateString(),
    payer: expense.payer
  }));

  // Get the last 3 months of expenses for the chart
  const recentExpenses = expensesByMonth.slice(-3);

  // Customize chart colors based on theme
  const chartConfig = {
    expenses: {
      label: "Expenses",
      theme: {
        light: "#7E69AB",
        dark: "#9b87f5"
      }
    },
    income: {
      label: "Income",
      theme: {
        light: "#6fbcf0",
        dark: "#8fd4ff"
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      
      <main className="flex-1 container max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-suiPurple to-suiPurple-light bg-clip-text text-transparent flex items-center">
                <BarChart3 className="mr-2 h-6 w-6 text-suiPurple" /> Dashboard
              </h2>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                Analytics and overview of your expenses
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 hover:bg-suiPurple/10 hover:text-suiPurple transition-all"
            >
              Back to Home <ChevronRight size={16} />
            </Button>
          </div>
          
          <Separator className="bg-suiPurple/10" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Expense Trends Chart */}
            <Card className="shadow-md hover:shadow-lg transition-all dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2 text-suiPurple dark:text-suiPurple-light">
                      <LineChartIcon size={18} /> Monthly Expense Trends
                    </CardTitle>
                    <CardDescription className="dark:text-gray-400">
                      Your spending patterns over time
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ChartContainer config={chartConfig} className="aspect-[4/3]">
                  <LineChart data={expensesByMonth}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                    <XAxis dataKey="name" className="text-xs fill-gray-500 dark:fill-gray-400" />
                    <YAxis className="text-xs fill-gray-500 dark:fill-gray-400" />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="expenses" 
                      stroke="var(--color-expenses)" 
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="income" 
                      stroke="var(--color-income)" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
            
            {/* Recent Expenses Bar Chart */}
            <Card className="shadow-md hover:shadow-lg transition-all dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2 text-suiPurple dark:text-suiPurple-light">
                      <BarChart3 size={18} /> Recent Expenses Comparison
                    </CardTitle>
                    <CardDescription className="dark:text-gray-400">
                      Last 3 months expense breakdown
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ChartContainer config={chartConfig} className="aspect-[4/3]">
                  <BarChart data={recentExpenses}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                    <XAxis dataKey="name" className="text-xs fill-gray-500 dark:fill-gray-400" />
                    <YAxis className="text-xs fill-gray-500 dark:fill-gray-400" />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="expenses" fill="var(--color-expenses)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="income" fill="var(--color-income)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Activity */}
          <Card className="shadow-md hover:shadow-lg transition-all dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-suiPurple dark:text-suiPurple-light">
                <History size={18} /> Recent Activity
              </CardTitle>
              <CardDescription className="dark:text-gray-400">
                Your latest transactions and expense entries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {expenseHistory.length > 0 ? (
                  expenseHistory.map((item, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full sui-gradient-bg flex items-center justify-center">
                          <span className="text-white font-medium text-sm">{item.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-medium dark:text-gray-200">{item.name}</p>
                          <p className="text-xs text-muted-foreground dark:text-gray-400">
                            Paid by {item.payer.substring(0, 6)}... • {item.date}
                          </p>
                        </div>
                      </div>
                      <p className="font-mono font-medium text-suiPurple dark:text-suiPurple-light">
                        ${item.amount.toFixed(2)}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground dark:text-gray-400 py-4">
                    No recent transactions found
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <footer className="border-t py-4 px-4 text-center text-sm text-muted-foreground bg-white/90 dark:bg-gray-800/90 dark:text-gray-400 dark:border-gray-700 backdrop-blur-sm transition-colors">
        <div className="max-w-7xl mx-auto">
          <p>SuiSplit © {new Date().getFullYear()} - Splitting bills on Sui blockchain</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
