import { NavbarDefault } from '@/components/navbar/navbarComponent'
import { CardComponent } from '@/components/card/cardComponent'
import { HeroSection } from '@/components/hero/heroHome'
import { NavbarWithMenu } from '@/components/navbar/navMenu'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white">
        <NavbarDefault />
      </header>

      <main className="flex-grow">
        <HeroSection />

        <section className="bg-gray-100">
          <NavbarWithMenu />
        </section>

        <section className="py-8">
          <aside className="bg-gray-200 w-1/4 hidden sm:block">
            {/* Tambahkan konten sidebar di sini */}
          </aside>
          <div className="flex justify-center py-10 px-4 sm:px-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <CardComponent />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
