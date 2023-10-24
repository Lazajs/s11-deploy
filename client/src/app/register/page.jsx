'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    birthDate: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    // Perform register logic here
    console.log('Submitted:', formData);
  }

  return (
    <main className="flex justify-center">
      <div className="w-[304px] flex flex-col items-center justify-center py-8">
        <div className="flex flex-row-reverse w-full">
          <Icon icon="ph:x" className="text-[#54595F] w-[26px] h-[26px]" />
        </div>
        {/* Title */}
        <div className="mt-10 mb-6 w-full">
          <h1 className="font-semibold text-[32px] text-left">Registrate</h1>
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
                  className="border border-[#ADADAD] rounded-md outline-none px-4 py-2 w-[303px] h-[38px] text-[9.5px] placeholder:text-[#808080] placeholder:font-normal"
                />
              </div>
            </div>
            {/* Password */}
            <div className="mb-6">
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
            {/* Confirm Password */}
            <div>
              <div className="flex flex-col font-medium">
                <label htmlFor="confirmPassword" className="text-[11px] mb-2.5">
                  Repetir contraseña
                </label>
                <input
                  type="confirmPassword"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword || ''}
                  onChange={handleChange}
                  required
                  placeholder="Contraseña"
                  className="border border-[#ADADAD] rounded-md outline-none px-4 py-2 w-[303px] h-[38px] text-[9.5px] placeholder:text-[#808080] placeholder:font-normal"
                />
              </div>
            </div>
            {/* Submit */}
            <div className="mt-10 w-[303px] h-[36px]">
              <button
                type="submit"
                className="border rounded-md bg-[#659DCB] outline-none w-full h-full text-white text-[11px]"
              >
                Continuar
              </button>
            </div>
          </form>
        </div>
        {/* Guest */}
        <div className="my-6">
          <Link
            href="/login"
            className="flex flex-col items-center justify-start text-[9px] text-[#8D8D8D]"
          >
            ¿Ya sos usuario?{' '}
            <span className="text-[#3C76A6] font-medium">Iniciar sesión</span>
          </Link>
        </div>
        {/* Google */}
        <div>
          <Link
            href="/login"
            className="flex items-center justify-center w-[35px]"
          >
            <Icon
              icon="flat-color-icons:google"
              className="w-[35px] h-[35px]"
            />
          </Link>
        </div>
      </div>
    </main>
  );
}

export default RegisterPage;
