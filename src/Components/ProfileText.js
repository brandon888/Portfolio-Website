import {useState, useEffect} from 'react';
import RightArrow from '../Assets/right-arrow.png';
import LeftArrow from '../Assets/left-arrow.png';
import DownArrow from '../Assets/down-arrow.png';

const ProfileText = ({onChange, onPositionChange}) => {
  const [enter, setEnter] = useState({
    profileTextDiv: "Placeholder",
    profileText: "Placeholder",
    profileTwoDiv: "Placeholder",
    profileTextTwo: "Placeholder",
    projectArrow: "Arrow-blank",
    workArrow: "Arrow-blank",
    downArrow: "Arrow-blank",
  });

  const [trans, setTrans] = useState({ x: 0, y: 0 });

  useEffect(() => {
    onChange(setEnter);
    onPositionChange(setTrans);
  }, [])

  return (
    <div
      className='Outer-profile'
      style={{
        transform: `translate(${trans.x}px, ${trans.y}px)`,
      }}
      >
      <div className={enter.profileTextDiv}>
        <h1 className={enter.profileText}>{`BRANDON\nYANG`}</h1>
      </div>
      <div className={enter.profileTwoDiv}>
        <h1 className={enter.profileTextTwo}>{"Software Developer &\nFull-time student @\nGeorgia Institute of Technology"}</h1>
      </div>
      <div className={enter.projectArrow}>
        <h1>Projects</h1>
        <img src={RightArrow} />
      </div>
      <div className={enter.workArrow}>
        <h1>Work Experience</h1>
        <img src={LeftArrow} />
      </div>
      <div className={enter.downArrow}>
        <h1>About Me</h1>
        <img src={DownArrow} />
      </div>
    </div>
  )
}

export default ProfileText;
