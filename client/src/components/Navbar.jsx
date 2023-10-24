'use client';
import { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';

const Navbar = () => {
  const [expanded, setExpanded] = useState(false);
  const menuRef = useRef(null);

  const handleButtonClick = () => {
    setExpanded(!expanded);
  };

  const handleClickOutsideMenu = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      expanded
    ) {
      setExpanded(false);
    }
  };

  useEffect(() => {
    const handleDocumentClick = (event) => {
      handleClickOutsideMenu(event);
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [expanded]);

  return (
    <header
      className={`bg-white shadow-md shadow-blue-100 transition-[height] duration-500 ${
        expanded ? 'h-[167px]' : 'h-[85px]'
      }`}
    >
      <nav className="flex items-center justify-around h-[85px] relative">
        <div className="flex items-center">
          <img src="/logo1.svg" alt="Logo" className="w-[39.4px]" />
          <img src="/logo2.svg" alt="Logo" className="h-[38px] ml-2" />
        </div>
        <div className="relative">
          <div className="w-[441px]"></div>
          <div
            ref={menuRef}
            className={`flex items-center bg-[#EEEEEE] rounded-full shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)] pr-1 absolute -top-[25px] transition-all ease-in-out duration-500 ${
              expanded
                ? 'w-[790px] h-[68px] translate-y-16 -translate-x-[174.5px]'
                : 'w-[441px] h-[50px]'
            }`}
          >
            {expanded ? (
              // Content when expanded
              <div className="flex items-center w-full">
                <div>
                  <button className="flex flex-col text-[#26261E] font-semibold px-4 py-2 w-[193px] h-full">
                    Categorías
                    <span className="text-[#54595F] font-normal">
                      Explora eventos
                    </span>
                  </button>
                </div>
                <div>
                  <button className="flex flex-col text-[#26261E] font-semibold px-4 py-2 w-[149px]">
                    Evento
                    <span className="text-[#54595F] font-normal">
                      A tu gusto
                    </span>
                  </button>
                </div>
                <div>
                  <button className="flex flex-col text-[#26261E] font-semibold px-4 py-2 w-[147px]">
                    Lugar
                    <span className="text-[#54595F] font-normal">¿Dónde?</span>
                  </button>
                </div>
                <div>
                  <button className="flex flex-col text-[#26261E] font-semibold px-4 py-2 w-[147px]">
                    Fecha
                    <span className="text-[#54595F] font-normal">¿Cuándo?</span>
                  </button>
                </div>
                <div className="ml-auto mr-2">
                  <button
                    type="text"
                    className="rounded-full appearance-none outline-none w-full h-[full] flex items-center justify-between"
                    onClick={handleButtonClick}
                  >
                    <div className="w-[116px] h-[42px] bg-[#D03719] rounded-full flex items-center justify-around px-2">
                      <Icon
                        icon="tabler:search"
                        className="w-[24px] h-[24px] text-white"
                      />
                      <span className="text-white text-[18px]">Buscar</span>
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              // Default button content
              <button
                type="text"
                className="rounded-full appearance-none outline-none w-full h-[full] flex items-center justify-between"
                onClick={handleButtonClick}
              >
                <span className="pl-6 text-[#737373] text-xl">
                  ¿Qué estás buscando?
                </span>
                <div className="w-[45px] h-[45px] bg-[#D03719] rounded-full flex items-center justify-center">
                  <Icon
                    icon="tabler:search"
                    className="w-[28px] h-[28px] text-white"
                  />
                </div>
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center">
          <button className="text-[#D03719] font-semibold px-4 py-2">
            Creá tu evento
          </button>
          <button className="bg-[#659DCB] text-white font-semibold px-4 py-2 ml-2 rounded-full w-[171px]">
            Inicia sesión
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
