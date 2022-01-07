import {useState, useEffect, Profiler} from 'react';
import pp from './Assets/linkedin_profile.png';

const Fade = ({text, onChange, screen}) => {
  const [fade, setFade] = useState({fade: 'fade-out'});

  useEffect(() => {
    onChange(setFade);
  }, [])

  return (
    <>
      <div className={fade.fade}>
        <img src={pp} />
      </div>
      <div className={fade.fade}>
        <h1 className='Profile-text'>{text}</h1>
        <h1 className='Profile-text-two'>{"Software Developer and Full-time student at the Georgia Institute of Technology"}</h1>
      </div>
    </>
  )
}

export default Fade;
