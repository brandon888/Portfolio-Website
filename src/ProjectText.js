import {useState, useEffect} from 'react';

const ProjectText = ({onPositionChange}) => {
  const [trans, setTrans] = useState({x: 0});

  useEffect(() => {
    onPositionChange(setTrans);
  }, [])

  return (
    <div
      className='Outer-projects'
      style={{
        transform: `translate(${trans.x}px, 0px)`,
      }}
      >
      <h1 className='Project-header'>{`PROJECTS`}</h1>
      <div className='Project-buttons'>
        <a className='button'>This website</a>
        <div className='Website-description'>
          <h1>{`\A visual introduction to myself and a showcase of
previous work created using ReactJS and MatterJS
          `}</h1>
        </div>
      </div>

    </div>
  )
}

export default ProjectText;
