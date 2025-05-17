// src/components/Layout.tsx
import { useState } from "react";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react"; // or Iconify
import Image from 'next/image';
import Link from 'next/link';


export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:static lg:inset-0`}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col bg-mainBlue">
      <header className="flex items-center gap-3 p-4 shadow lg:hidden">
        {/* ☰ Menu icon */}
        <button onClick={() => setSidebarOpen(true)} className="text-gray-700">
            <Menu size={24} />
        </button>

        {/* Logo + Text */}
        <Link href="/" className="flex items-center space-x-2">
            <Image
            src="/logo.png"
            alt="Billplz Logo"
            width={55}
            height={37}
            priority
            />
            <span className="text-base text-gray-500">Analytics</span>
        </Link>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
