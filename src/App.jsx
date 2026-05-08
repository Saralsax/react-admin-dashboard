import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet, useOutletContext, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

// Shared layout — Sidebar + Navbar stay mounted, only <Outlet> swaps
function AppLayout() {
  const [search, setSearch] = useState('');
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const activeNav = location.pathname.replace('/', '') || 'dashboard';

  const handleNavChange = (id) => {
    navigate(id === 'dashboard' ? '/' : `/${id}`);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; background: #0d1117; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #0d1117; }
        ::-webkit-scrollbar-thumb { background: #1f2937; border-radius: 3px; }
      `}</style>

      <div style={{ display: 'flex', height: '100vh', fontFamily: "'Syne', sans-serif", overflow: 'hidden' }}>
        <Sidebar
          active={activeNav}
          setActive={handleNavChange}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <Navbar search={search} setSearch={setSearch} activeNav={activeNav} />

          <main style={{ flex: 1, overflowY: 'auto', padding: '28px' }}>
            <Outlet context={{ search }} />
          </main>
        </div>
      </div>
    </>
  );
}

// Wrappers to pull search from Outlet context
function DashboardPage() {
  const { search } = useOutletContext();
  return <Dashboard search={search} />;
}

function UsersPage() {
  const { search } = useOutletContext();
  return <Users search={search} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}