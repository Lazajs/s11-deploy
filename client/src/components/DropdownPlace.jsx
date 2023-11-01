import React from 'react';

const DropdownPlace = (props) => {

  const {
    selectedItems,
    setSelectedItems
  } = props;

  const items = [
    'Palermo',
    'Belgrano',
    'Recoleta',
    'San Telmo',
    'La Boca',
    'San Cristóbal',
    'Almagro',
    'Monte Castro',
    'Parque Chas',
    'Caballito',
    'Flores',
    'Villa Crespo',
    'Boedo',
    'Villa Urquiza',
    'Villa Devoto',
    'Saavedra',
    'Nueva Pompeya',
    'Villa Santa Rita',
    'Mataderos',
    'Nuñez',
    'Barracas',
    'Parque Patricios',
    'Villa Del Parque',
    'Villa Lugano',
    'Villa Riachuelo',
    'Villa General Mitre',
    'Coghlan',
    'Villa Soldati',
    'Pompeya',
    'Colegiales',
    'Agronomía',
    'Villa Ortúzar',
    'Parque Chacabuco',
    'Parque Avellaneda',
    'Villa Pueyrredón',
  ];

  const toggleItemSelection = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((selected) => selected !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems([...items]);
    }
  };

  return (
    <div className="absolute bg-white top-[5.3rem] z-50 w-full p-5 gap-8 rounded-3xl text-[#54595F] shadow-lg">
      <div className="mb-8 font-medium flex justify-between">
        <span>Elegir barrio</span>
        <span
          onClick={toggleSelectAll}
          className="text-[#EF7548] underline underline-offset-4 cursor-pointer"
        >
          Seleccionar todo
        </span>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {items.map((item) => (
          <div
            key={item}
            className="flex gap-2 cursor-pointer"
            onClick={() => toggleItemSelection(item)}
          >
            <div className="p-1 border rounded-full">
              <div
                className={`w-[15px] h-[15px] ${
                  selectedItems.includes(item) ? 'bg-[#EF7548]' : ''
                } rounded-full`}
              ></div>
            </div>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropdownPlace;
