import React from 'react';

const DropdownCategory = (props) => {
  const { selectedCategories, setSelectedCategories } = props;

  const items = [
    {
      id: 1,
      category: 'Gastronómico',
      image: '/gastronomico.png',
    },
    {
      id: 2,
      category: 'Cultural',
      image: '/Cultural.png',
    },
    {
      id: 3,
      category: 'Deportivo',
      image: '/Deportivo.png',
    },
    {
      id: 4,
      category: 'Educativo',
      image: '/Educativo.png',
    },
    {
      id: 5,
      category: 'Familiar',
      image: '/Familiar.png',
    },
    {
      id: 6,
      category: 'Conferencia',
      image: '/Conferencia.png',
    },
    {
      id: 7,
      category: 'Causa benéfica',
      image: '/CausaBenefica.png',
    },
    {
      id: 8,
      category: 'Entretenimiento',
      image: '/Entretenimiento.png',
    },
    {
      id: 9,
      category: 'Moda y belleza',
      image: '/Moda.png',
    },
    {
      id: 10,
      category: 'Ver todo         ',
      image: '/Todo.png',
    },
  ];

  const toggleCategory = (categoryName) => {
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(categoryName)) {
        return prevCategories.filter((name) => name !== categoryName);
      } else {
        return [...prevCategories, categoryName];
      }
    });
  };

  return (
    <div className="absolute bg-white top-[5.3rem] z-50 grid grid-cols-5 w-full p-5 gap-8 rounded-3xl text-[#54595F] shadow-lg">
      {items.map((item) => (
        <div key={item.id} className="flex flex-col gap-4" onClick={() => toggleCategory(item.category)}>
          <div
            className={`cursor-pointer ${
              selectedCategories.includes(item.category) ? 'border border-blue-500' : ''
            }`}
          >
            <img src={item.image} width={150} height={150} alt="" />
            <span>{item.category}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DropdownCategory;
