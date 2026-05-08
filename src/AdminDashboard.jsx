import { useState, useMemo } from "react";

// ─── Static Data ────────────────────────────────────────────────────────────
const USERS = [
  { id: 1, name: "Aarav Sharma", email: "aarav@nexus.io", role: "Admin", status: "Active", joined: "Jan 12, 2024", location: "Mumbai, IN", avatar: "AS" },
  { id: 2, name: "Priya Nair", email: "priya@nexus.io", role: "Editor", status: "Active", joined: "Feb 3, 2024", location: "Bengaluru, IN", avatar: "PN" },
  { id: 3, name: "Rohan Mehta", email: "rohan@nexus.io", role: "Viewer", status: "Pending", joined: "Mar 18, 2024", location: "Delhi, IN", avatar: "RM" },
  { id: 4, name: "Sara Kim", email: "sara@nexus.io", role: "Editor", status: "Inactive", joined: "Nov 5, 2023", location: "Seoul, KR", avatar: "SK" },
  { id: 5, name: "James Okafor", email: "james@nexus.io", role: "Admin", status: "Active", joined: "Oct 22, 2023", location: "Lagos, NG", avatar: "JO" },
  { id: 6, name: "Mei Lin", email: "mei@nexus.io", role: "Viewer", status: "Pending", joined: "Apr 1, 2024", location: "Shanghai, CN", avatar: "ML" },
  { id: 7, name: "Carlos Rivera", email: "carlos@nexus.io", role: "Editor", status: "Active", joined: "Dec 9, 2023", location: "Mexico City, MX", avatar: "CR" },
  { id: 8, name: "Fatima Al-Farsi", email: "fatima@nexus.io", role: "Viewer", status: "Inactive", joined: "Sep 14, 2023", location: "Dubai, AE", avatar: "FA" },
  { id: 9, name: "Lena Fischer", email: "lena@nexus.io", role: "Admin", status: "Active", joined: "May 30, 2024", location: "Berlin, DE", avatar: "LF" },
  { id: 10, name: "Tariq Hassan", email: "tariq@nexus.io", role: "Editor", status: "Pending", joined: "Jun 7, 2024", location: "Karachi, PK", avatar: "TH" },
];

const STATS = [
  { label: "Total Users", value: "10,482", delta: "+12%", icon: "👥", color: "#6ee7f7" },
  { label: "Active Users", value: "7,831", delta: "+8%", icon: "✅", color: "#86efac" },
  { label: "Pending Users", value: "1,204", delta: "+3%", icon: "⏳", color: "#fde68a" },
  { label: "Revenue", value: "$94,210", delta: "+21%", icon: "💰", color: "#c4b5fd" },
];

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "⬡" },
  { id: "users", label: "Users", icon: "◈" },
  { id: "analytics", label: "Analytics", icon: "◫" },
  { id: "settings", label: "Settings", icon: "◎" },
];

// ─── Status Badge ────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const styles = {
    Active: { background: "rgba(134,239,172,0.15)", color: "#86efac", border: "1px solid rgba(134,239,172,0.3)" },
    Pending: { background: "rgba(253,230,138,0.15)", color: "#fde68a", border: "1px solid rgba(253,230,138,0.3)" },
    Inactive: { background: "rgba(252,165,165,0.15)", color: "#fca5a5", border: "1px solid rgba(252,165,165,0.3)" },
  };
  return (
    <span style={{
      ...styles[status],
      padding: "3px 10px",
      borderRadius: "20px",
      fontSize: "11px",
      fontWeight: 600,
      letterSpacing: "0.05em",
      textTransform: "uppercase",
    }}>
      {status}
    </span>
  );
}

// ─── Avatar ──────────────────────────────────────────────────────────────────
function Avatar({ initials, size = 36 }) {
  const colors = ["#6ee7f7", "#86efac", "#fde68a", "#c4b5fd", "#f9a8d4"];
  const color = colors[initials.charCodeAt(0) % colors.length];
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: `${color}22`, border: `1.5px solid ${color}55`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.33, fontWeight: 700, color, flexShrink: 0,
      fontFamily: "'DM Mono', monospace",
    }}>
      {initials}
    </div>
  );
}

// ─── Modal ───────────────────────────────────────────────────────────────────
function UserModal({ user, onClose }) {
  if (!user) return null;
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1000, backdropFilter: "blur(6px)",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#111827",
        border: "1px solid #1f2937",
        borderRadius: "16px",
        padding: "32px",
        width: "100%", maxWidth: "420px",
        boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
        position: "relative",
      }}>
        <button onClick={onClose} style={{
          position: "absolute", top: 16, right: 16,
          background: "#1f2937", border: "none", color: "#9ca3af",
          width: 32, height: 32, borderRadius: "50%", cursor: "pointer",
          fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center",
        }}>×</button>

        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
          <Avatar initials={user.avatar} size={56} />
          <div>
            <div style={{ color: "#f9fafb", fontWeight: 700, fontSize: 18, fontFamily: "'Syne', sans-serif" }}>{user.name}</div>
            <div style={{ color: "#6b7280", fontSize: 13 }}>{user.email}</div>
          </div>
        </div>

        {[
          ["Role", user.role],
          ["Status", null],
          ["Joined", user.joined],
          ["Location", user.location],
        ].map(([label, value]) => (
          <div key={label} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "12px 0", borderBottom: "1px solid #1f2937",
          }}>
            <span style={{ color: "#6b7280", fontSize: 13, fontFamily: "'DM Mono', monospace" }}>{label}</span>
            {label === "Status" ? <StatusBadge status={user.status} /> : (
              <span style={{ color: "#e5e7eb", fontSize: 13, fontWeight: 500 }}>{value}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────
function Sidebar({ active, setActive, collapsed, setCollapsed }) {
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
          width: 34, height: 34, background: "linear-gradient(135deg, #6ee7f7, #6366f1)",
          borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, fontSize: 16,
        }}>⬡</div>
        {!collapsed && (
          <span style={{
            color: "#f9fafb", fontWeight: 800, fontSize: 17,
            fontFamily: "'Syne', sans-serif", whiteSpace: "nowrap",
            letterSpacing: "-0.02em",
          }}>Nexus</span>
        )}
      </div>

      {/* Nav items */}
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

      {/* Collapse toggle */}
      <button onClick={() => setCollapsed(c => !c)} style={{
        margin: "0 10px",
        padding: "10px 12px",
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

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ search, setSearch, activeNav }) {
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

      {/* Search */}
      <div style={{ position: "relative" }}>
        <span style={{
          position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
          color: "#4b5563", fontSize: 14, pointerEvents: "none",
        }}>⌕</span>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search users..."
          style={{
            background: "#111827", border: "1px solid #1f2937",
            borderRadius: 8, padding: "8px 14px 8px 32px",
            color: "#e5e7eb", fontSize: 13,
            fontFamily: "'DM Mono', monospace",
            outline: "none", width: 200,
            transition: "border 0.15s",
          }}
          onFocus={e => e.target.style.borderColor = "#6ee7f7"}
          onBlur={e => e.target.style.borderColor = "#1f2937"}
        />
      </div>

      {/* Profile */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ textAlign: "right" }}>
          <div style={{ color: "#e5e7eb", fontSize: 13, fontWeight: 600, fontFamily: "'Syne', sans-serif" }}>Admin User</div>
          <div style={{ color: "#4b5563", fontSize: 11 }}>Super Admin</div>
        </div>
        <Avatar initials="AU" size={36} />
      </div>
    </header>
  );
}

// ─── Dashboard Cards ──────────────────────────────────────────────────────────
function DashboardCards() {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: 16, marginBottom: 28,
    }}>
      {STATS.map(stat => (
        <div key={stat.label} style={{
          background: "#111827",
          border: "1px solid #1f2937",
          borderRadius: 12, padding: "20px 22px",
          position: "relative", overflow: "hidden",
          transition: "transform 0.15s, border-color 0.15s",
        }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.borderColor = stat.color + "55";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.borderColor = "#1f2937";
          }}
        >
          {/* Glow accent */}
          <div style={{
            position: "absolute", top: 0, right: 0,
            width: 80, height: 80,
            background: `radial-gradient(circle, ${stat.color}18 0%, transparent 70%)`,
          }} />

          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ color: "#6b7280", fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "'DM Mono', monospace" }}>
              {stat.label}
            </span>
            <span style={{ fontSize: 20 }}>{stat.icon}</span>
          </div>
          <div style={{ color: "#f9fafb", fontSize: 26, fontWeight: 800, fontFamily: "'Syne', sans-serif", marginBottom: 6 }}>
            {stat.value}
          </div>
          <div style={{ color: stat.color, fontSize: 12, fontWeight: 600 }}>
            {stat.delta} <span style={{ color: "#4b5563" }}>vs last month</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── User Table ───────────────────────────────────────────────────────────────
function UserTable({ search, onRowClick }) {
  const filtered = useMemo(() =>
    USERS.filter(u => u.name.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  return (
    <div style={{
      background: "#111827", border: "1px solid #1f2937",
      borderRadius: 12, overflow: "hidden",
    }}>
      <div style={{
        padding: "18px 22px", borderBottom: "1px solid #1f2937",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <h2 style={{
          color: "#f9fafb", margin: 0, fontSize: 15,
          fontFamily: "'Syne', sans-serif", fontWeight: 700,
        }}>All Users</h2>
        <span style={{
          background: "rgba(110,231,247,0.1)", color: "#6ee7f7",
          padding: "3px 10px", borderRadius: 20,
          fontSize: 11, fontWeight: 600, fontFamily: "'DM Mono', monospace",
        }}>{filtered.length} records</span>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 560 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #1f2937" }}>
              {["User", "Email", "Role", "Status"].map(h => (
                <th key={h} style={{
                  padding: "12px 22px", textAlign: "left",
                  color: "#4b5563", fontSize: 11, fontWeight: 600,
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  fontFamily: "'DM Mono', monospace",
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={4} style={{ padding: "40px", textAlign: "center", color: "#4b5563", fontFamily: "'DM Mono', monospace", fontSize: 13 }}>No users found</td></tr>
            ) : filtered.map((user, i) => (
              <tr key={user.id} onClick={() => onRowClick(user)} style={{
                borderBottom: i < filtered.length - 1 ? "1px solid #1f2937" : "none",
                cursor: "pointer", transition: "background 0.12s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <td style={{ padding: "14px 22px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Avatar initials={user.avatar} size={32} />
                    <span style={{ color: "#e5e7eb", fontSize: 14, fontWeight: 500, fontFamily: "'Syne', sans-serif" }}>{user.name}</span>
                  </div>
                </td>
                <td style={{ padding: "14px 22px", color: "#6b7280", fontSize: 13, fontFamily: "'DM Mono', monospace" }}>{user.email}</td>
                <td style={{ padding: "14px 22px" }}>
                  <span style={{
                    color: "#9ca3af", fontSize: 12, fontWeight: 500,
                    fontFamily: "'DM Mono', monospace",
                    background: "#1f2937", padding: "3px 8px", borderRadius: 4,
                  }}>{user.role}</span>
                </td>
                <td style={{ padding: "14px 22px" }}><StatusBadge status={user.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [collapsed, setCollapsed] = useState(false);

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

      <div style={{ display: "flex", height: "100vh", fontFamily: "'Syne', sans-serif", overflow: "hidden" }}>
        <Sidebar active={activeNav} setActive={setActiveNav} collapsed={collapsed} setCollapsed={setCollapsed} />

        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <Navbar search={search} setSearch={setSearch} activeNav={activeNav} />

          <main style={{ flex: 1, overflowY: "auto", padding: "28px" }}>
            {activeNav === "dashboard" && (
              <>
                <DashboardCards />
                <UserTable search={search} onRowClick={setSelectedUser} />
              </>
            )}
            {activeNav === "users" && (
              <UserTable search={search} onRowClick={setSelectedUser} />
            )}
            {["analytics", "settings"].includes(activeNav) && (
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                height: "60vh", flexDirection: "column", gap: 12,
              }}>
                <div style={{ fontSize: 48 }}>{NAV_ITEMS.find(n => n.id === activeNav)?.icon}</div>
                <div style={{ color: "#6b7280", fontFamily: "'DM Mono', monospace", fontSize: 14 }}>
                  {activeNav.charAt(0).toUpperCase() + activeNav.slice(1)} — coming soon
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
    </>
  );
}