import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "MBC 메타데스크 — 충북 선거 이슈 레이더",
  description: "2026 충북 지방선거 이슈 추적 대시보드",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen flex">
        <Sidebar />
        <main className="flex-1 ml-60 p-8 overflow-auto">{children}</main>
      </body>
    </html>
  );
}
