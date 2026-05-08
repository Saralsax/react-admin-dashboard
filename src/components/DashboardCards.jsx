import { STATS } from '../data';

export default function DashboardCards() {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: 16, marginBottom: 28,
    }}>
      {STATS.map(stat => (
        <div
          key={stat.label}
          style={{
            background: "#111827", border: "1px solid #1f2937",
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

          <div style={{
            display: "flex", alignItems: "flex-start",
            justifyContent: "space-between", marginBottom: 12,
          }}>
            <span style={{
              color: "#6b7280", fontSize: 12, fontWeight: 600,
              letterSpacing: "0.06em", textTransform: "uppercase",
              fontFamily: "'DM Mono', monospace",
            }}>
              {stat.label}
            </span>
            <span style={{ fontSize: 20 }}>{stat.icon}</span>
          </div>

          <div style={{
            color: "#f9fafb", fontSize: 26, fontWeight: 800,
            fontFamily: "'Syne', sans-serif", marginBottom: 6,
          }}>
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