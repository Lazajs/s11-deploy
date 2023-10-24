import Image from 'next/image';
import React from 'react';

const DropdownDate = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const endYear = 2024;
  const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  const monthYearPairs = [];

  for (let year = currentYear; year <= endYear; year++) {
    const startMonth = year === currentYear ? currentMonth : 0;
    const endMonth = year === endYear ? 11 : months.length - 1;
    for (let monthIndex = startMonth; monthIndex <= endMonth; monthIndex++) {
      monthYearPairs.push({ month: months[monthIndex], year });
    }
  }
  // const [selectedItems, setSelectedItems] = useState([]);
  // console.log(selectedItems);

  // const toggleItemSelection = (item) => {
  //   if (selectedItems.includes(item)) {
  //     setSelectedItems(selectedItems.filter((selected) => selected !== item));
  //   } else {
  //     setSelectedItems([...selectedItems, item]);
  //   }
  // };

  // const toggleSelectAll = () => {
  //   if (selectedItems.length === items.length) {
  //     setSelectedItems([]);
  //   } else {
  //     setSelectedItems([...items]);
  //   }
  // };

  return (
    <div className="absolute bg-white top-[5.3rem] z-50 w-full p-5 gap-8 rounded-3xl text-[#54595F] shadow-lg">
      <div className="mb-8 font-medium flex justify-between">
        <span>Seleccionar fecha</span>
        <span className="text-[#EF7548] underline underline-offset-4 cursor-pointer">
          Cualquier fecha
        </span>
      </div>
      <div className="flex gap-3">
        <button className="border rounded-full py-3 px-5">Fin de semana</button>
        <button className="border rounded-full py-3 px-5">Semana</button>
        <button className="border rounded-full py-3 px-5">Mes</button>
      </div>
      <div className="w-full">
        <p className="font-medium my-5">Por mes</p>
        <div className="grid grid-flow-col gap-5 overflow-x-auto">
          {monthYearPairs.map((item) => (
            <div
              key={item}
              className="flex items-center justify-center flex-col border rounded-2xl w-[8.125rem] h-40 gap-2 my-5"
            >
              <Image src="/calendar.svg" width={32} height={32} alt="" />
              <span className="font-semibold">{item.month}</span>
              <span>{item.year}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DropdownDate;
