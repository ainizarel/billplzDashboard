import Image from "next/image";
import Link from "next/link";
import {
  X,
  LayoutDashboard,
  CreditCard,
  Settings,
  HelpCircle,
  BookOpen,
  Store,
} from "lucide-react";

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  return (
    <aside className="h-full flex flex-col p-4 bg-white lg:bg-menuBlue">
      {/* Header with Logo */}
      <div className="flex items-center justify-between mb-6">
      <Link href="/" className="flex items-center gap-2">
  {/* ✅ Logo shown only on lg and up */}
  <Image
    src="/logo.png"
    alt="Logo"
    width={55}
    height={37}
    className="hidden lg:block"
  />

  {/* ✅ Text varies based on screen size */}
  <div className="flex flex-col">
    {/* ✅ Show store name on small screens */}
    <span className="flex items-center gap-2 text-base font-semibold text-gray-900 lg:hidden">
        <Store size={16} />
        Aini Razali Store
    </span>

    {/* ✅ Show Billplz Analytics on large screens */}
    <div className="hidden lg:flex items-center gap-1">
      <span className="text-base text-gray-500">Analytics</span>
    </div>
  </div>
</Link>


        {onClose && (
          <button onClick={onClose} className="lg:hidden">
            <X size={20} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {/* ✅ Show store name on lg screens */}
        <span className="hidden lg:flex items-center gap-2 text-base font-semibold text-gray-900 mb-2">
            <Store size={16} />
            Aini Razali Store
        </span>
        <Link href="/dashboard" className="flex items-center gap-3 p-2 rounded hover:bg-hoverBlue">
          <LayoutDashboard size={18} />
          Dashboard
        </Link>
        <Link href="/billing" className="flex items-center gap-3 p-2 rounded hover:bg-hoverBlue">
          <CreditCard size={18} />
          Billing
        </Link>
        <Link href="/paymentform" className="flex items-center gap-3 p-2 rounded hover:bg-hoverBlue">
          <BookOpen size={18} />
          Payment Form
        </Link>
        <Link href="/subscription" className="flex items-center gap-3 p-2 rounded hover:bg-hoverBlue">
          <BookOpen size={18} />
          Subscription
        </Link>
      </nav>

      {/* Footer */}
      <div className="mt-auto pt-6 space-y-2 border-t">
        <Link href="#" className="flex items-center gap-3 p-2 text-sm text-gray-600 hover:text-black">
          <Settings size={18} />
          Account Setting
        </Link>
        <Link href="#" className="flex items-center gap-3 p-2 text-sm text-gray-600 hover:text-black">
          <HelpCircle size={18} />
          Support
        </Link>
        <Link href="#" className="flex items-center gap-3 p-2 text-sm text-gray-600 hover:text-black">
          <HelpCircle size={18} />
          FAQ
        </Link>
      </div>
    </aside>
  );
}
