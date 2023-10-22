import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#ECECEC] h-[234px] pt-6 pb-8 px-24 text-[#1E1E1E] font-extrabold">
      <div className="flex justify-between">
        <div>
          <p>Av. Del Libertadorar 3600,</p>
          <p className="leading-4">CABA, Buenos Aires, Argentina</p>
        </div>
        <ul className="flex flex-col">
          <li className="inline-block mb-2">
            <a href="/" className="hover:text-[#D03719]">
              Mi cuenta
            </a>
          </li>
          <li className="inline-block mb-2">
            <a href="/" className="hover:text-[#D03719]">
              Crear Evento
            </a>
          </li>
          <li className="inline-block mb-2">
            <a href="/" className="hover:text-[#D03719]">
              Preguntas Frecuentes
            </a>
          </li>
          <li className="inline-block mb-2">
            <a href="/" className="hover:text-[#D03719]">
              Ayuda
            </a>
          </li>
        </ul>
        <div>
          <p className="mb-2">Contacto</p>
          <p className="mb-2">0800-111-1234</p>
          <p className="mb-2">BAinfo@mail.com</p>
          <p className="mb-2">¡Seguinos en las redes!</p>
        </div>
      </div>
      <div className="text-[#D03719] mt-4">
        <p>@2023 Buenos Aires Explora</p>
      </div>
    </footer>
  );
};

export default Footer;
