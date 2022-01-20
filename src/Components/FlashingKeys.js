import {useState, useEffect} from 'react';
import ArrowKeys from '../Assets/arrow-keys.png'

const FlashingKeys = ({onChange}) => {
  const [style, setStyle] = useState({ style: "Flashing-key" });

  useEffect(() => {
    onChange(setStyle);
  }, [])

  return (
    <div className={style.style}>
      <img src={ArrowKeys} />
    </div>
  )
}

export default FlashingKeys;
