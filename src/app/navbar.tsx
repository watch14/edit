"use client";

export default function Navbar() {
  return (
    <nav
      className="w-full flex items-center justify-center px-0 py-2 border-b border-black/10 sticky top-0 bg-white 
        z-50 text-xs font-semibold tracking-wide"
    >
      <div className="w-full max-w-[1440px] flex items-center justify-between px-6">
        <div className="flex items-center">
          <span className="font-black text-lg tracking-tight text-black">
            STAFF.
          </span>
        </div>
        <div className="hidden md:flex gap-8 mx-auto">
          <a href="#" className="hover:underline text-black">
            Cases
          </a>
          <a href="#" className="hover:underline text-black">
            About
          </a>
          <a href="#" className="hover:underline text-black">
            Contact
          </a>
        </div>
        <div className="flex items-center">
          <a href="#" className="hover:underline underline-offset-4 text-black">
            Work with us
          </a>
        </div>
      </div>
    </nav>
  );
}
