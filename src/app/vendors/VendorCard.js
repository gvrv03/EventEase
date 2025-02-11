export default function VendorCard({ vendor }) {
    return (
      <div className="bg-white p-6 shadow-xl rounded-xl transform hover:scale-105 transition-all duration-300 flex flex-col items-center text-center">
        <img
          src={vendor.image}
          alt={vendor.name}
          className="w-28 h-28 rounded-full border-4 border-green-400 shadow-md mb-4"
        />
        <h3 className="text-xl font-semibold text-gray-800">{vendor.name}</h3>
        <p className="text-gray-600 text-lg font-medium">{vendor.title}</p>
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          {vendor.services.split(", ").map((service, idx) => (
            <span key={idx} className="bg-green-100 text-green-600 text-sm font-semibold px-3 py-1 rounded-full">
              {service}
            </span>
          ))}
        </div>
        <p className="text-yellow-500 text-xl mt-2">{vendor.rating}</p>
        <button className="mt-4 px-5 py-2 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition-all">
          View Profile
        </button>
      </div>
    );
  }
  
