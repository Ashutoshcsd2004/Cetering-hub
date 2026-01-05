export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Book Catering for Any Function
        </h1>
        <p className="text-gray-600">
          Shaadi, Birthday, Party ya koi bhi event – sab online book karo
        </p>

        <button className="btn btn-primary mt-6">
          Search Caterers
        </button>
      </div>

      {/* Services */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">
            Wedding Catering
          </h3>
          <p className="text-gray-600">
            Full-service wedding catering with custom menus.
          </p>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-2">
            Party Orders
          </h3>
          <p className="text-gray-600">
            Birthday, anniversary & private party catering.
          </p>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-2">
            Bulk Orders
          </h3>
          <p className="text-gray-600">
            Corporate events & bulk food orders.
          </p>
        </div>
      </div>
    </div>
  );
}
