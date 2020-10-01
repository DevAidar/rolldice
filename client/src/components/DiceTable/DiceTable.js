import React, { useState, useEffect, useRef } from 'react';
import ReactDom from 'react-dom';
import { Canvas } from 'react-three-fiber';
import { OrbitControls, PerspectiveCamera } from 'drei';
import { Physics } from 'use-cannon';
import { Object3D } from 'three';

import Dice from './Dice/Dice';
import Plane from './Table/Plane/Plane';
import Wall from './Table/Wall/Wall';

import './DiceTable.scss';

const DiceTable = ({ state, throwDice }) => {
	const CAMERA_HEIGHT = 100;
	const GRAVITY = [0, -30, 0];
  
	const cameraRef = useRef();
  
	const [dimensions, setDimensions] = useState({
		height: window.innerHeight / 100,
		width: window.innerWidth / 100, 
	});
  
	const [dice, setDice] = useState([]);
  
	useEffect(() => {
		const handleResize = () => {
			cameraRef.current.fov = 2 * Math.atan( ( (window.innerWidth / 100) / (window.innerWidth / window.innerHeight) ) / ( 2 * CAMERA_HEIGHT ) ) * ( 180 / Math.PI );
      
			setDimensions({
				height: window.innerHeight / 100,
				width: window.innerWidth / 100, 
			});
		};
    
		window.addEventListener('resize', handleResize);
	});

	return ReactDom.createPortal(
		<Canvas 
			shadowMap 
			colorManagement 
		>
			{/* Camera */}
			<PerspectiveCamera 
				ref={cameraRef} 
				makeDefault 
				fov={2 * Math.atan( ( (window.innerWidth / 100) / (window.innerWidth / window.innerHeight) ) / ( 2 * CAMERA_HEIGHT ) ) * ( 180 / Math.PI )} 
				position={[0, CAMERA_HEIGHT, 0]}
			/>
			<OrbitControls enabled={false}/>

			{/* 3D Objects */}
			<Physics gravity={GRAVITY}>
				<Plane scale={[dimensions.width, dimensions.height]}/>
				<Wall 
					rotation={[0, 0, 0]}            
					args={[1, CAMERA_HEIGHT, 0]} 
					position={[0, CAMERA_HEIGHT / 2, -(dimensions.height / 2 - .2)]}
					scale={[dimensions.width - .4, 1, 0]}
				/>
				<Wall 
					rotation={[0, -Math.PI / 2, 0]} 
					args={[1, CAMERA_HEIGHT, 0]} 
					position={[dimensions.width / 2 - .2, CAMERA_HEIGHT / 2, 0]}
					scale={[dimensions.height - .4, 1, 0]}
				/>
				<Wall 
					rotation={[0, Math.PI, 0]}      
					args={[1, CAMERA_HEIGHT, 0]} 
					position={[0, CAMERA_HEIGHT / 2, dimensions.height / 2 - .2]}
					scale={[dimensions.width - .4, 1, 0]} 
				/>
				<Wall 
					rotation={[0, Math.PI / 2, 0]}  
					args={[1, CAMERA_HEIGHT, 0]} 
					position={[-(dimensions.width / 2 - .2), CAMERA_HEIGHT / 2, 0]}
					scale={[dimensions.height - .4, 1, 0]} 
				/>
				<Dice setDice={setDice}/>
			</Physics>

			{/* lights #f0f5fb */}
			<ambientLight color='#FFFFFF' intensity={.5}/>
			<directionalLight
				castShadow
				position={[0, CAMERA_HEIGHT, 0]}
				intensity={.8}
				target={dice.length ? dice[0] : new Object3D()}
				shadow-mapSize-width={1024}
				shadow-mapSize-height={1024}
				shadow-camera-far={(dimensions.height + dimensions.width) * 100}
				shadow-camera-left={-10}
				shadow-camera-right={10}
				shadow-camera-top={10}
				shadow-camera-bottom={-10}
			/>
			<pointLight position={[-10, 0, -20]} color='red' intensity={2.5} />
			<pointLight position={[0, -10, 0]} intensity={1.5} />
		</Canvas>,
		document.getElementById('dice-table-portal'),
	);
};

export default DiceTable;
