export default function StatusBadge({ status }) {
  const styles = {
    Active:   { background: "rgba(134,239,172,0.15)", color: "#86efac", border: "1px solid rgba(134,239,172,0.3)" },
    Pending:  { background: "rgba(253,230,138,0.15)", color: "#fde68a", border: "1px solid rgba(253,230,138,0.3)" },
    Inactive: { background: "rgba(252,165,165,0.15)", color: "#fca5a5", border: "1px solid rgba(252,165,165,0.3)" },
  };

  return (
    <span style={{
      ...styles[status],
      padding: "3px 10px", borderRadius: "20px",
      fontSize: "11px", fontWeight: 600,
      letterSpacing: "0.05em", textTransform: "uppercase",
    }}>
      {status}
    </span>
  );
}