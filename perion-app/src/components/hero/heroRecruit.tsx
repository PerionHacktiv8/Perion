export function HeroRecruit() {
  return (
    <div
      className="relative bg-[center] flex justify-center items-center h-80"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
      }}
    >
      <div className="text-center text-neutral-content pt-10">
        <div className="text-white max-w-5xl mx-auto">
          <h1 className="mb-5 text-2xl md:text-6xl lg:text-7xl font-bold">
            Pick Your Partner & Work Together!
          </h1>
          <p className="mb-5 text-lg md:text-xl lg:text-2xl">
            Find the perfect freelancer for your next project
          </p>
        </div>
      </div>
    </div>
  )
}
