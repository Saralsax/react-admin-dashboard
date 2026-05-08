import SearchBar from './SearchBar';
import Avatar from './Avatar';
import { NAV_ITEMS } from '../data';

export default function Navbar({ search, setSearch, activeNav }) {
  const label = NAV_ITEMS.find(n => n.id === activeNav)?.label || "Dashboard";

  return (
    <header style={{
      height: 64, background: "#0d1117",
      borderBottom: "1px solid #1f2937",
      display: "flex", alignItems: "center",
      padding: "0 28px", gap: 20, flexShrink: 0,
    }}>
      <div style={{ flex: 1 }}>
        <h1 style={{
          color: "#f9fafb", margin: 0, fontSize: 18,
          fontFamily: "'Syne', sans-serif", fontWeight: 700,
          letterSpacing: "-0.02em",
        }}>{label}</h1>
      </div>

      <SearchBar value={search} onChange={setSearch} />

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ textAlign: "right" }}>
          <div style={{ color: "#e5e7eb", fontSize: 13, fontWeight: 600, fontFamily: "'Syne', sans-serif" }}>
            Admin User
          </div>
          <div style={{ color: "#4b5563", fontSize: 11 }}>Super Admin</div>
        </div>
        <Avatar initials="AU" size={36} />
      </div>
    </header>
  );
}