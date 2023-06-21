import {useState, useEffect} from 'react';

const WorkText = ({onPositionChange}) => {
  const [trans, setTrans] = useState({x: -Screen.width});

  useEffect(() => {
    onPositionChange(setTrans);
  }, [])

  return (
    <div
      className='Outer-work'
      style={{
        transform: `translate(${trans.x}px, 0px)`,
      }}
      >
      <h1 className='Work-header'>{`WORK EXP`}</h1>
      
      <div className='Work-buttons'>
        <div className='Indiv-work'>
          <a className='button' href="https://github.com/brandon888/Portfolio-Website" target="_blank">Website 🔗</a>
          <div className='Website-description'>
            <h1>{`\A visual introduction to myself and a showcase of\nprevious work created using ReactJS and MatterJS
            `}</h1>
          </div>
        </div>
        <div className='Indiv-work'>
          <a className='button' href="https://github.com/brandon888/SPACBot" target="_blank">SPACBOT 🔗</a>
          <div className='Website-description'>
            <h1>{`A bot that scrapes the web and collects data from\nReddit, Yahoo Finance, Google News, and SEC.gov\non SPAC tickers and relays information to Discord.
            `}</h1>
          </div>
        </div>
      </div>
      <div className='Work-buttons1'>
        <div className='Indiv-work'>
          <a className='button' href="https://github.com/brandon888/Portfolio-Website" target="_blank">Website 🔗</a>
          <div className='Website-description'>
            <h1>{`\A visual introduction to myself and a showcase of\nprevious work created using ReactJS and MatterJS
            `}</h1>
          </div>
        </div>
        <div className='Indiv-work'>
          <a className='button' href="https://github.com/brandon888/SPACBot" target="_blank">SPACBOT 🔗</a>
          <div className='Website-description'>
            <h1>{`A bot that scrapes the web and collects data from\nReddit, Yahoo Finance, Google News, and SEC.gov\non SPAC tickers and relays information to Discord.
            `}</h1>
          </div>
        </div>
      </div>

    </div>
  )
}

export default WorkText;
