import Link from 'next/link';
import { FiSearch, FiHeart, FiShoppingBag } from 'react-icons/fi';

const Header = () => {
  return (
    <header className="flex items-center justify-between border-b border-[#f3e7e8] px-4 py-3 md:px-10">
      <div className="flex items-center gap-4 md:gap-8">
        <Link href="/" className="flex items-center gap-2 text-[#1b0e0e]">
          <div className="h-4 w-4">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor"></path>
            </svg>
          </div>
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">StyleHub</h2>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/new-arrivals" className="text-sm font-medium text-[#1b0e0e] hover:text-[#e92932] transition-colors">New Arrivals</Link>
          <Link href="/men" className="text-sm font-medium text-[#1b0e0e] hover:text-[#e92932] transition-colors">Men</Link>
          <Link href="/women" className="text-sm font-medium text-[#1b0e0e] hover:text-[#e92932] transition-colors">Women</Link>
          <Link href="/accessories" className="text-sm font-medium text-[#1b0e0e] hover:text-[#e92932] transition-colors">Accessories</Link>
          <Link href="/sale" className="text-sm font-medium text-[#e92932] hover:text-[#c8232c] transition-colors">Sale</Link>
        </nav>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search"
            className="h-10 rounded-lg border-0 bg-[#f3e7e8] pl-10 pr-4 text-sm text-[#1b0e0e] placeholder-[#994d51] focus:ring-2 focus:ring-[#e92932] focus:ring-opacity-50"
          />
          <FiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#994d51]" />
        </div>
        
        <div className="flex items-center gap-2">
          <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f3e7e8] text-[#1b0e0e] transition-colors hover:bg-[#e8dcdd]">
            <FiHeart className="h-5 w-5" />
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f3e7e8] text-[#1b0e0e] transition-colors hover:bg-[#e8dcdd]">
            <FiShoppingBag className="h-5 w-5" />
          </button>
        </div>
        
        <div className="h-10 w-10 overflow-hidden rounded-full bg-cover bg-center" 
             style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAP5TuCJ1JZe3EYwJhgwtZytR9TfMuDCqfjrfjrodJX-5ig6t9NfDVCGqoCZxtGa_07tIsJHX3FgcFTNJEOofaAIRrBs7l4cNazO_9ZBhAXZbPEsMSC-rxI7BHwBQ6y_SEEj7GMQrdCr3LPCFKqga4vvpe7QSYtCX0Wd2J0myneHE_njqFEZqjUVi9db1YEVC0H1p7-mXmBrB0dTOz1nB2eBhUO-NocC_HaCpD9TxQ9yd5oAAN7w-oA4rz9UpKdfCMh-_0Bdbhbs0o7")' }}>
        </div>
      </div>
    </header>
  );
};

export default Header;
