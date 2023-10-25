'use client';
import { useState, useEffect } from 'react';

const CheckboxInput = ({ label, name, checked, onChange }) => {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked); // Synchronize the local state with the parent's checked prop
  }, [checked]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle the local state
    onChange({ target: { name, checked: !isChecked } }); // Pass the updated value to the parent component
  };

  return (
    <label className="flex items-center mb-1.5">
      <input
        type="checkbox"
        id={name}
        name={name}
        value={name}
        checked={isChecked}
        onChange={handleCheckboxChange}
        className="hidden"
      />
      <div className="w-[17px] h-[17px] border-[0.3px] rounded-full border-[#C4C4C4] flex items-center justify-center cursor-pointer select-none">
        {isChecked && (
          <div className="w-[10px] h-[10px] bg-[#D03719] rounded-full"></div>
        )}
      </div>
      <span className="ml-2">{label}</span>
    </label>
  );
};

export default CheckboxInput;
