import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import HistoryPage from "./pages/HistoryPage";
import SettingsPage from "./pages/SettingsPage";
import { LayoutDashboard, History, Settings, CreditCard } from "lucide-react";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-950 text-white font-sans">
        <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-2">
                <div className="bg-indigo-600 p-2 rounded-lg">
                  <CreditCard className="w-6 h-6" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  VirtuaPay
                </span>
              </div>
              <div className="flex space-x-4">
                <Link to="/" className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
                  <LayoutDashboard className="w-4 h-4" /> Products
                </Link>
                <Link to="/history" className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
                  <History className="w-4 h-4" /> History
                </Link>
                <Link to="/settings" className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
                  <Settings className="w-4 h-4" /> Settings
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
