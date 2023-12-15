import { NavbarDefault } from '@/components/navbar/navbarComponent';
import { CardUser } from '@/components/card/cardUser';
import { HeroRecruit } from '@/components/hero/heroRecruit';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavbarDefault />

      <main className="flex-grow">
        <HeroRecruit />

        <div className="py-8 px-4 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-10 px-7">
              <CardUser />
              <CardUser />
              <CardUser />
              <CardUser />
              <CardUser />
              <CardUser />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
