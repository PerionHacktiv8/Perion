export function CreateBoxPorto() {
  return (
    <div
      className="w-80 h-52 flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg my-8"
      style={{ minWidth: '300px', maxWidth: '500px' }}
    >
      <div className="flex items-center justify-center rounded-full bg-blue-100 h-16 w-16 mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </div>
      <button className="bg-white py-2 px-4 border border-gray-300 rounded shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Upload your Portfolio
      </button>
      <p className="text-sm text-gray-500 mt-2">
        Unpublished portfolio will appear here.
      </p>
    </div>
  )
}
