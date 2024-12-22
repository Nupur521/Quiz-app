const StartScreen=({questionsCount, dispatch})=>{
    return (
        <div>
            <h1>Welcome to the Quiz App</h1>
            <h2>Total No. of Questions: {questionsCount}</h2>
            <button onClick={()=>{
              dispatch({type: 'start'})
            }}>Let's Begin</button>
        </div>
    )
}

export default StartScreen