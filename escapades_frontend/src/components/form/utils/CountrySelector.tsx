import React, { useState, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";

interface CountryData {
  value: string;
  label: string;
}

interface CountrySelectorProps {
  onChange: (value: string | null) => void;
  id: string;
  className: string;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({
  onChange,
  id,
  className,
}) => {
  const [value, setValue] = useState<CountryData | null>(null);

  const options: CountryData[] = useMemo(() => countryList().getData(), []);

  const changeHandler = (selectedOption: CountryData | null) => {
    setValue(selectedOption);
    onChange(selectedOption ? selectedOption.value : null);
  };

  return (
    <Select
      options={options}
      value={value}
      onChange={changeHandler}
      className={className}
      id={id}
    />
  );
};

export default CountrySelector;
