'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';

function LoginPopup({ isOpen, onClose, onRegisterClick }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    // Perform login logic here
    console.log('Submitted:', formData);
    onClose(); // Close the popup after submission
  }

  if (!isOpen) {
    return null; // Return nothing if the popup is closed
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay to grey out the background */}
      <div className="fixed inset-0 bg-white opacity-50 z-40"></div>
      <div className="bg-white w-[360px] h-[625px] p-6 rounded-3xl border border-gray-300 shadow-2xl relative z-50">
        <div className="w-[304px] flex flex-col items-center justify-center">
          <div className="flex flex-row-reverse w-full">
            <button onClick={onClose}>
              <Icon icon="ph:x" className="text-[#54595F] w-[20px] h-[20px]" />
            </button>
          </div>
          {/* Logo */}
          <div className="mt-10">
            <img src="/login/logo.svg" alt="Logo" className="w-[131px]" />
          </div>
          {/* Title */}
          <div className="mt-6 mb-6 w-full">
            <h1 className="font-bold text-[27px] text-left">
              ¿Listo para empezar?
            </h1>
          </div>

          <div>
            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="mb-6">
                <div className="flex flex-col font-medium">
                  <label htmlFor="email" className="text-[11px] mb-2.5">
                    Correo electronico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleChange}
                    required
                    placeholder="juan@mail.com"
                    className="border border-[#1E1E1E] rounded-md outline-none px-4 py-2 w-[303px] h-[38px] text-[9.5px] placeholder:text-[#808080] placeholder:font-normal"
                  />
                </div>
              </div>
              {/* Password */}
              <div>
                <div className="flex flex-col font-medium">
                  <label htmlFor="password" className="text-[11px] mb-2.5">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password || ''}
                    onChange={handleChange}
                    required
                    placeholder="Contraseña"
                    className="border border-[#ADADAD] rounded-md outline-none px-4 py-2 w-[303px] h-[38px] text-[9.5px] placeholder:text-[#808080] placeholder:font-normal"
                  />
                </div>
              </div>
              {/* Forgot Password */}
              <div className="text-[#659DCB] text-[9.5px] text-right mt-2 mr-2">
                <Link href="/">Olvidé la contraseña</Link>
              </div>
              {/* Submit */}
              <div className="mt-8 w-[303px] h-[36px]">
                <button
                  type="submit"
                  className="border rounded-md bg-[#659DCB] outline-none w-full h-full text-white text-[11px] font-light"
                >
                  Iniciar sesión
                </button>
              </div>
            </form>
          </div>
          {/* New user */}
          <div className="my-4">
            <button
              onClick={onRegisterClick}
              className="flex flex-col items-center justify-start text-[9px] text-[#8D8D8D]"
            >
              ¿Nuevo usuario? <span className="text-[#659DCB]">Registrate</span>
            </button>
          </div>
          {/* Google */}
          <div className="mt-2">
            <Link
              href="/"
              className="flex items-center justify-center w-[35px]"
            >
              <Icon
                icon="flat-color-icons:google"
                className="w-[35px] h-[35px]"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPopup;
