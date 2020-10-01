import React from 'react';
import { usePlane } from 'use-cannon';

const Plane = ({ scale }) => {
	const [ref] = usePlane(() => ({ mass: 0, friction: 1000000, rotation: [-Math.PI / 2, 0, 0] }));
  
	return (
		<mesh 
			ref={ref} 
			receiveShadow
			scale={scale}
		>
			<planeBufferGeometry attach="geometry" args={[1, 1]} />
			<meshStandardMaterial attach="material" color="#FFFFFF" smoothShading/>
		</mesh>
	);
};

export default Plane;
