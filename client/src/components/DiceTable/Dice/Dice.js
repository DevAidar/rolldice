import React, { useState, useEffect, useCallback } from 'react';
import { animated } from 'react-spring/three';
import { useBox } from 'use-cannon';
import { CanvasTexture } from 'three';
import { useFrame } from 'react-three-fiber';

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

const ctx = document.createElement('canvas').getContext('2d');
const img = new Image();
img.src = image1;
img.onload = () => {
  ctx.canvas.width = 256;
  ctx.canvas.height = 256;

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
};

const Dice = ({ dice }) => {
  const [thrown, setThrown] = useState(false);
  const [landed, setLanded] = useState(false);
  const [textures, setTextures] = useState([]);
  const [landedRotation, setLandedRotation] = useState([]);
  const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11];

  const [ref, api] = useBox(() => {
    return {
      mass: 300,
      args: [1, 1, 1],
      friction: 10,
      tolerance: 0,
    };
  });

  const placeDiceOnTheBorder = () => {
    switch (parseInt(Math.random() * 4 + 1)) {
      case 1:
        return [((Math.random() * 2) - 1) * (window.innerWidth / 200 - 1.5), 5, -(window.innerHeight / 200 - 1.5)];
      case 2:
        return [window.innerWidth / 200 - 1.5, 5, ((Math.random() * 2) - 1) * (window.innerHeight / 200 - 1.5)];
      case 3:
        return [((Math.random() * 2) - 1) * (window.innerWidth / 200 - 1.5), 5, window.innerHeight / 200 - 1.5];
      case 4:
        return [Math.random() * (window.innerWidth / 200 - 1.5), 5, window.innerHeight / 200 - 1.5];
      default:
        return [((Math.random() * 2) - 1) * (window.innerWidth / 200 - 1.5), 5, window.innerHeight / 200 - 1.5];
    }
  }

  const throwDice = (api, dicePosition) => {
    api.applyImpulse([0, 1000, 0], [Math.random() - .5, -.5, Math.random() - .5]);
    api.velocity.set(-((dicePosition[0]) * (Math.random() * 10)), 10, -((dicePosition[2]) * (Math.random() * 10)));
  };

  const throwDiceUp = (api, ref) => {
    if (ref.current.position.y < 1) {
      api.applyImpulse([0, 500, 0], [0, 0, 0]);
      api.velocity.set(0, -10, 0);
    }
  };

  const getUpSide = useCallback((api, ref, throwDiceUp) => {
    if (ref.current.position.y <= .75) {
      if (parseInt(ref.current.rotation._x * 1000) === -parseInt(Math.PI / 2 * 1000)) {
        if (parseInt(ref.current.rotation._y * 1000) === -parseInt(Math.PI / 2 * 1000)) {
          if (Math.abs(parseInt(ref.current.rotation._z * 1000)) === 1 || !parseInt(ref.current.rotation._z * 1000)) {
            console.log(1.11);
            setLandedRotation([ref.current.rotation._x, ref.current.rotation._y, ref.current.rotation._z]);
            setLanded(true);
          } else if (Math.abs(parseInt(ref.current.rotation._z * 1000)) === parseInt(Math.PI * 1000)) {
            console.log(2.11);
            setLandedRotation([ref.current.rotation._x, ref.current.rotation._y, ref.current.rotation._z]);
            setLanded(true);
          } else if (parseInt(ref.current.rotation._z * 1000) === -parseInt(Math.PI / 2 * 1000)) {
            console.log(3.11);
            setLandedRotation([ref.current.rotation._x, ref.current.rotation._y, ref.current.rotation._z]);
            setLanded(true);
          } else if (parseInt(ref.current.rotation._z * 1000) === parseInt(Math.PI / 2 * 1000)) {
            console.log(4.11);
            setLandedRotation([ref.current.rotation._x, ref.current.rotation._y, ref.current.rotation._z]);
            setLanded(true);
          } else {
            throwDiceUp(api, ref);
          }
        } else if (parseInt(ref.current.rotation._y * 1000) === parseInt(Math.PI / 2 * 1000)) {
          if (Math.abs(parseInt(ref.current.rotation._z * 1000)) === parseInt(Math.PI * 1000)) {
            console.log(1.12);
            setLandedRotation([ref.current.rotation._x, ref.current.rotation._y, ref.current.rotation._z]);
            setLanded(true);
          } else if (Math.abs(parseInt(ref.current.rotation._z * 1000)) === 1 || !parseInt(ref.current.rotation._z * 1000)) {
            console.log(2.12);
            setLandedRotation([ref.current.rotation._x, ref.current.rotation._y, ref.current.rotation._z]);
            setLanded(true);
          } else if (parseInt(ref.current.rotation._z * 1000) === parseInt(Math.PI / 2 * 1000)) {
            console.log(3.12);
            setLandedRotation([ref.current.rotation._x, ref.current.rotation._y, ref.current.rotation._z]);
            setLanded(true);
          } else if (parseInt(ref.current.rotation._z * 1000) === -parseInt(Math.PI / 2 * 1000)) {
            console.log(4.12);
            setLandedRotation([ref.current.rotation._x, ref.current.rotation._y, ref.current.rotation._z]);
            setLanded(true);
          } else {
            throwDiceUp(api, ref);
          }
        } else if (Math.abs(parseInt(ref.current.rotation._y * 1000)) === 1 || !parseInt(ref.current.rotation._y * 1000)) {
          console.log(5.1);
          setLandedRotation([ref.current.rotation._x, ref.current.rotation._y, ref.current.rotation._z]);
          setLanded(true);
        } else if (Math.abs(parseInt(ref.current.rotation._y * 1000)) === parseInt(Math.PI * 1000)) {
          console.log(6.1);
          setLandedRotation([ref.current.rotation._x, ref.current.rotation._y, ref.current.rotation._z]);
          setLanded(true);
        } else {
          throwDiceUp(api, ref);
        }
      } else if (parseInt(ref.current.rotation._x * 1000) === parseInt(Math.PI / 2 * 1000)) {
        if (parseInt(ref.current.rotation._y * 1000) === parseInt(Math.PI / 2 * 1000)) {
          if (Math.abs(parseInt(ref.current.rotation._z * 1000)) === 1 || !parseInt(ref.current.rotation._z * 1000)) {
            console.log(1.11);
            setLandedRotation([ref.current.rotation._x, ref.current.rotation._y, ref.current.rotation._z]);
            setLanded(true);
          } else if (Math.abs(parseInt(ref.current.rotation._z * 1000)) === parseInt(Math.PI * 1000)) {
            console.log(2.11);
            setLandedRotation([ref.current.rotation._x, ref.current.rotation._y, ref.current.rotation._z]);
            setLanded(true);
          } else if (parseInt(ref.current.rotation._z * 1000) === -parseInt(Math.PI / 2 * 1000)) {
            console.log(3.11);
            setLandedRotation([ref.current.rotation._x, ref.current.rotation._y, ref.current.rotation._z]);
            setLanded(true);
          } else if (parseInt(ref.current.rotation._z * 1000) === parseInt(Math.PI / 2 * 1000)) {
            console.log(4.11);
            setLandedRotation([ref.current.rotation._x, ref.current.rotation._y, ref.current.rotation._z]);
            setLanded(true);
          } else {
            throwDiceUp(api, ref);
          }
        } else if (parseInt(ref.current.rotation._y * 1000) === -parseInt(Math.PI / 2 * 1000)) {
          if (Math.abs(parseInt(ref.current.rotation._z * 1000)) === parseInt(Math.PI * 1000)) {
            console.log(1.12);
            setLandedRotation([ref.current.rotation._x, ref.current.rotation._y, ref.current.rotation._z]);
            setLanded(true);
          } else if (Math.abs(parseInt(ref.current.rotation._z * 1000)) === 1 || !parseInt(ref.current.rotation._z * 1000)) {
            console.log(2.12);
            setLandedRotation([ref.current.rotation._x, ref.current.rotation._y, ref.current.rotation._z]);
            setLanded(true);
          } else if (parseInt(ref.current.rotation._z * 1000) === parseInt(Math.PI / 2 * 1000)) {
            console.log(3.12);
            setLandedRotation([ref.current.rotation._x, ref.current.rotation._y, ref.current.rotation._z]);
            setLanded(true);
          } else if (parseInt(ref.current.rotation._z * 1000) === -parseInt(Math.PI / 2 * 1000)) {
            console.log(4.12);
            setLandedRotation([ref.current.rotation._x, ref.current.rotation._y, ref.current.rotation._z]);
            setLanded(true);
          } else {
            throwDiceUp(api, ref);
          }
        } else if (Math.abs(parseInt(ref.current.rotation._y * 1000)) === 1 || !parseInt(ref.current.rotation._y * 1000)) {
          console.log(6.2);
          setLandedRotation([ref.current.rotation._x, ref.current.rotation._y, ref.current.rotation._z]);
          setLanded(true);
        } else if (Math.abs(parseInt(ref.current.rotation._y * 1000)) === parseInt(Math.PI * 1000)) {
          console.log(5.2);
          setLandedRotation([ref.current.rotation._x, ref.current.rotation._y, ref.current.rotation._z]);
          setLanded(true);
        } else {
          throwDiceUp(api, ref);
        }
      } else if (Math.abs(parseInt(ref.current.rotation._x * 1000)) === parseInt(Math.PI * 1000)) {
        if (parseInt(ref.current.rotation._z * 1000) === -parseInt(Math.PI / 2 * 1000)) {
          console.log(1.3);
          setLandedRotation([ref.current.rotation._x, ref.current.rotation._y, ref.current.rotation._z]);
          setLanded(true);
        } else if (parseInt(ref.current.rotation._z * 1000) === parseInt(Math.PI / 2 * 1000)) {
          console.log(2.3);
          setLandedRotation([ref.current.rotation._x, ref.current.rotation._y, ref.current.rotation._z]);
          setLanded(true);
        } else if (Math.abs(parseInt(ref.current.rotation._z * 1000)) === 1 || !parseInt(ref.current.rotation._z * 1000)) {
          console.log(4.3);
          setLandedRotation([ref.current.rotation._x, ref.current.rotation._y, ref.current.rotation._z]);
          setLanded(true);
        } else if (Math.abs(parseInt(ref.current.rotation._z * 1000)) === parseInt(Math.PI * 1000)) {
          console.log(3.3);
          setLandedRotation([ref.current.rotation._x, ref.current.rotation._y, ref.current.rotation._z]);
          setLanded(true);
        } else {
          throwDiceUp(api, ref);
        }
      } else if (Math.abs(parseInt(ref.current.rotation._x * 1000)) === 1 || !parseInt(ref.current.rotation._x * 1000)) {
        if (parseInt(ref.current.rotation._z * 1000) === parseInt(Math.PI / 2 * 1000)) {
          console.log(1.4);
          setLandedRotation([ref.current.rotation._x, ref.current.rotation._y, ref.current.rotation._z]);
          setLanded(true);
        } else if (parseInt(ref.current.rotation._z * 1000) === -parseInt(Math.PI / 2 * 1000)) {
          console.log(2.4);
          setLandedRotation([ref.current.rotation._x, ref.current.rotation._y, ref.current.rotation._z]);
          setLanded(true);
        } else if (Math.abs(parseInt(ref.current.rotation._z * 1000)) === 1 || !parseInt(ref.current.rotation._z * 1000)) {
          console.log(3.4);
          setLandedRotation([ref.current.rotation._x, ref.current.rotation._y, ref.current.rotation._z]);
          setLanded(true);
        } else if (Math.abs(parseInt(ref.current.rotation._z * 1000)) === parseInt(Math.PI * 1000)) {
          console.log(4.4);
          setLandedRotation([ref.current.rotation._x, ref.current.rotation._y, ref.current.rotation._z]);
          setLanded(true);
        } else {
          throwDiceUp(api, ref);
        }
      } else {
        throwDiceUp(api, ref);
      }
    }
  });

  useFrame(() => {
    if (!thrown && !landed) {
      ref.current.position.x = 0;
      ref.current.position.y = Math.min(window.innerWidth, window.innerHeight) / 15 + 20;
      ref.current.position.z = 0;

      api.rotation.set(
        ref.current.rotation.x + 0.03,
        ref.current.rotation.y,
        ref.current.rotation.z + 0.01,
      );

      api.mass.set(0);
    }
    if (thrown && landed) {
      api.position.set(0, Math.min(window.innerWidth, window.innerHeight) / 15 + 20, 0);

      api.rotation.set(...landedRotation);

      api.mass.set(0);
    }
  });

  useEffect(() => {
    if (!thrown && !landed)
      api.velocity.subscribe(velocity => Math.abs(velocity.reduce((sum, current) => sum += current, 0)) < .1
        ? getUpSide(api, ref, throwDiceUp)
        : null,
      );
    if (thrown && !landed) {
      const dicePosition = placeDiceOnTheBorder();
      api.mass.set(300);
      api.position.set(...dicePosition);

      throwDice(api, dicePosition);
    }
    if (thrown && landed) {
      // setThrown(false);
      api.mass.set(0);
      api.angularVelocity.set(0, 0, 0);
      api.fixedRotation.set(...landedRotation);
      api.velocity.set(0, 0, 0);
      api.position.set(0, Math.min(window.innerWidth, window.innerHeight) / 15, 0);
      api.rotation.set(...landedRotation);
    }
  }, [thrown, landed, api, getUpSide, landedRotation, ref]);

  useEffect(() => {
    if (textures.length < 6) {
      if (dice.length > 1 && dice.length <= 6 && 6 % dice.length === 0) {
        setTextures([...textures, dice[textures.length % dice.length].diceTexture]);
      } else {
        setTextures([...textures, new CanvasTexture(ctx.canvas)]);
      }
    }
  }, [textures]);

  return <animated.mesh
    receiveShadow
    castShadow
    ref={ref}
    onClick={() => {
      if (!thrown || landed) {
        setThrown(true);
        setLanded(false);
      }
      console.log(textures)
    }}
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
  </animated.mesh>;
};

export default Dice;