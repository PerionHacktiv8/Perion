export function HeroRecruit() {
  return (
    <div
      className="relative h-auto md:h-50vh pt-16"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1512514076443-1eef59c260b0?q=80&w=2448&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="text-center text-neutral-content pt-12 pb-10 px-4">
        <div className="text-white max-w-5xl mx-auto">
          <h1 className="mb-5 text-3xl md:text-6xl lg:text-7xl font-bold">
            Pair Your Partner & Work Together!
          </h1>
          <p className="mb-5 text-lg md:text-xl lg:text-2xl">
            Find the perfect freelancer for your next project
          </p>
        </div>
      </div>
    </div>
  )
}
