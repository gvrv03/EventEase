export default function ManagerCard({ manager }) {
  return (
    <div className="bg-white p-6 shadow-xl rounded-xl transform hover:scale-105 transition-all duration-300 flex flex-col items-center text-center">
      <img src={manager.image} alt={manager.name} className="w-28 h-28 rounded-full border-4 border-blue-400 shadow-md mb-4" />
      <h3 className="text-xl font-semibold text-gray-800">{manager.name}</h3>
      <p className="text-gray-600 text-lg font-medium">{manager.title}</p>
      <div className="flex flex-wrap justify-center gap-2 mt-2">
        {manager.specialty.split(", ").map((specialty, idx) => (
          <span key={idx} className="bg-blue-100 text-blue-600 text-sm font-semibold px-3 py-1 rounded-full">
            {specialty}
          </span>
        ))}
      </div>
      <p className="text-yellow-500 text-xl mt-2">{manager.rating}</p>
      <button className="mt-4 px-5 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-all">
        View Profile
      </button>
    </div>
  );
}
