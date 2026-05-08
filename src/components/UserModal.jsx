import Avatar from './Avatar';
import StatusBadge from './StatusBadge';

export default function UserModal({ user, onClose }) {
  if (!user) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1000, backdropFilter: "blur(6px)",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#111827", border: "1px solid #1f2937",
          borderRadius: "16px", padding: "32px",
          width: "100%", maxWidth: "420px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
          position: "relative",
        }}
      >
        {/* Close button */}
        <button onClick={onClose} style={{
          position: "absolute", top: 16, right: 16,
          background: "#1f2937", border: "none", color: "#9ca3af",
          width: 32, height: 32, borderRadius: "50%", cursor: "pointer",
          fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center",
        }}>×</button>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
          <Avatar initials={user.avatar} size={56} />
          <div>
            <div style={{
              color: "#f9fafb", fontWeight: 700, fontSize: 18,
              fontFamily: "'Syne', sans-serif",
            }}>{user.name}</div>
            <div style={{ color: "#6b7280", fontSize: 13 }}>{user.email}</div>
          </div>
        </div>

        {/* Details */}
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
            <span style={{
              color: "#6b7280", fontSize: 13,
              fontFamily: "'DM Mono', monospace",
            }}>{label}</span>
            {label === "Status"
              ? <StatusBadge status={user.status} />
              : <span style={{ color: "#e5e7eb", fontSize: 13, fontWeight: 500 }}>{value}</span>
            }
          </div>
        ))}
      </div>
    </div>
  );
}