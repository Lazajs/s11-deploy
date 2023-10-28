import { Icon } from '@iconify/react';
import Image from 'next/image';
import React, { useState } from 'react';

const ReservationPopup = ({ isOpen, isClose, isCount, isTotal, image }) => {
  const [confirmation, setConfirmation] = useState(false);

  const handleConfirmation = () => {
    setConfirmation(true);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-white opacity-50 z-40"></div>
      <div className="bg-white w-[56.25rem] rounded-3xl border border-gray-300 shadow-2xl relative z-50">
        <div className="flex absolute flex-row-reverse w-full pt-3 pr-4">
          <button onClick={isClose}>
            <Icon icon="ph:x" className="text-[#54595F] w-[20px] h-[20px]" />
          </button>
        </div>
        <div className="w-full flex justify-between">
          <div className="p-8 w-[23rem]">
            <h4 className="text-[1.375rem] font-bold">Completar pedido</h4>
            <p className="my-5">
              ¡Hola! Gracias por unirte a nosotros. Te invitamos a proporcionar
              tus datos de registro. Es importante destacar que el evento es
              gratuito, pero los cupos son limitados.
            </p>
            <h4 className="text-[1.375rem] font-semibold">
              Información de contacto
            </h4>
            <p>Iniciar sesión para ahorrar tiempo</p>
            <form className="mt-5">
              {/* Name */}
              <div className="mb-6">
                <div className="flex flex-col font-medium">
                  <label htmlFor="email" className="text-[11px] mb-2.5">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Nombre"
                    className="border border-[#1E1E1E] rounded-md outline-none px-4 py-2 w-[303px] h-[38px] text-[9.5px] placeholder:text-[#808080] placeholder:font-normal"
                  />
                </div>
              </div>
              {/* Date of birth */}
              <div className="mb-6">
                <div className="flex flex-col font-medium">
                  <label htmlFor="password" className="text-[11px] mb-2.5">
                    Fecha de nacimiento
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    required
                    placeholder="25/12/1989"
                    className="border border-[#ADADAD] rounded-md outline-none px-4 py-2 w-[303px] h-[38px] text-[9.5px] placeholder:text-[#808080] placeholder:font-normal"
                  />
                </div>
              </div>
              {/* Email */}
              <div>
                <div className="flex flex-col font-medium">
                  <label htmlFor="password" className="text-[11px] mb-2.5">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="juan@mail.com"
                    className="border border-[#ADADAD] rounded-md outline-none px-4 py-2 w-[303px] h-[38px] text-[9.5px] placeholder:text-[#808080] placeholder:font-normal"
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="p-8 bg-[#EEEEEE] w-[25.9375rem] flex flex-col gap-5 rounded-r-3xl">
            <div className="w-full h-[9rem] overflow-hidden rounded-xl">
              <Image src={image[0]} width={350} height={150} alt="" />
            </div>
            <h4 className="text-xl font-semibold">Resumen del pedido</h4>
            <div className="w-full flex justify-between">
              <span>{isCount} x Entrada general</span>
              <span>${isTotal}</span>
            </div>
            <div className="w-full flex justify-between text-xl font-semibold">
              <span>Total</span>
              <span>${isTotal}</span>
            </div>
            {confirmation ? (
              <div className="bg-[#7AAE34] rounded-[2.5rem] text-white p-5 text-center flex flex-col items-center gap-2">
                <Icon
                  icon="simple-line-icons:check"
                  className="w-[61px] h-[61px]"
                />
                <p>
                  Te contactaremos por correo electrónico para confirmar tu
                  participación.¡Esperamos verte allí!
                </p>
              </div>
            ) : (
              <button
                onClick={handleConfirmation}
                className="w-full text-[1.375rem] font-bold bg-[#D03719] hover:bg-[#d66953] text-white rounded-full py-2"
              >
                Confirmar reserva
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationPopup;
