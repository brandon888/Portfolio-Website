import {useState, useEffect} from 'react';
import pp from './Assets/linkedin_profile.png';

const ProfileText = ({onChange}) => {
  const [enter, setEnter] = useState({
    profileTextDiv: "Placeholder",
    profileText: "Placeholder",
    profileTwoDiv: "Placeholder",
    profileTextTwo: "Placeholder",
  });
  useEffect(() => {
    console.log(enter);
    onChange(setEnter);
  }, [])

  return (
    <div className='Outer-profile'>
      <div className={enter.profileTextDiv}>
        <h1 className={enter.profileText}>{`BRANDON\nYANG`}</h1>
      </div>
      <div className={enter.profileTwoDiv}>
        <h1 className={enter.profileTextTwo}>{"Software Developer &\nFull-time student @\nGeorgia Institute of Technology"}</h1>
      </div>
    </div>
  )
}

export default ProfileText;
