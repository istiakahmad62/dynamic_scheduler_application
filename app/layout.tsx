import "./globals.css";
import { CustomRootLayout } from "@/layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teacher Scheduler - 8-Day Cycle",
  description: "Dynamic scheduler application for managing teacher allocations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CustomRootLayout children={children} />
      </body>
    </html>
  );
}
