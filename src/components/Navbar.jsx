import { Button, Link } from "@heroui/react";
import { ChevronDown, Search, User } from "lucide-react";
import horizontalLogo from "../assets/images/logo/horizontal/horizontal-erased.png";

const navLinks = [
  { label: "Home", active: true },
  { label: "Medicines", dropdown: true },
  { label: "Categories" },
  { label: "How It Works" },
  { label: "About" },
  { label: "Contact" },
];

function Navbar() {
  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 lg:px-8">
        <Link href="#" className="flex shrink-0 items-center no-underline">
          <img src={horizontalLogo} alt="MediSwift" className="h-18 w-auto" />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map(({ label, active, dropdown }) => (
            <Link
              key={label}
              href="#"
              className={`relative flex items-center gap-1 text-sm font-medium transition-colors ${
                active
                  ? "text-[var(--brand-cyan)] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-[var(--brand-cyan)]"
                  : "text-slate-600 hover:text-[var(--brand-cyan)]"
              }`}
            >
              {label}
              {dropdown && <ChevronDown className="h-3.5 w-3.5" />}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            isIconOnly
            variant="light"
            className="text-slate-600 hover:text-[var(--brand-cyan)]"
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            className="hidden border-[var(--brand-cyan)] px-4 text-sm font-medium text-[var(--brand-cyan)] sm:flex"
          >
            <User className="mr-1.5 h-4 w-4" />
            Login
          </Button>
          <Button className="bg-[var(--brand-cyan)] px-4 text-sm font-medium text-white hover:bg-[var(--brand-blue)]">
            Register
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
