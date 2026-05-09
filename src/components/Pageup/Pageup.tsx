import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import { MAIN_ROUTE, AUTHORS_ROUTE } from "../../utils/consts";

import './pageup.sass';


const Pageup: React.FC = () => {
    const [scrollTop, setScrollTop] = useState<number>(0);
    const location = useLocation();

    const handleScroll = () => {
        const position = window.scrollY;
        setScrollTop(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <a href="#root" className='pageup' style={{display : scrollTop > 500 ? 'block' : 'none' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="110" height="110" viewBox="0 0 110 110" fill="none">
                <g filter="url(#filter0_d_17_399)">
                    <g clipPath="url(#clip0_17_399)">
                    <rect x="24" y="86" width="62" height="62" rx="31" transform="rotate(-90 24 86)" fill="white" opacity="0.4"/>
                    <path d="M39.5 60.1667L43.1425 63.8092L55 51.9775L66.8575 63.8092L70.5 60.1667L55 44.6667L39.5 60.1667Z" fill="#282828" opacity="0.4"/>
                    </g>
                </g>
                <defs>
                    <filter id="filter0_d_17_399" x="0" y="0" width="110" height="110" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset/>
                    <feGaussianBlur stdDeviation="12"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_17_399"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_17_399" result="shape"/>
                    </filter>
                    <clipPath id="clip0_17_399">
                    <rect x="24" y="86" width="62" height="62" rx="31" transform="rotate(-90 24 86)" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </a>
    );
};

export default Pageup;