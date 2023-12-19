import { DialogDefault } from '@/components/modalChoose'
import { Portfolio } from '@/db/models/portofolios'
import { CardPortoPage } from '@/components/card/cardPorto'

const Home = async () => {
  const data = await Portfolio.readPortfolios()

  return (
    <div className="flex flex-col bg-[#f5f5f5] min-h-screen">
      <div
        className="relative bg-[center] flex justify-center items-center h-80"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1702816789113-bbc54df5f1aa?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        }}
      >
        <div className="text-center text-neutral-content pt-10">
          <div className="text-white max-w-5xl mx-auto">
            <h1 className="mb-5 text-2xl md:text-6xl lg:text-7xl font-bold">
              Best of Parion
            </h1>
            <p className="mb-5 text-lg md:text-xl lg:text-2xl">
              Our Newest Portofolios By Our Talented Parions
            </p>
          </div>
        </div>
      </div>
      <section className="py-8">
        <DialogDefault />
        <div className="flex justify-center py-10 px-4 sm:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.map((datum, idx) => (
              <CardPortoPage key={idx} datum={datum} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
