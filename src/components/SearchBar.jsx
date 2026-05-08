export default function SearchBar({ value, onChange }) {
  return (
    <div style={{ position: "relative" }}>
      <span style={{
        position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
        color: "#4b5563", fontSize: 14, pointerEvents: "none",
      }}>⌕</span>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
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
  );
}