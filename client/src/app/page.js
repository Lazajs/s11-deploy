import Slider from "@/components/Slider";
import Image from "next/image";

export default function Home () {
  const items = [
    {
      id: 1,
      image: '/1.png',
      title: 'Book de fotos por la ciudad',
      bg: 'bg-[#EAAC08]'
    },
    {
      id: 2,
      image: '/2.png',
      title: 'Los mejores lugares para comer',
      bg: 'bg-[#3C76A6]'
    },
    {
      id: 3,
      image: '/3.png',
      title: 'Las afueras de Buenos Aires',
      bg: 'bg-[#7AAE34]'
    },
    {
      id: 4,
      image: '/4.png',
      title: 'Visita lugares emblemáticos de la ciudad',
      bg: 'bg-[#D03719]'
    },
  ]
  return (
    <main className="flex flex-col items-center justify-between gap-16 p-10 z-0">
      <div className="max-w-[78.4375rem] mx-auto relative rounded-[1.5625rem] mt-28">
        <Image src='/banner.png' width={1300} height={100} className="w-full" />
        <div className="absolute top-0 left-44 skew-x-[30deg] w-[20rem] h-full bg-black/30"></div>
        <div className="absolute top-0 w-full h-full flex items-center justify-between text-white p-16">
          <div className="w-[35.25rem]">
            <h1 className="text-[2rem] font-semibold">Conocé todas las actividades 
              que tiene la ciudad para ofrecerte</h1>
            <p className="mt-2">Buenos Aires, la capital de Argentina, es una ciudad vibrante y diversa que combina la elegancia europea con la pasión sudamericana. Sus calles están repletas de arquitectura impresionante, desde imponentes edificios de estilo neoclásico hasta coloridos murales de arte callejero que reflejan su rica historia cultural. La ciudad es conocida por su ferviente amor por el tango, la deliciosa gastronomía que incluye asados y empanadas, y su bulliciosa vida nocturna que se extiende hasta las primeras horas de la mañana.</p>
          </div>
          <Image src='/arrow.svg' width={20} height={20} alt="" />
        </div>
      </div>
      <p className="max-w-[78.4375rem] mx-auto w-full mb-8 text-[2rem] font-semibold">¿Qué vas a hacer hoy?</p>
      <div className="max-w-[78.4375rem] mx-auto grid lg:grid-cols-4 grid-cols-2 lg:gap-[4.5625rem] gap-4">
        {items.map((i) => (
          <div key={i} className=" ">
            <div className="w-full relative flex justify-center">
              <Image src={i.image} width={150} height={150} alt='' className="w-full rounded-[1.5625rem]" />
              <button type="button" className={`absolute bottom-0 w-28 h-[2.5625rem] rounded-full ${i.bg} mb-3 text-white font-semibold`}>Ver más</button>
            </div>
            <h2 className="text-[1.375rem] font-bold mt-3">{i.title}</h2>
          </div>
        ))}
      </div>
      <div className="w-full">
        <h3 className="max-w-[78.4375rem] mx-auto mb-16 text-3xl font-semibold">Proximos eventos</h3>
        <Slider />
      </div>
      <div className="max-w-[78.4375rem] mx-auto relative">
        <Image src='/banner1.png' width={1200} height={20} className="w-full" />
        <div className="absolute top-0 w-full h-full flex items-center justify-between px-16 text-white bg-gray-800/50 rounded-3xl">
          <h3 className="text-[1.875rem] font-semibold">¿Te gustaría organizar tu propio evento?</h3>
          <button type="button" className="px-16 py-1 bg-[#EAAC08] rounded-full font-semibold">¡Sí, quiero!</button>
        </div>
      </div>
    </main>
  );
}
