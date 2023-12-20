'use server'

import { CardComponent } from '@/components/card/cardComponent'
import { HeroSection } from '@/components/hero/heroHome'
import { NavbarWithMenu } from '@/components/navbar/navMenu'
import { DialogDefault } from '@/components/modalChoose'
import { Project } from '@/db/models/project'
import { Appliers, AppliersModel } from '@/db/models/appliers'
import { ResponseAPIType } from '../api/user/route'
import { cookies } from 'next/headers'

const Home = async () => {
  const data = await Project.readProjects()

  const res = await fetch('http://localhost:3000/api/projects/apply')
  const resJson = (await res.json()) as ResponseAPIType<AppliersModel>
  const profData = resJson.data
  // console.log(profData)

  return (
    <div className="flex flex-col bg-[#f5f5f5] min-h-screen">
      <main className="flex-grow">
        <HeroSection />
        <NavbarWithMenu />
        <section className="py-8">
          <DialogDefault />
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
