import React, { useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';

interface FireDataItem {
  lat: number;
  lng: number;
  size?: number;
  color?: string;
}

interface FireGlobeProps {
  fireData: FireDataItem[];
}

const FireGlobe: React.FC<FireGlobeProps> = ({ fireData }) => {
  const globeEl = useRef<any>();

  useEffect(() => {
    const globe = globeEl.current;
    if (globe) {
      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = 3; // Adjust the speed as needed
    }
  }, []);

  return (
    <Globe
      ref={globeEl}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      pointsData={fireData}
      pointColor={(d) => (d as FireDataItem).color || 'red'} // Use 'red' as fallback
      pointRadius={(d) => (d as FireDataItem).size || 0.9}   // Use 0.1 as fallback
      pointAltitude={0.01}
      pointResolution={32}
      pointLabel={(d) => `Fire at ${(d as FireDataItem).lat}, ${(d as FireDataItem).lng}`}
      onPointClick={(point) => console.log('Clicked:', point)}
      pointsMerge={true}
      backgroundColor="rgba(0, 0, 0, 0)"
      width={800}
      height={800}
    />
  );
};

export default FireGlobe;