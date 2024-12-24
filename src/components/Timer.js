import {useEffect} from 'react'

const Timer=({secondsRemaining, dispatch})=>{
useEffect(()=>{
    const id = setInterval(()=>{
        dispatch({type: 'timer'})
    }, 1000)
return (()=>clearInterval(id))
},[])
    return (<div>
        {secondsRemaining}
    </div>)
}

export default Timer