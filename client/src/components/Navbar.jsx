'use client';
import { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import DropdownCategory from './DropdownCategory';
import DropdownEvent from './DropdownEvent';
import DropdownPlace from './DropdownPlace';
import DropdownDate from './DropdownDate';
import LoginPopup from './LoginPopup';
import RegisterPopup from './RegisterPopup';
import Register2Popup from './Register2Popup';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Navbar = () => {
  const [loginPopupOpen, setLoginPopupOpen] = useState(false);

  const router = useRouter();
  const querystring = require('querystring');

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPlaces, setSelectedPlaces] = useState([]); 
  const [isPlus18Selected, setIsPlus18Selected] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState('Gratis');
  const [selectedItems, setSelectedItems] = useState([]);

  const handleLoginButtonClick = () => {
    setLoginPopupOpen(true);
    setRegisterPopupOpen(false);
  };

  const closeLoginPopup = () => {
    setLoginPopupOpen(false);
  };

  const [registerPopupOpen, setRegisterPopupOpen] = useState(false);

  const handleRegisterButtonClick = () => {
    setRegisterPopupOpen(true);
    setLoginPopupOpen(false);
  };

  const closeRegisterPopup = () => {
    setRegisterPopupOpen(false);
  };

  const [register2PopupOpen, setRegister2PopupOpen] = useState(false);

  const handleRegister2ButtonClick = () => {
    setRegister2PopupOpen(true);
    setRegisterPopupOpen(false);
  };

  const closeRegister2Popup = () => {
    setRegister2PopupOpen(false);
  };

  const [menuSelected, setMenuSelected] = useState(null);

  const toggleMenu = (menu) => {
    if (menuSelected === menu) {
      // Si se hace clic en la misma opción, cierra el menú
      setMenuSelected(null);
    } else {
      // Si se hace clic en una opción diferente, muestra su menú
      setMenuSelected(menu);
    }
  };

  const [expanded, setExpanded] = useState(false);
  const menuRef = useRef(null);

  const handleButtonClick = () => {

    if(expanded)
    {
      const queryParams = {};

      if (selectedCategories.length > 0) {
        queryParams.categories = selectedCategories;
      }

      if (selectedPlaces.length > 0) {
        queryParams.type = selectedPlaces;
      }

      if (isPlus18Selected) {
        queryParams.minAge = isPlus18Selected ? 18 : 0;
      }

      if (selectedEntry !== 'Ambos') {
        queryParams.price = selectedEntry === 'Gratis' ? 0 : 1;
      }

      if (selectedItems.length > 0) {
        queryParams.place =selectedItems
      }

      const url = `/events?${querystring.stringify(queryParams)}`;
      router.push(url);
    }
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

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    birthDate: '',
  });

  const handleFormDataChange = (newData) => {
    setFormData(newData);
  };

  return (
    <header
      className={`bg-white shadow-md shadow-blue-100 transition-[height] duration-500 ${
        expanded ? 'h-[167px]' : 'h-[85px]'
      }`}
    >
      <nav className="flex items-center justify-around h-[85px] relative z-50">
        <Link href='/' className="flex items-center">
          <img src="/logo1.svg" alt="Logo" className="w-[39.4px]" />
          <img src="/logo2.svg" alt="Logo" className="h-[38px] ml-2" />
        </Link>
        <div className="relative">
          <div className="w-[441px]"></div>
          <div
            ref={menuRef}
            className={`flex items-center bg-[#EEEEEE] rounded-full shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)] pr-1 absolute -top-[25px] transition-all ease-in-out duration-500 ${
              expanded
                ? 'w-[52rem] h-[68px] translate-y-16 -translate-x-[174.5px]'
                : 'w-[441px] h-[50px]'
            }`}
          >
            {expanded ? (
              
              <div className="relative w-full">
                <div className="flex items-center w-full">
                  <div
                    className={`hover:bg-white rounded-full hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)] transition-all ${
                      menuSelected === 'category'
                        ? 'bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)]'
                        : ''
                    }`}
                  >
                    <button
                      onClick={() => toggleMenu('category')}
                      className="flex flex-col text-[#26261E] font-semibold pl-6 pr-12 py-2 h-full"
                    >
                      Categorías
                      <span className="text-[#54595F] font-normal">
                        Explora eventos
                      </span>
                    </button>
                  </div>
                  <div
                    className={`hover:bg-white rounded-full hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)] transition-all ${
                      menuSelected === 'event'
                        ? 'bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)]'
                        : ''
                    }`}
                  >
                    <button
                      onClick={() => toggleMenu('event')}
                      className="flex flex-col text-[#26261E] font-semibold pl-6 pr-12 py-2"
                    >
                      Evento
                      <span className="text-[#54595F] font-normal">
                        A tu gusto
                      </span>
                    </button>
                  </div>
                  <div
                    className={`hover:bg-white rounded-full hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)] transition-all ${
                      menuSelected === 'place'
                        ? 'bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)]'
                        : ''
                    }`}
                  >
                    <button
                      onClick={() => toggleMenu('place')}
                      className="flex flex-col text-[#26261E] font-semibold pl-6 pr-12 py-2"
                    >
                      Lugar
                      <span className="text-[#54595F] font-normal">
                        ¿Dónde?
                      </span>
                    </button>
                  </div>
                  <div
                    className={`hover:bg-white rounded-full hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)] transition-all ${
                      menuSelected === 'date'
                        ? 'bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)]'
                        : ''
                    }`}
                  >
                    <button
                      onClick={() => toggleMenu('date')}
                      className="flex flex-col text-[#26261E] font-semibold pl-6 pr-12 py-2"
                    >
                      Fecha
                      <span className="text-[#54595F] font-normal">
                        ¿Cuándo?
                      </span>
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
                {menuSelected === 'category' && 
                  <DropdownCategory 
                  selectedCategories={selectedCategories}
                  setSelectedCategories={setSelectedCategories}
                  />
                }
                {menuSelected === 'event' &&
                 <DropdownEvent
                 selectedPlaces={selectedPlaces}
                 isPlus18Selected={isPlus18Selected}
                 selectedEntry={selectedEntry}
                 setSelectedPlaces={setSelectedPlaces}
                 setIsPlus18Selected={setIsPlus18Selected}
                 setSelectedEntry={setSelectedEntry}
               />
               }
                {menuSelected === 'place' && 
                <DropdownPlace 
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
                />
                }
                {menuSelected === 'date' && <DropdownDate />}
              </div>
            ) : (
              
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
          <Link href='/create-event' className="text-[#D03719] font-semibold px-4 py-2">
            Creá tu evento
          </Link>
          <button
            className="bg-[#659DCB] text-white font-semibold px-4 py-2 ml-2 rounded-full w-[171px]"
            onClick={handleLoginButtonClick}
          >
            Inicia sesión
          </button>
          <LoginPopup
            isOpen={loginPopupOpen}
            onClose={closeLoginPopup}
            onRegisterClick={handleRegisterButtonClick}
          />
          <RegisterPopup
            isOpen={registerPopupOpen}
            onClose={closeRegisterPopup}
            onContinueClick={handleRegister2ButtonClick}
            toLogin={handleLoginButtonClick}
            onDataChange={handleFormDataChange}
          />
          <Register2Popup
            isOpen={register2PopupOpen}
            onClose={closeRegister2Popup}
            formData={formData}
          />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
