import React from 'react';
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
  return (
    <Globe
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      pointsData={fireData}
      pointColor="color"
      pointRadius="size"
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