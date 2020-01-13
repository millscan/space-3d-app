import React, {useState, useEffect, useCallback, useRef, useMemo} from 'react'

function useFlicker(min, max, numLevels, interval){
    
    const [flicker, setFlicker] = useState() 
    const intervalRef = useRef()

    const levels = useMemo(() => {
        let difference = max - min
        let delta = difference/numLevels
        let newLevels = []
        for(let i = 0; i < numLevels; i++){
            newLevels.push(min + i*delta)
        }

        return newLevels
    }, [min, max, numLevels])

    const getFlickerValue = useCallback(() => {
        let randIndex = Math.round(Math.random()*levels.length)
        return levels[randIndex]
    }, [levels])

    useEffect(() => {
        if(intervalRef.current) clearInterval(intervalRef.current)
        intervalRef.current = setInterval(() => {
            setFlicker(getFlickerValue())
        }, interval)
    }, [getFlickerValue])

    return flicker
}

export default useFlicker