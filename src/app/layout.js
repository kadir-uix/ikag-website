import "./globals.css";

export const metadata = {
  title: "IKAG — Know a guy, everywhere.",
  description: "Your ultimate AI travel concierge. From exclusive bookings to hidden local gems, the world is at your fingertips.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
