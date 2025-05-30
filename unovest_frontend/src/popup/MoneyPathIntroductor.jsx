import React, { useEffect, useState, useRef } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
 
function MoneyPathIntroductor({ title, description, buttonText, onButtonClick,path}) {
  const buttonRef = useRef(null);
  const [introductorLoop, setIntroductorLoop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const boldMyPowers = (text) => {
    return text.replace(/(Money Matters|myPowers!)/g, '<span class="font-extrabold">$1</span>');
  };
    
  useEffect(() => {
        if (window.innerWidth < 768) {
          setIsMobile(true);
        } else {
          setIsMobile(false);
        }
    }, [window.innerWidth]); 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current && buttonRef.current.contains(event.target)) {
        return;
      }
      setIntroductorLoop(true); 
    };
    document.addEventListener('click', handleClickOutside);  
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (introductorLoop) {
      onButtonClick(); 
    }
  }, [introductorLoop, onButtonClick]);

  const handleButtonClick = (id) => {
    if(id=="#resultCard"){
      const anchorLinkRect = buttonRef.current.getBoundingClientRect();
      const targetScrollPosition = anchorLinkRect.bottom - window.innerHeight + 1000;
      window.scrollTo({
        top: targetScrollPosition,
        behavior: 'smooth'
      });
    }
    else if(id=='#myPowerbtn')
    {
      const anchorLinkRect = buttonRef.current.getBoundingClientRect();
      const targetScrollPosition = anchorLinkRect.bottom - window.innerHeight + 10000;
      window.scrollTo({
        top: targetScrollPosition,
        behavior: 'smooth'
      });
    }
    else{
      const anchorLinkRect = buttonRef.current.getBoundingClientRect();
      const targetScrollPosition = anchorLinkRect.top + window.innerHeight - 10000;
      window.scrollTo({
        top: targetScrollPosition,
        behavior: 'smooth'
      });
    }

  };
  return (
    <>
    
    <div className='w-[21rem]  max-md:w-[18rem] bg-accent-green rounded-xl py-10 px-6 max-md:py-8 m-auto mt-4 absolute left-2 top-14 max-md:fixed'>
      <h1 className='font-Montserrat text-gray-6 font-bold text-2xl pb-2 max-md:text-base max-md:font-extrabold  text-grey-6'>{title}</h1>
      <p className='font-Montserrat font-medium text-base pb-4 max-md:text-sm max-md:font-semibold text-grey-6' dangerouslySetInnerHTML={{__html: boldMyPowers(description)}} />
      <div className='pb-9'>
    {isMobile?
     <AnchorLink href={path} onClick={()=>handleButtonClick(path)}>
     <button
       ref={buttonRef}
       className='w-[7.5rem] py-2 bg-dark-blue rounded-[1.625rem] text-accent-green font-semibold text-lg max-md:text-sm float-end '
       onClick={onButtonClick}
     >
       {buttonText}
     </button>
     </AnchorLink>:
     <button
     ref={buttonRef}
     className='w-[7.5rem] py-2 bg-dark-blue rounded-[1.625rem] text-accent-green font-semibold text-lg max-md:text-sm float-end '
     onClick={onButtonClick}
   >
     {buttonText}
   </button>

    } 
      </div>
    </div>

    </>
  );
}
 
export default MoneyPathIntroductor;