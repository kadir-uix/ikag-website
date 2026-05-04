export default function PremiumCard({
  children,
  className = "",
  style = {},
  id,
}) {
  return (
    <div
      id={id}
      className={className}
      style={{
        position: "relative",
        zIndex: 10,
        borderRadius: 16,
        overflow: "hidden",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 20,
          border: "1px solid transparent",
          borderRadius: "inherit",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0) 100%) border-box",
          WebkitMask:
            "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "destination-out",
          maskComposite: "exclude",
        }}
      />
      {children}
    </div>
  );
}

