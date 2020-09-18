import React, { useState, useEffect, useCallback } from 'react';
import { useBox } from 'use-cannon';
import { CanvasTexture } from 'three';

import image1 from '../images/RoundIcons-Free-Set-01.png';
import image2 from '../images/RoundIcons-Free-Set-02.png';
import image3 from '../images/RoundIcons-Free-Set-03.png';
import image4 from '../images/RoundIcons-Free-Set-04.png';
import image5 from '../images/RoundIcons-Free-Set-05.png';
import image6 from '../images/RoundIcons-Free-Set-06.png';
import image7 from '../images/RoundIcons-Free-Set-07.png';
import image8 from '../images/RoundIcons-Free-Set-08.png';
import image9 from '../images/RoundIcons-Free-Set-09.png';
import image10 from '../images/RoundIcons-Free-Set-10.png';
import image11 from '../images/RoundIcons-Free-Set-11.png';

const Dice = ({ position }) => {
	
	const [ref, api] = useBox(() => {
		switch (parseInt(Math.random() * 4 + 1)) {
		case 1: 
			position = [((Math.random() * 2) - 1) * (window.innerWidth / 200 - 1), 10, -(window.innerHeight / 200 - 1)];
			break;
		case 2: 
			position = [window.innerWidth / 200 - 1, 10, ((Math.random() * 2) - 1) * (window.innerHeight / 200 - 1)];
			break;
		case 3: 
			position = [((Math.random() * 2) - 1) * (window.innerWidth / 200 - 1), 10, window.innerHeight / 200 - 1];
			break;
		case 4: 
			position = [Math.random() * (window.innerWidth / 200), 10, window.innerHeight / 200 - 1];
			break;
		default: 
			position = [((Math.random() * 2) - 1) * (window.innerWidth / 200) , 10, window.innerHeight / 200 - 1];
			break;
		}
  
		return {
			mass: 300,
			args: [1, 1, 1],
			position: position,
			friction: 0.8, 
		};});

	const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11];
	const [textures, setTextures] = useState([]);
  
	const throwDice = useCallback(() => {
		api.applyImpulse([0,10000,0],[Math.random() - .5,-.5,Math.random() - .5]);
		api.velocity.set(-(ref.current.position.x) * (Math.random() * 10 + 5), 10, -(ref.current.position.z) * (Math.random() * 10 + 5));
	}, [api, ref]);
  
	useEffect(() => {
		if (!textures.length) {
			throwDice();
		}
	}, [textures, throwDice]);

	useEffect(() => {
		if (textures.length < 6) {
			let img = new Image();
			img.src = images[textures.length];
			img.onload = () => {
				let ctx = document.createElement('canvas').getContext('2d');
				ctx.canvas.width = 512;
				ctx.canvas.height = 512;

				ctx.beginPath();
				ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
				ctx.fillStyle = '#636e72';
				ctx.fill();
				ctx.closePath();

				ctx.beginPath();
				ctx.drawImage(
					img,
					0,
					0,
					img.width,
					img.height,
					ctx.canvas.width * .05,
					ctx.canvas.height * .05,
					ctx.canvas.width * .9,
					ctx.canvas.height * .9,
				);
				ctx.closePath();

				setTextures([...textures, new CanvasTexture(ctx.canvas)]);
			};
		}
	}, [images, textures]);
  
	return <mesh
		receiveShadow
		castShadow
		ref={ref}
		onClick={() => throwDice()}
	>
		{textures.map((texture, index) => (
			<meshStandardMaterial
				receiveShadow
				attachArray='material'
				map={texture}
				key={index}
				smoothShading
			/>
		))}
		<boxBufferGeometry attach="geometry" />
	</mesh>;
};

export default Dice;
