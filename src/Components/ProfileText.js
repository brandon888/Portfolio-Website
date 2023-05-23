import {useState, useEffect} from 'react';
import RightArrow from '../Assets/right-arrow.png';
import LeftArrow from '../Assets/left-arrow.png';
import DownArrow from '../Assets/down-arrow.png';

const ProfileText = ({onChange, onPositionChange, projectOnClick}) => {
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
    <>
      <div
        className='Outer-profile'
        style={{
          transform: `translate(${trans.x}px, ${trans.y}px)`,
        }}
      >
        <div id="name-and-desc">
          <div className={enter.profileTextDiv}>
            <h1 className={enter.profileText}>{`BRANDON\nYANG`}</h1>
          </div>
          <div className={enter.profileTwoDiv}>
            <h1 className={enter.profileTextTwo}>{"Software Developer &\nFull-time student @\nGeorgia Institute of Technology"}</h1>
          </div>
        </div>
        <div id="arrows">
          <div className={enter.projectArrow} onClick={projectOnClick}>
            <img src={RightArrow} />
            <h1>Projects</h1>
          </div>
          <div className={enter.workArrow}>
            <img src={LeftArrow} />
            <h1>Work Experience</h1>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileText;
