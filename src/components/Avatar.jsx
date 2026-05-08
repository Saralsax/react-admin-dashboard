export default function Avatar({ initials, size = 36 }) {
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