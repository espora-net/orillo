import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Orillo - Diseñador de Portadas",
  description: "Aplicación para diseñar portadas y contraportadas de libros",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
