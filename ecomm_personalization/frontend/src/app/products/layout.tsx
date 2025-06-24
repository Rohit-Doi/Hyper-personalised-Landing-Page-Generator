import { ReactNode } from 'react';

export default function ProductsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <main className="py-8">
        {children}
      </main>
    </div>
  );
}
