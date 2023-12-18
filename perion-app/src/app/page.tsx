'use server'

import { NavbarDefault } from '@/components/navbar/navbarComponent'
import { CardComponent } from '@/components/card/cardComponent'
import { HeroSection } from '@/components/hero/heroHome'
import { NavbarWithMenu } from '@/components/navbar/navMenu'
import { DialogDefault } from '@/components/modalChoose'
import { Project } from '@/db/models/project'

const Home = async () => {
  const data = await Project.readProjects()

  return (
    <div className="flex flex-col bg-[#f5f5f5] min-h-screen">
      <NavbarDefault />
      <main className="flex-grow">
        <HeroSection />
        <NavbarWithMenu />
        <section className="py-8">
          <DialogDefault />
          <aside className="bg-gray-200 w-1/4 hidden sm:block">
            {/* Tambahkan konten sidebar di sini */}
          </aside>
          <div className="flex justify-center py-10 px-4 sm:px-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.map((datum, idx) => (
                <CardComponent key={idx} datum={datum} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home
