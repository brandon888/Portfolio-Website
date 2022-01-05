import { useState, useEffect, Profiler } from 'react';
import pp from './Assets/linkedin_profile.png';

const Fade = ({ text, onChange, screen }) => {
    const [fade, setFade] = useState({
        fade: 'fade-out',
    });

    useEffect(() => {
        onChange(setFade);
    }, [])

    const divStyle = {
        width: screen.w * 0.2
    };

    return (
        <div
        className={fade.fade}
        style={divStyle}
        >
            <img
                src={pp}
            ></img>
            <h1
                className='Profile-text'
            >{text}</h1>
        </div>
    )
}

export default Fade;