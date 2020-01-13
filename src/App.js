import React, { useEffect, useState, useRef, useMemo } from 'react';
import * as THREE from 'three'
import { Canvas } from 'react-three-fiber'

import { RelativeContainer, AbsoluteContainer } from './components/Containers';
import Earth from './components/3d/Earth'

import useFlicker from './hooks/useFlicker'
import useDocDimensions from './hooks/useDocDimensions'

const planetData = {
  earth: {
    name: 'Earth'
  },
  moon: {
    name: 'The Moon'
  }
}

function InfoSnippet({data}){

  const [expanded, setExpanded] = useState(null)
  const {height} = useDocDimensions()

  useEffect(() => {
    if(!data){
      setExpanded(false)
    }
  }, [data])
  
  const flickerOpacity = useFlicker(0.7, 0.9, 500)
  const translateStatic = useMemo(() => `translateX(${(0.8-flickerOpacity)*10}px) translateY(${(0.8-flickerOpacity)*10}px)`, [flickerOpacity])
  return(
    <AbsoluteContainer
      style={{
        bottom: '40px',
        height: expanded ? height - 80 : 80,
        padding: '5px 20px',
        background: 'rgba(255,255,255,0.1)',
        minHeight: '80px',
        width: '80%',
        color: '#efefef',
        justifyContent: 'flex-start',
        borderRadius: '4px',
        overflow: 'hidden',
        flexFlow: 'column',
        transition: 'height 500ms',
        opacity: data ? flickerOpacity : 0
      }}
    >

        <img src='images/textures/noise.png' alt='' 
          style={{
            minHeight: '100%',
            pointerEvents: 'none',
            position: 'absolute', 
            minWidth: '100%', 
            objectFit: 'cover', 
            opacity: 0.3,
            transform: translateStatic,
            }}
          />
      <RelativeContainer
        onClick={() => setExpanded(!expanded)}
        style={{
          fontFamily: 'Teko',
          fontSize: '42px',
          height: '80px'
        }}
      >
        {data && data.name.toUpperCase()}
      </RelativeContainer>
    </AbsoluteContainer>
  )
}

function App() {

  const canvasRef = useRef()

  const [selected, setSelected] = useState(null)

  const handleSelect = data => {
    setSelected(data)
  }
  

  return (
    <RelativeContainer
      style={{
        height: '100vh',
        overflow: 'hidden',
        backgroundImage: 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)'
      }}
    >
      <AbsoluteContainer>
        <img src='images/backgrounds/stars.jpg' alt='bg' style={{minHeight: '100%', minWidth: '100%', objectFit: 'cover'}}/>
      </AbsoluteContainer>
      <Canvas
      >
        <spotLight color='#ffffff' castShadow={true} position={new THREE.Vector3(-5, 5, 3)} />
        <Earth selected={selected} select={setSelected}/>
      </Canvas>
      <InfoSnippet data={planetData[selected]}/>
    </RelativeContainer>
  );
}

export default App;
