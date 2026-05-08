import { NAV_ITEMS } from '../data';

export default function Sidebar({ active, setActive, collapsed, setCollapsed }) {
  return (
    <aside style={{
      width: collapsed ? 68 : 220,
      background: "#0d1117",
      borderRight: "1px solid #1f2937",
      display: "flex", flexDirection: "column",
      padding: "24px 0",
      transition: "width 0.25s ease",
      flexShrink: 0, position: "relative", zIndex: 10,
    }}>
      {/* Logo */}
      <div style={{
        padding: collapsed ? "0 14px 28px" : "0 20px 28px",
        display: "flex", alignItems: "center", gap: 10,
        overflow: "hidden",
      }}>
        <div style={{
          width: 34, height: 34,
          background: "linear-gradient(135deg, #6ee7f7, #6366f1)",
          borderRadius: 8, display: "flex", alignItems: "center",
          justifyContent: "center", flexShrink: 0, fontSize: 16,
        }}>⬡</div>
        {!collapsed && (
          <span style={{
            color: "#f9fafb", fontWeight: 800, fontSize: 17,
            fontFamily: "'Syne', sans-serif", whiteSpace: "nowrap",
            letterSpacing: "-0.02em",
          }}>Nexus</span>
        )}
      </div>

      {/* Nav Items */}
      <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4, padding: "0 10px" }}>
        {NAV_ITEMS.map(item => {
          const isActive = active === item.id;
          return (
            <button key={item.id} onClick={() => setActive(item.id)} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: collapsed ? "10px 12px" : "10px 14px",
              borderRadius: 8, border: "none", cursor: "pointer",
              background: isActive ? "rgba(110,231,247,0.1)" : "transparent",
              color: isActive ? "#6ee7f7" : "#6b7280",
              fontFamily: "'Syne', sans-serif", fontWeight: isActive ? 600 : 500,
              fontSize: 14, transition: "all 0.15s", textAlign: "left",
              borderLeft: isActive ? "2px solid #6ee7f7" : "2px solid transparent",
              overflow: "hidden", whiteSpace: "nowrap",
            }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
              {!collapsed && item.label}
            </button>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <button onClick={() => setCollapsed(c => !c)} style={{
        margin: "0 10px", padding: "10px 12px",
        background: "transparent", border: "1px solid #1f2937",
        borderRadius: 8, color: "#4b5563", cursor: "pointer",
        fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.15s",
      }}>
        {collapsed ? "→" : "←"}
      </button>
    </aside>
  );
}