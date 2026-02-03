
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav
      className="bg-[var(--navbar-bg)] shadow-md p-4"
      style={{ boxShadow: 'var(--navbar-shadow)' }}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/globe.svg" alt="Logo" width={32} height={32} className="drop-shadow-md" />
            <span className="text-2xl font-extrabold text-[var(--primary)] tracking-tight">Financial Literacy Adventure</span>
          </div>
        </Link>
        <div className="flex space-x-6">
          <NavItem href="/game" label="Game Modes" />
          <NavItem href="/game/quiz" label="Quiz" />
          <NavItem href="/game/simulation" label="Simulation" />
          <NavItem href="/game/story" label="Story" />
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ href, label }: { href: string; label: string }) => (
  <Link href={href} legacyBehavior>
    <a className="relative px-2 py-1 text-[var(--foreground)] font-medium transition-colors duration-200 hover:text-[var(--primary)] group">
      {label}
      <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[var(--primary)] transition-all duration-300 group-hover:w-full"></span>
    </a>
  </Link>
);

export default Navbar;
