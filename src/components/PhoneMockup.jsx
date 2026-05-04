export default function PhoneMockup({
  src,
  alt,
  width = 260,
  height = 530,
  style = {},
}) {
  return (
    <div className="phone" style={{ width, height, ...style }}>
      <img src={src} alt={alt} />
    </div>
  );
}

