import Link from 'next/link';

const Hero = () => {
  return (
    <div className="relative min-h-[480px] overflow-hidden rounded-lg bg-cover bg-center bg-no-repeat px-6 pb-12 pt-16 md:px-12 md:pb-16"
         style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCslmUh1DiLYhkNZFxO0rTJoR2MUH8oAAY3ewEIXAydr8n5z5Bvt4ODpoFj3y7jWyPNlr5xQo3rAvvHxGEEWK36fpSvG2yHe4GJsFmLkuEp-1dzJj1cU61e0rMo32M2LxUQjuUGw6ahAY08TWnN1P0ShXTAdlPmef1ImF2N6Qb5M2NsjDvjVDuoP2z_MaDTMIXuKRRpWakuwwWLg0-PCEe101PNefWd2N7mogZ8cKybYlMln-IwISfSqua16lFBay21R368WsbupYem")' }}>
      <div className="relative z-10 max-w-2xl text-left">
        <h1 className="mb-4 text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
          Welcome to StyleHub
        </h1>
        <p className="mb-8 text-sm text-white md:text-base">
          Discover curated collections tailored just for you. Explore the latest trends and exclusive offers.
        </p>
        <Link 
          href="/shop" 
          className="inline-flex h-12 items-center justify-center rounded-lg bg-[#e92932] px-6 text-sm font-bold text-white transition-colors hover:bg-[#c8232c] md:text-base"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default Hero;
