import React, { forwardRef } from 'react'

function RelativeContainerPre({ id, className, onClick, onMouseEnter, onMouseLeave, style, children }, ref) {

  return (
    <div
      id={id}
      ref={ref}
      className={className}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...style
      }}
    >
      {children}
    </div>
  )
}

function AbsoluteContainerPre({ id, className, onClick, onMouseEnter, onMouseLeave, style, children }, ref) {

  return (
    <div
      id={id}
      ref={ref}
      className={className}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...style
      }}
    >
      {children}
    </div>
  )
}

const AbsoluteContainer = forwardRef(AbsoluteContainerPre)

const RelativeContainer = forwardRef(RelativeContainerPre)

export {AbsoluteContainer, RelativeContainer}
