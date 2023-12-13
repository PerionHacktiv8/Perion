import { NavbarDefault } from '@/components/navbar/navbarComponent'
import { CardComponent } from '@/components/card/cardComponent'
import { HeroSection } from '@/components/hero'
import { NavbarWithMenu } from '@/components/navbar/navMenu'

export default function Home() {
  return (
    <div>
      <NavbarDefault />
      <HeroSection />
      <NavbarWithMenu />
      <CardComponent />
    </div>
  )
}
