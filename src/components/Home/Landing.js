import React from "react";

const CelebrationsSection = () => {
  const celebrations = [
    { image: 'https://img.ebonow.com/Posters/P2A.webp', title: 'Birthday' },
    { image: 'https://img.ebonow.com/Posters/P2B.webp', title: 'Anniversary' },
    { image: 'https://img.ebonow.com/Posters/P2C.webp', title: "Kid's Party" },
    { image: 'https://img.ebonow.com/Posters/P2D.webp', title: 'Baby Shower' },
    { image: 'https://img.ebonow.com/Posters/P2E.webp', title: 'Welcome Baby' },
    { image: 'https://img.ebonow.com/Posters/P2G.webp', title: 'Bachelorette' },
    { image: 'https://img.ebonow.com/Posters/P2Q.webp', title: 'Premium Decors' },
    { image: 'https://img.ebonow.com/Posters/P2R.webp', title: 'Candlelight & Proposal Decors' },
    { image: 'https://img.ebonow.com/Posters/P2N.webp', title: 'Stage Decors' },
    { image: 'https://img.ebonow.com/Posters/P2S.webp', title: 'Pre-wedding Decors' },
  ];

  return (
    <section className="py-3 p-2">
      <h2 className="text-2xl font-semibold text-center mb-6">What are you celebrating?</h2>

      {/* First Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 px-3"> {/* Reduced gap */}
        {celebrations.slice(0, 6).map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center"
          >
            <div className="w-full h-28 md:h-36 lg:h-40 overflow-hidden rounded-lg"> {/* Adjusted height */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="mt-1 text-md font-medium text-center">{item.title}</h3> {/* Adjusted spacing */}
          </div>
        ))}
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 px-3 mt-4"> {/* Adjusted width */}
        {celebrations.slice(6).map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center"
          >
            <div className="w-full h-35 md:h-36 lg:h-40 overflow-hidden rounded-lg"> {/* Consistent size */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-29 object-cover"
              />
            </div>
            <h3 className="mt-1 text-md font-medium text-center">{item.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CelebrationsSection;
