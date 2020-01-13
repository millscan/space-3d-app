import React, { useEffect, useState, useRef, useMemo } from 'react';
import * as THREE from 'three'
import { animated, useSpring } from 'react-spring-three'
import { useFrame } from 'react-three-fiber'

import earthTexture from './textures/2k_earth_daymap.jpg'
import { TextureLoader } from 'three';

function Moon({ selected, select }) {

  const [hovered, setHovered] = useState(false)

  const prop = useSpring({
    'material-opacity': (hovered || (selected === 'moon')) ? 1 : 0.5,
    scale: selected ? [1.5, 1.5, 1.5] : [1, 1, 1],
    rotation: selected === 'moon' ? [0, THREE.Math.degToRad(-45), 0] : [0, 0, 0],
  })

  return (
    <animated.mesh
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      position={new THREE.Vector3(2.5, 1, 0)}
      onClick={() => select('moon')}
      {...prop}
    >
      <sphereBufferGeometry attach="geometry" args={[0.4, 10, 10]} />
      <meshStandardMaterial color='#cdcdcd' transparent attach="material" />
    </animated.mesh>
  )
}

function Earth({ select, selected }) {

  const sphereRef = useRef()

  const texture = useMemo(() => new TextureLoader().load(earthTexture), [earthTexture])
  const [fetched, setFetched] = useState(false)

  const groupProp = useSpring({
    scale: fetched ? [1, 1, 1] : [0.01, 0.01, 0.01]
  })
  const prop = useSpring({
    'material-opacity': fetched ? (selected === 'earth' ? 1 : 0.4) : 0,
  })

  useEffect(() => {
    setFetched(true)
    select('earth')
  }, [])

  useFrame(() => (sphereRef.current.rotation.y += -0.01))

  return (
    <group>
      <animated.mesh
        ref={sphereRef}
        {...groupProp}
      >
        <animated.mesh
          onClick={e => select('earth')}
          {...prop}
        >
          <sphereBufferGeometry attach="geometry" args={[1.5, 32, 32]} />
          <meshPhongMaterial map={texture} transparent color='white' attach="material" />
        </animated.mesh>
        <Moon selected={selected} select={select} />
      </animated.mesh>

    </group>
  )
}

export default Earth