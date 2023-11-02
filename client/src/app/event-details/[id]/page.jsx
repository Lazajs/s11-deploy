'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import ReservationPopup from '@/components/event-popups/ReservationPopup';
// import Map from '@/components/Map';

import { useParams } from 'next/navigation';

function EventDetails() {
  const { id } = useParams();

  const [openReservationPopup, setOpenReservationPopup] = useState(false);

  const [count, setCount] = useState(1);

  const [eventData, setEventData] = useState(null);
  console.log(eventData)

  useEffect(() => {
    fetch(`https://jsonserverong.onrender.com/events/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error al obtener los datos del evento');
        }
      })
      .then((data) => {
        setEventData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  if (!eventData) {
    return <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
      <Image src='/cargando.png' width={100} height={100} className='animate-spin-slow z-50' />
    </div>;
  }

  const { imgUrls, description, creator, schedule, price, place, title } = eventData;

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleOpenReservationPopup = () => {
    setOpenReservationPopup(true);
  };

  const handleCloseReservationPopup = () => {
    setOpenReservationPopup(false);
  };

  const totalPrice = price * count;

  const reservationData = {
    isOpen: openReservationPopup,
    isClose: handleCloseReservationPopup,
    isCount: count,
    isTotal: totalPrice,
    image: imgUrls,
  };

  return (
    <section className="max-w-7xl mx-auto my-32">
      <div className="flex justify-between">
        <div className="w-[41.5rem] flex flex-col gap-8">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay
            modules={[Autoplay]}
            speed={1000}
            className="w-full"
          >
            {imgUrls?.map((img) => (
              <SwiperSlide key={img}>
                <Image
                  src={img}
                  width={664}
                  height={500}
                  alt=""
                  className="rounded-3xl"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="w-full flex flex-col gap-3">
            <h2 className="font-semibold text-[2rem]">{title}</h2>
            <p className="whitespace-pre-line">{description}</p>
          </div>
        </div>
        <div className="w-[30rem] flex flex-col gap-5">
          <div className="w-full flex items-center gap-5 px-5 h-[7.2rem] rounded-xl bg-[#E7EFF7] shadow-inner shadow-[#DCF3E7]">
            <Image
              src="/event-details/imgProfile.png"
              width={75}
              height={75}
              alt=""
            />
            <div>
              <span className="font-bold text-[1.375rem]">{creator}</span>
              <div className="flex">
                <Icon
                  icon="ic:round-star"
                  className="w-[35px] h-[35px] text-[#EAAC08]"
                />
                <Icon
                  icon="ic:round-star"
                  className="w-[35px] h-[35px] text-[#EAAC08]"
                />
                <Icon
                  icon="ic:round-star"
                  className="w-[35px] h-[35px] text-[#EAAC08]"
                />
                <Icon
                  icon="ic:round-star"
                  className="w-[35px] h-[35px] text-[#EAAC08]"
                />
              </div>
            </div>
          </div>
          <div className="w-full my-5 flex flex-col gap-5">
            <div className="w-full flex justify-between">
              <span className="font-bold text-[1.375rem]">
                Información del evento
              </span>
              <span className="flex text-2xl gap-3">
                <Icon icon="ic:baseline-share" />
                <Icon icon="iconamoon:heart-bold" />
              </span>
            </div>
            <ul className="font-medium">
              <li>Fecha: 15 de Noviembre 2023</li>
              <li>Horario: {schedule}</li>
              <li>Ubicación: {place}</li>
              <li>Entrada: {price === 0 ? 'Gratis' : price}</li>
            </ul>
          </div>
          <div className="rounded-xl bg-gray-300"></div>
          <div className="w-full border rounded-2xl p-5 flex flex-col gap-5">
            <div className="w-full border-2 border-[#3C76A6] p-5 rounded-xl flex flex-col font-medium">
              <div className="flex justify-between">
                <span>Entrada general</span>
                <div className="flex items-center">
                  <Icon
                    onClick={decrement}
                    icon="fluent:subtract-12-filled"
                    className="bg-[#EEEEEE] w-[33px] h-[33px] rounded-lg p-2 text-[#A9A8B3] hover:text-white cursor-pointer hover:bg-[#3C76A6] transition-all"
                  />
                  <span className="w-[33px] h-[33px] flex items-center justify-center">
                    {count}
                  </span>
                  <Icon
                    onClick={increment}
                    icon="mingcute:add-fill"
                    className="bg-[#EEEEEE] w-[33px] h-[33px] rounded-lg p-2 text-[#A9A8B3] hover:text-white cursor-pointer hover:bg-[#3C76A6] transition-all"
                  />
                </div>
              </div>
              <span>{price === 0 ? 'Gratis' : price}</span>
              <div className="flex justify-between mt-2">
                <span>Total</span>
                <span>${totalPrice}</span>
              </div>
            </div>
            <button
              onClick={handleOpenReservationPopup}
              className="bg-[#D03719] w-full text-[1.375rem] font-bold text-white py-2 rounded-full"
            >
              Reservar
            </button>
            <ReservationPopup {...reservationData} />
          </div>
        </div>
      </div>
      <div className="w-full mt-10 flex flex-col gap-5">
        <h2 className="font-semibold text-[2rem]">Preguntas frecuentes</h2>
        <div className="gird divide-y divide-neutral-200 bg-[#EEEEEE] my-2 rounded-2xl">
          <details className="group">
            <summary className="flex justify-between items-center font-medium cursor-pointer list-none  px-6 py-3 shadow-lg rounded-2xl">
              <h2>¿Cuántas entradas puedo reservar?</h2>
              <Icon
                icon="ep:arrow-up-bold"
                className="transition group-open:rotate-0 rotate-180"
              />
            </summary>
            <ul className="my-5 px-6">
              <li>
                Podes reservar hasta 10 entradas generales por usuario. Es
                importante mostrar el código QR al ingresar al evento.
              </li>
            </ul>
          </details>
        </div>
        <div className="gird divide-y divide-neutral-200 bg-[#EEEEEE] my-2 rounded-2xl">
          <details className="group">
            <summary className="flex justify-between items-center font-medium cursor-pointer list-none  px-6 py-3 shadow-lg rounded-2xl">
              <h2>¿Cuántas horas dura el evento?</h2>
              <Icon
                icon="ep:arrow-up-bold"
                className="transition group-open:rotate-0 rotate-180"
              />
            </summary>
            <ul className="my-5 px-6">
              <li>
                El evento esta programado para inciar a las 11 AM y finalizar a
                las 1PM. Sugerimos llegar 15 minutos antes para registrarse.
              </li>
            </ul>
          </details>
        </div>
        <div className="gird divide-y divide-neutral-200 bg-[#EEEEEE]  my-2 rounded-2xl">
          <details className="group">
            <summary className="flex justify-between items-center font-medium cursor-pointer list-none px-6 py-3 shadow-lg rounded-2xl">
              <h2>¿Se cancela en caso de mal tiempo?</h2>
              <Icon
                icon="ep:arrow-up-bold"
                className="transition group-open:rotate-0 rotate-180"
              />
            </summary>
            <ul className="my-5 px-6">
              <li>
                Sí. En caso de mal tiempo el evento será reprogramado para otro
                día.
              </li>
            </ul>
          </details>
        </div>
        <h2 className="font-semibold text-[2rem]">Opiniones del evento</h2>
        <div className="w-full flex justify-between">
          <div className="w-[40rem]">
            <div className="flex items-center gap-5 my-5">
              <div className="font-semibold flex">
                <span className="text-[6rem] leading-[1]">5</span>
                <span className="text-[2rem]">/5</span>
              </div>
              <div className="flex">
                <Icon
                  icon="ic:round-star"
                  className="w-[35px] h-[35px] text-[#EAAC08]"
                />
                <Icon
                  icon="ic:round-star"
                  className="w-[35px] h-[35px] text-[#EAAC08]"
                />
                <Icon
                  icon="ic:round-star"
                  className="w-[35px] h-[35px] text-[#EAAC08]"
                />
                <Icon
                  icon="ic:round-star"
                  className="w-[35px] h-[35px] text-[#EAAC08]"
                />
              </div>
            </div>
            <span className="text-[2rem] font-semibold">{title}</span>
          </div>
          <div className="w-[40rem] h-[35rem] flex flex-col gap-10 overflow-y-auto">
            <div className="w-full flex flex-col gap-5">
              <div className="flex items-center gap-5">
                <Image
                  src="/event-details/userComment.png"
                  width={60}
                  height={60}
                  alt=""
                />
                <div className="flex flex-col text-[1.375rem]">
                  <span className="font-bold">Marianela Ruiz</span>
                  <span className="font-medium">Colombia</span>
                </div>
              </div>
              <p className="px-5">
                El tour por Buenos Aires fue una experiencia inolvidable. Los
                lugares históricos que visitamos fueron fascinantes, y las fotos
                que tomó el fotógrafo profesional son simplemente asombrosas.
                ¡Recomiendo este evento a todos los amantes de los viajes y la
                fotografía!
              </p>
            </div>
            <div className="w-full flex flex-col gap-5">
              <div className="flex items-center gap-5">
                <Image
                  src="/event-details/userComment2.png"
                  width={60}
                  height={60}
                  alt=""
                />
                <div className="flex flex-col text-[1.375rem]">
                  <span className="font-bold">John Cavill</span>
                  <span className="font-medium">Australia</span>
                </div>
              </div>
              <p className="px-5">
                ¡No puedo expresar cuánto disfruté del tour por Buenos Aires!
                Fue una inmersión total en la cultura y la historia de la
                ciudad, y las fotos que obtuve son un tesoro. ¡Definitivamente,
                una experiencia que nunca olvidaré!
              </p>
            </div>
            <div className="w-full flex flex-col gap-5">
              <div className="flex items-center gap-5">
                <Image
                  src="/event-details/userComment3.png"
                  width={60}
                  height={60}
                  alt=""
                />
                <div className="flex flex-col text-[1.375rem]">
                  <span className="font-bold">Marie Mayer</span>
                  <span className="font-medium">Alemania</span>
                </div>
              </div>
              <p className="px-5">
                El recorrido por Buenos Aires superó mis expectativas. Aprendí
                tanto sobre la ciudad y su patrimonio, y las fotos son
                absolutamente espectaculares. Si quieres una experiencia
                enriquecedora y hermosas imágenes, ¡no te lo puedes perder!
              </p>
            </div>
            <div className="w-full flex flex-col gap-5">
              <div className="flex items-center gap-5">
                <Image
                  src="/event-details/userComment3.png"
                  width={60}
                  height={60}
                  alt=""
                />
                <div className="flex flex-col text-[1.375rem]">
                  <span className="font-bold">Marie Mayer</span>
                  <span className="font-medium">Alemania</span>
                </div>
              </div>
              <p className="px-5">
                El recorrido por Buenos Aires superó mis expectativas. Aprendí
                tanto sobre la ciudad y su patrimonio, y las fotos son
                absolutamente espectaculares. Si quieres una experiencia
                enriquecedora y hermosas imágenes, ¡no te lo puedes perder!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EventDetails;
