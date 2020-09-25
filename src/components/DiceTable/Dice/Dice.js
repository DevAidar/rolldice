import React, { useState, useEffect, useCallback } from 'react';
import { useBox } from 'use-cannon';
import { CanvasTexture, Object3D } from 'three';

import image1 from '../../../images/RoundIcons-Free-Set-01.png';
import image2 from '../../../images/RoundIcons-Free-Set-02.png';
import image3 from '../../../images/RoundIcons-Free-Set-03.png';
import image4 from '../../../images/RoundIcons-Free-Set-04.png';
import image5 from '../../../images/RoundIcons-Free-Set-05.png';
import image6 from '../../../images/RoundIcons-Free-Set-06.png';
import image7 from '../../../images/RoundIcons-Free-Set-07.png';
import image8 from '../../../images/RoundIcons-Free-Set-08.png';
import image9 from '../../../images/RoundIcons-Free-Set-09.png';
import image10 from '../../../images/RoundIcons-Free-Set-10.png';
import image11 from '../../../images/RoundIcons-Free-Set-11.png';

const Dice = ({ setDice, position }) => {

	const [ref, api] = useBox(() => {
		switch (parseInt(Math.random() * 4 + 1)) {
		case 1: 
			position = [((Math.random() * 2) - 1) * (window.innerWidth / 200 - 1.5), 5, -(window.innerHeight / 200 - 1.5)];
			break;
		case 2: 
			position = [window.innerWidth / 200 - 1.5, 5, ((Math.random() * 2) - 1) * (window.innerHeight / 200 - 1.5)];
			break;
		case 3: 
			position = [((Math.random() * 2) - 1) * (window.innerWidth / 200 - 1.5), 5, window.innerHeight / 200 - 1.5];
			break;
		case 4: 
			position = [Math.random() * (window.innerWidth / 200 - 1.5), 5, window.innerHeight / 200 - 1.5];
			break;
		default: 
			position = [((Math.random() * 2) - 1) * (window.innerWidth / 200 - 1.5) , 5, window.innerHeight / 200 - 1.5];
			break;
		}
  
		return {
			mass: 300,
			args: [1, 1, 1],
			position: position,
			friction: 0.8, 
			rotation: [Math.random() * (Math.PI * 2), Math.random() * (Math.PI * 2), Math.random() * (Math.PI * 2)],
		};
	});

	const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11];
	const [textures, setTextures] = useState([]);
  
	const throwDice = useCallback((api, ref) => {
		api.applyImpulse([0,100,0],[Math.random() - .5,-.5,Math.random() - .5]);
		api.velocity.set(-((ref.current.position.x) * (Math.random() * 10 + 2) + 2), 10, -((ref.current.position.z) * (Math.random() * 10 + 2) + 2));
	}, []);
  
	const throwDiceUp = useCallback((api, ref) => {
		if (ref.current.position.y < 1) {
			api.applyImpulse([0, 500, 0], [0, 0, 0]);
			api.velocity.set(0, -10, 0);
		}
	}, []);
	
	const getUpSide = useCallback((api, ref, throwDiceUp) => {
		if (parseInt(ref.current.rotation._x * 10) === -parseInt(Math.PI / 2 * 10)) {
			if (parseInt(ref.current.rotation._y * 10) === -parseInt(Math.PI / 2 * 10)) {
				if (Math.abs(parseInt(ref.current.rotation._z * 10)) === 1 || !parseInt(ref.current.rotation._z * 10)) {
					console.log(1.11);
				} else if (Math.abs(parseInt(ref.current.rotation._z * 10)) === parseInt(Math.PI * 10)) {
					console.log(2.11);
				} else if (parseInt(ref.current.rotation._z * 10) === -parseInt(Math.PI / 2 * 10)) {
					console.log(3.11);
				} else if (parseInt(ref.current.rotation._z * 10) === parseInt(Math.PI / 2 * 10)) {
					console.log(4.11);
				} else {
					throwDiceUp(api, ref);
				}
			} else if (parseInt(ref.current.rotation._y * 10) === parseInt(Math.PI / 2 * 10)) {
				if (Math.abs(parseInt(ref.current.rotation._z * 10)) === parseInt(Math.PI * 10)) {
					console.log(1.12);
				} else if (Math.abs(parseInt(ref.current.rotation._z * 10)) === 1 || !parseInt(ref.current.rotation._z * 10)) {
					console.log(2.12);
				} else if (parseInt(ref.current.rotation._z * 10) === parseInt(Math.PI / 2 * 10)) {
					console.log(3.12);
				} else if (parseInt(ref.current.rotation._z * 10) === -parseInt(Math.PI / 2 * 10)) {
					console.log(4.12);
				} else {
					throwDiceUp(api, ref);
				}
			} else if (Math.abs(parseInt(ref.current.rotation._y * 10)) === 1 || !parseInt(ref.current.rotation._y * 10)) {
				console.log(5.1);
			} else if (Math.abs(parseInt(ref.current.rotation._y * 10)) === parseInt(Math.PI * 10)) {
				console.log(6.1);
			} else {
				throwDiceUp(api, ref);
			}
		} else if (parseInt(ref.current.rotation._x * 10) === parseInt(Math.PI / 2 * 10)) {
			if (parseInt(ref.current.rotation._y * 10) === parseInt(Math.PI / 2 * 10)) {
				if (Math.abs(parseInt(ref.current.rotation._z * 10)) === 1 || !parseInt(ref.current.rotation._z * 10)) {
					console.log(1.11);
				} else if (Math.abs(parseInt(ref.current.rotation._z * 10)) === parseInt(Math.PI * 10)) {
					console.log(2.11);
				} else if (parseInt(ref.current.rotation._z * 10) === -parseInt(Math.PI / 2 * 10)) {
					console.log(3.11);
				} else if (parseInt(ref.current.rotation._z * 10) === parseInt(Math.PI / 2 * 10)) {
					console.log(4.11);
				} else {
					throwDiceUp(api, ref);
				}
			} else if (parseInt(ref.current.rotation._y * 10) === -parseInt(Math.PI / 2 * 10)) {
				if (Math.abs(parseInt(ref.current.rotation._z * 10)) === parseInt(Math.PI * 10)) {
					console.log(1.12);
				} else if (Math.abs(parseInt(ref.current.rotation._z * 10)) === 1 || !parseInt(ref.current.rotation._z * 10)) {
					console.log(2.12);
				} else if (parseInt(ref.current.rotation._z * 10) === parseInt(Math.PI / 2 * 10)) {
					console.log(3.12);
				} else if (parseInt(ref.current.rotation._z * 10) === -parseInt(Math.PI / 2 * 10)) {
					console.log(4.12);
				} else {
					throwDiceUp(api, ref);
				}
			} else if (Math.abs(parseInt(ref.current.rotation._y * 10)) === 1 || !parseInt(ref.current.rotation._y * 10)) {
				console.log(6.2);
			} else if (Math.abs(parseInt(ref.current.rotation._y * 10)) === parseInt(Math.PI * 10)) {
				console.log(5.2);
			} else {
				throwDiceUp(api, ref);
			}
		} else if (Math.abs(parseInt(ref.current.rotation._x * 10)) === parseInt(Math.PI * 10)) {
			if (parseInt(ref.current.rotation._z * 10) === -parseInt(Math.PI / 2 * 10)) {
				console.log(1.3);
			} else if (parseInt(ref.current.rotation._z * 10) === parseInt(Math.PI / 2 * 10)) {
				console.log(2.3);
			} else if (Math.abs(parseInt(ref.current.rotation._z * 10)) === 1 || !parseInt(ref.current.rotation._z * 10)) {
				console.log(4.3);
			} else if (Math.abs(parseInt(ref.current.rotation._z * 10)) === parseInt(Math.PI * 10)) {
				console.log(3.3);
			} else {
				throwDiceUp(api, ref);
			}
		} else if (Math.abs(parseInt(ref.current.rotation._x * 10)) === 1 || !parseInt(ref.current.rotation._x * 10)) {
			if (parseInt(ref.current.rotation._z * 10) === parseInt(Math.PI / 2 * 10)) {
				console.log(1.4);
			} else if (parseInt(ref.current.rotation._z * 10) === -parseInt(Math.PI / 2 * 10)) {
				console.log(2.4);
			} else if (Math.abs(parseInt(ref.current.rotation._z * 10)) === 1 || !parseInt(ref.current.rotation._z * 10)) {
				console.log(3.4);
			} else if (Math.abs(parseInt(ref.current.rotation._z * 10)) === parseInt(Math.PI * 10)) {
				console.log(4.4);
			} else {
				throwDiceUp(api, ref);
			}
		} else {
			throwDiceUp(api, ref);
		}
	}, []);

	useEffect(() => {
		if (!textures.length) {
			throwDice(api, ref);
			api.velocity.subscribe(velocity => Math.abs(velocity.reduce((sum, current) => sum += current, 0)) < .03
				?	getUpSide(api, ref, throwDiceUp)
				: null,
			);
		}
	}, [api, getUpSide, ref, textures, throwDice, throwDiceUp]);

	useEffect(() => {
		if (textures.length < 6) {
			let img = new Image();
			img.src = images[textures.length];
			img.onload = () => {
				let ctx = document.createElement('canvas').getContext('2d');
				ctx.canvas.width = 64;
				ctx.canvas.height = 64;

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
  
	useEffect(() => {
		if (ref)
		  setDice([ref.current]);
	}, [ref, setDice]);
  
	return <mesh
		receiveShadow
		castShadow
		ref={ref}
		onClick={() => console.log(new Object3D())}
		onDoubleClick={() => throwDice(api, ref)}
	>
		<boxBufferGeometry attach="geometry" />
		{textures.map((texture, index) => (
			<meshStandardMaterial
				receiveShadow
				attachArray='material'
				map={texture}
				key={index}
				smoothShading
			/>
		))}
	</mesh>;
};

export default Dice;
