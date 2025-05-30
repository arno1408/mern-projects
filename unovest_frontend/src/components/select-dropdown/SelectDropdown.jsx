import React from 'react'
import {Caret} from '../../assets/Icons/index'
import Select from 'react-select';

const SelectDropdown = ({disable, name,containerClassName,imageClassName,selectClassName,optionsClassName,carretClassName,options, onSelect, selectedValue, iconMap }) => { 
  const customStyles = {
    control: (styles) =>({...styles, 
      border:'1px solid #B0C3F5',
      outline:'none',
      borderRadius:'16px',
      padding:'0.3rem',
      backgroundColor:'transparent',
      '&:hover': {
        border:'1px solid #B0C3F5',
      }
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? 'black' : 'black',
      backgroundColor: 'transparent',
      '&:hover': {
        backgroundColor: '#007bff',
        color: 'white',
      },
    }),
    menu: (provided, state) => ({
      ...provided,
      background: 'radial-gradient(228.97% 106.42% at 136.67% 129.74%, rgb(152, 145, 173) 0%, rgb(83, 128, 150) 22.18%, rgb(60, 86, 110) 37.79%, rgb(19, 21, 41) 89.23%)',
    }),
  };

  const indicatorSeparatorStyle = {
   display:'none'
  };

  const IndicatorSeparator = ({
    innerProps,
  }) => {
    return <span style={indicatorSeparatorStyle} {...innerProps} />;
  };
 
  return (
    <>
      <div className={`relative inline-block w-full  ${containerClassName || ''}`}>
        <Select
          options={options}
          isDisabled={disable}
          name={name}
          styles={customStyles}
          components={{ IndicatorSeparator }}
          onChange={(newvalue) => onSelect(newvalue)}
          value={selectedValue}
          defaultValue={options[0]}
          isSearchable={false}
          getOptionLabel={(option) => (
            <div className='flex items-center gap-3 text-desk-purple font-semibold'>
              {option.icons}
              {option.catergory}
            </div>
          )}
          getOptionValue={(option) => option.value}
        />
      </div>
    </>
   
  );
}

export default SelectDropdown
