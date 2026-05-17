interface SectionLabelProps {
  text: string;
  className?: string;
}

export default function SectionLabel({ text, className = "" }: SectionLabelProps) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 12 }} className={className}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#B8F53A", display: "inline-block", animation: "pulseDot 2s ease-in-out infinite" }} />
      <span style={{ fontSize: 11, letterSpacing: "1.5px", textTransform: "uppercase", color: "#B8F53A", fontWeight: 500 }}>{text}</span>
    </div>
  );
}
