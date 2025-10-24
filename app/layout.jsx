import "./globals.css";

export const metadata = {
  title: "Saige | Cultivating Leaders Everywhere",
  description:
    "Saige brings world-class leadership development to every level of your organization through AI-powered guidance and human wisdom.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
