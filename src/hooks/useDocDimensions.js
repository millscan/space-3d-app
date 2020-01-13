import React, {useState, useEffect} from 'react'

const getDocHeight = () => {
    
    var height = 0
    if( typeof( window.innerWidth ) == 'number' ) {
      //Non-IE
      height = window.innerHeight;
    } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
      //IE 6+ in 'standards compliant mode'
      height = document.documentElement.clientHeight;
    } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
      //IE 4 compatible
      height = document.body.clientHeight;
    }
    return height
}

const getDocWidth = () => {

    var width = 0
    if( typeof( window.innerWidth ) == 'number' ) {
      //Non-IE
      width = window.innerWidth;
    } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
      //IE 6+ in 'standards compliant mode'
      width = document.documentElement.clientWidth;
    } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
      //IE 4 compatible
      width = document.body.clientWidth;
    }

    return width
  }

const useDocDimensions = () => {
    const [width, setWidth] = useState(getDocWidth())
    const [height, setHeight] = useState(getDocHeight())

    useEffect(() => {
      const handleResize = () => {
        setWidth(getDocWidth())
        setHeight(getDocHeight())
      }

      window.addEventListener('resize', handleResize)

      return () => window.removeEventListener('resize', handleResize)

    }, [])

    return {height: getDocHeight(), width: getDocWidth()}
}


export default useDocDimensions