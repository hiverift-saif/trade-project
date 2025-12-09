import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const accounts = [
  {
    title: "Standard Account",
    desc: "Mistaken idea denouncing pleasure of us ever undertakes secure...",
    img: "https://images.unsplash.com/photo-1629339942248-45d4b10c8c2f?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    icon: "👑",
    id: "#01",
  },
  {
    title: "Mini Account",
    desc: "Cases are perfectly simple and easy to distinguish in a free hour...",
    img: "https://plus.unsplash.com/premium_photo-1661371241897-3202947ace30?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    icon: "⭐",
    id: "#02",
  },
  {
    title: "STP Account",
    desc: "Holds in these matters to this principle of selection rejects pleasures...",
    img: "https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=1600",
    icon: "🛡️",
    id: "#03",
  },
  {
    title: "VIP Account",
    desc: "Pleasures are to be welcomed as they provide secure trading capacity...",
    img: "https://images.pexels.com/photos/5980856/pexels-photo-5980856.jpeg?auto=compress&cs=tinysrgb&w=1600",
    icon: "💎",
    id: "#04",
  },
];

const TradingLuck = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* Title */}
        <div className="text-center mb-14">
          <p className="text-green-600 font-semibold text-sm uppercase">Account Types</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Explore Our Account Options
          </h2>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          navigation={true}
          modules={[Navigation]}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {accounts.map((item, i) => (
            <SwiperSlide key={i}>
              <div className="bg-[#f9fafb] rounded-2xl shadow-md overflow-hidden group transition-all duration-300 hover:-translate-y-2">

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>

                {/* Image + Hover Gradient */}
                <div className="relative overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Green Gradient Bottom on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-green-500/70 via-green-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Icon Overlay */}
                  <div className="absolute top-3 left-3  text-white w-12 h-12 text-2xl grid place-items-center rounded-full shadow-lg">
                    {item.icon}
                  </div>
                </div>

                {/* Bottom Box */}
                <div className="flex justify-between items-center p-4">
                  <button className="text-green-600 font-semibold flex items-center gap-1 hover:underline">
                    Read More <span>→</span>
                  </button>
                  <p className="text-gray-700 font-bold">{item.id}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
};

export default TradingLuck;
