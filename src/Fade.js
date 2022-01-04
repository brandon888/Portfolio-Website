import { useState, useEffect } from 'react';

const Fade = ({ text, onChange }) => {
    const [fade, setFade] = useState({
        fade: 'fade-out',
    });

    useEffect(() => {
        onChange(setFade);
    }, [])

    return (
        <div>
            <h1
                className={fade.fade}
            >{text}</h1>
        </div>
    )
}

export default Fade;