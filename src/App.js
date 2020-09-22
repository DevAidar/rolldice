import React, { useState, useEffect } from 'react';
import { Canvas } from 'react-three-fiber';
import { softShadows } from 'drei';
import { Physics, usePlane } from 'use-cannon';
import { Vector2 } from 'three';

import Dice from './components/Dice';

import './App.scss';

softShadows();

function Plane(props) {
	const [ref] = usePlane(() => ({ mass: 0, friction: 0.8, rotation: [-Math.PI / 2, 0, 0], ...props }));
	return (
		<mesh ref={ref} receiveShadow>
			<planeBufferGeometry attach="geometry" args={[1000, 1000]} />
			<meshStandardMaterial attach="material" color="#EFDFD5" smoothShading/>
		</mesh>
	);
}

const Wall = ({ rotation, args, position }) => {
	const [ref] = usePlane(() => ({ mass: 0, friction: 10000, rotation: rotation, position: position }));
  
	return (
		<mesh ref={ref}>
			<planeBufferGeometry attach='geometry' args={args}/>
			<meshStandardMaterial attach="material" color="#FFFFFF" opacity={0} transparent={true}/>
		</mesh>
	);
};

const App = () => {
	const VIEW_WIDTH = window.innerWidth / 100;
	const CAMERA_HEIGHT = 100;
	const [fov, setFov] = useState();

	useEffect(() => setFov(2 * Math.atan( ( VIEW_WIDTH / (window.innerWidth / window.innerHeight) ) / ( 2 * CAMERA_HEIGHT ) ) * ( 180 / Math.PI )), [VIEW_WIDTH]);

	return (
		<div className="App">
			<Canvas shadowMap colorManagement camera={{ position: [0, CAMERA_HEIGHT, 0], fov: fov }}>
        
				{/* <hemisphereLight intensity={0.35} /> */}
				{/* <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={2} castShadow shadow-mapSize-width={256} shadow-mapSize-height={256} /> */}
				
				<Physics gravity={[0, -30, 0]}>
					<Plane/>
					<Wall rotation={[0, 0, 0]} args={[window.innerWidth / 100 - .4, 100, 0]} position={[0, 50, -(window.innerHeight / 200 - .2)]}/>
					<Wall rotation={[0, -Math.PI / 2, 0]} args={[window.innerHeight / 100 - .4, 100, 0]} position={[window.innerWidth / 200 - .2, 50, 0]}/>
					<Wall rotation={[0, Math.PI, 0]} args={[window.innerWidth / 100 - .4, 100, 0]} position={[0, 50, window.innerHeight / 200 - .2]}/>
					<Wall rotation={[0, Math.PI / 2, 0]} args={[window.innerHeight / 100 - .4, 100, 0]} position={[-(window.innerWidth / 200 - .2), 50, 0]}/>
					<Dice/>
					<Dice/>
					<Dice/>
					<Dice/>
					<Dice/>
				</Physics>
				<ambientLight color='#f0f5fb' intensity={.4}/>
				{/* <pointLight
					castShadow
					intensity={2.0}
					color={0xefdfd5}
					position={[10, 50, 10]}
					// shadow={{ radius: 8 }}
				/> */}
				{/* <spotLight
					castShadow
					intensity={0.25}
					position={[window.innerWidth / 200 - .2, 50, -(window.innerHeight / 200 - .2)]}
					angle={Math.PI / 3}
					penumbra={1}
					shadow-mapSize={new Vector2(2048 * 5, 2048 * 5)}
				/> */}
				{/* <spotLight
					castShadow
					intensity={0.25}
					position={[-(window.innerWidth / 200 - .2), 50, window.innerHeight / 200 - .2]}
					angle={Math.PI / 3}
					penumbra={1}
					shadow-mapSize={new Vector2(2048 * 5, 2048 * 5)}
				/> */}
				{/* <spotLight
					castShadow
					intensity={0.25}
					position={[-(window.innerWidth / 200 - .2), 50, window.innerHeight / 200 - .2]}
					angle={Math.PI / 3}
					penumbra={1}
					shadow-mapSize={new Vector2(2048 * 5, 2048 * 5)}
				/> */}
				{/* <spotLight
					castShadow
					intensity={0.25}
					position={[window.innerWidth / 200 - .2, 50, -(window.innerHeight / 200 - .2)]}
					angle={Math.PI / 3}
					penumbra={1}
					shadow-mapSize={new Vector2(2048 * 5, 2048 * 5)}
				/> */}
				<spotLight
					castShadow
					intensity={.5}
					position={[window.innerWidth / 200 - .2, 50, -(window.innerHeight / 200 - .2)]}
					angle={Math.PI / 3}
					shadow-mapSize={new Vector2(1024, 1024)}
					// fov={.0000001}
				/>
			</Canvas>
		</div>
	);
};

export default App;
