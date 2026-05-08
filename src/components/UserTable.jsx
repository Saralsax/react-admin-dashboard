import { useMemo } from 'react';
import { USERS } from '../data';
import Avatar from './Avatar';
import StatusBadge from './StatusBadge';

export default function UserTable({ search, onRowClick }) {
  const filtered = useMemo(() =>
    USERS.filter(u => u.name.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  return (
    <div style={{
      background: "#111827", border: "1px solid #1f2937",
      borderRadius: 12, overflow: "hidden",
    }}>
      {/* Table header */}
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

      {/* Table */}
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
              <tr>
                <td colSpan={4} style={{
                  padding: "40px", textAlign: "center",
                  color: "#4b5563", fontFamily: "'DM Mono', monospace", fontSize: 13,
                }}>No users found</td>
              </tr>
            ) : filtered.map((user, i) => (
              <tr
                key={user.id}
                onClick={() => onRowClick(user)}
                style={{
                  borderBottom: i < filtered.length - 1 ? "1px solid #1f2937" : "none",
                  cursor: "pointer", transition: "background 0.12s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <td style={{ padding: "14px 22px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Avatar initials={user.avatar} size={32} />
                    <span style={{
                      color: "#e5e7eb", fontSize: 14, fontWeight: 500,
                      fontFamily: "'Syne', sans-serif",
                    }}>{user.name}</span>
                  </div>
                </td>
                <td style={{ padding: "14px 22px", color: "#6b7280", fontSize: 13, fontFamily: "'DM Mono', monospace" }}>
                  {user.email}
                </td>
                <td style={{ padding: "14px 22px" }}>
                  <span style={{
                    color: "#9ca3af", fontSize: 12, fontWeight: 500,
                    fontFamily: "'DM Mono', monospace",
                    background: "#1f2937", padding: "3px 8px", borderRadius: 4,
                  }}>{user.role}</span>
                </td>
                <td style={{ padding: "14px 22px" }}>
                  <StatusBadge status={user.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}