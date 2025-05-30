import { useEffect, useRef, useState } from "react";
import { desktop_menu, mobile_menu } from "../../assets/Icons"
import Card_carousel_Mobile from "../../components/card-carousal-mobile/Card_carousel_Mobile"
import Card_carousel from "../../components/card-carousel/Card_carousel"
import { useSelector } from "react-redux";
let HeaderBar = () => {
    return (
        <div className="flex justify-between items-center px-5 pt-5 lg:pl-16 lg:pr-12 lg:pt-8">
            <h1 className="level-1-quiz-rapidfire  ">RapidFIRE</h1>
            {/* <span>
                <img src={desktop_menu} alt="menu" className="hidden md:block" />
                <img src={mobile_menu} alt="menu" className="block md:hidden" />
            </span> */}
        </div>
    )
}


const Level_1_quize = () => {
    const inputRefs = useRef([]);
    const mobinputRefs = useRef([]);
    const [isMobile, setIsMobile] = useState(true)
    const cardIndex = useSelector((state)=>state?.Card_inputs.indexNumber)

    useEffect(() => {
        const handleResize = () => {
            // let IsMobilescreen = window.innerWidth < 1024;
            setIsMobile(window.innerWidth < 1024)
        };

        // Attach the event listener
        window.addEventListener('resize', handleResize);
        // Call the handleResize function initially
        handleResize();
        // Detach the event listener on component unmount
        return () => { window.removeEventListener('resize', handleResize); };
    }, []);

    return (
        <div className={`min-h-screen relative quize-section-${cardIndex}`}>
            <div className="lg:min-h-screen lg:overflow-auto  bg-gray-800  lg:bg-transparent" >
                <HeaderBar />

                {isMobile ?
                    <Card_carousel_Mobile mobinputRefs={mobinputRefs} /> :
                    <Card_carousel inputRefs={inputRefs} />
                }
                {/* <div className="block lg:hidden"><Card_carousel_Mobile mobinputRefs={mobinputRefs} /></div>
                <div className="hidden lg:block"><Card_carousel inputRefs={inputRefs} /> </div> */}
            </div>
        </div>
    )
}

export default Level_1_quize