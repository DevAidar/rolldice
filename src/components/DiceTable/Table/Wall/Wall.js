import React, { useEffect } from 'react';
import { usePlane } from 'use-cannon';

const Wall = ({ rotation, args, position, scale }) => {
	const [ref, api] = usePlane(() => ({ mass: 0, friction: 1000000, rotation: rotation, position: position }));
  
	useEffect(() => {
		ref.current.scale.x = scale[0];
		api.position.set(...position);
	}, [api, position, ref, scale]);
  
	return (
		<mesh ref={ref} scale={scale}>
			<planeBufferGeometry attach='geometry' args={args}/>
			<meshStandardMaterial attach="material" color="#FFFFFF" opacity={0} transparent={true}/>
		</mesh>
	);
};

export default Wall;
