import './App.css';
import MatterWorld from './MatterWorld';
// import useWindowDimensions from './useWindowDimensions';

function App() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  return (
    <div className="App">
      <MatterWorld
        className='MatterWorld'
        width={width}
        height={height}
      />
    </div>
  );
}

export default App;
