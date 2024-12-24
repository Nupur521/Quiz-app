import {useState, useRef} from 'react'
import ProgressBar from "./ProgressBar"
import "../styles.css"
import StartScreen from './StartScreen'
import Timer from './Timer'

const QuestionsList=({questions,dispatch,selectedAnswer,points, questionIndex, secondsRemaining})=>{

     const inputElementsRef=useRef([])
     const [selectedIdx, setSelectedIdx]=useState('')

        function handleAnswerSubmit(){
        if(selectedAnswer)
        {
         document.getElementsByClassName('select-answer')[0].style.display="none"
         if(selectedAnswer === questions.correctAnswer) 
         {
            inputElementsRef.current[+selectedIdx].style.color="green"
            dispatch({type:'points', payload: questions.points})
            document.getElementsByClassName('correct-answer')[0].style.display="block"
         
         }
         else{
             inputElementsRef.current[+selectedIdx].style.color="red"
             document.getElementsByClassName('incorrect-answer')[0].style.display="block"
            
         }
       
          document.getElementsByClassName('next-question-btn')[0].style.display="block"
          {[...Array(inputElementsRef.current.length)].map((_,i)=>
            {
                console.log(selectedIdx)
                if (selectedIdx!=i){
                   inputElementsRef.current[i].querySelector('input').setAttribute('disabled','disabled')
                }
                })}
        }
        else
        {
          document.getElementsByClassName('select-answer')[0].style.display="block"
        }
    }
     
    function handleChange(e, idx){
      dispatch({type: 'selectedAnswer', payload: e.target.value})
      setSelectedIdx(idx)
    }
    function handleRestartQuiz() {
      console.log("Setting timeout...");
      setTimeout(() => {
        console.log("Dispatching start action...");
        dispatch({ type: 'start' });
      }, 5000);
    }
    
 
    function handleNextQuestion(){
      document.getElementsByClassName('correct-answer')[0].style.display="None"
      document.getElementsByClassName('incorrect-answer')[0].style.display="None"
      inputElementsRef.current[selectedIdx].style.color="black"

        {[...Array(inputElementsRef.current.length)].map((_,i)=>(
             inputElementsRef.current[i].querySelector('input').removeAttribute('disabled')
        ))}
        document.getElementsByClassName('next-question-btn')[0].style.display="None"
        dispatch({type: 'emptySelectedAnswer', payload: ''})
        dispatch({type:'nextQuestion'})
        setSelectedIdx('')
    }
    return (questionIndex == 14 ? <StartScreen questionsCount={15} dispatch={dispatch}/> :
    <div>
      <ProgressBar points={points} index={questionIndex}/>
      <h1>
        {questions.question}
      </h1>
      <h2>
          {questions.options?.map((item, idx)=>{
                  return <><label ref={(el)=> (inputElementsRef.current[idx]=el)} ><input type="radio" value={item} checked={selectedAnswer === item} onChange={(e)=>handleChange(e,idx)}/>{item}</label><br/></>
             })}
             </h2>
        <button onClick={()=>{handleAnswerSubmit()}}>Submit Answer</button>
        <Timer dispatch={dispatch} secondsRemaining={secondsRemaining}/>
        <h3 className='correct-answer'>Your answer is correct !</h3>
             <h3 className='incorrect-answer'>Your answer is not correct !</h3>
             <h3 className='select-answer'>You need to select an answer to proceed!</h3>
             <button onClick={()=>{questionIndex === 14 ?handleRestartQuiz(): handleNextQuestion()}}className='next-question-btn'>{questionIndex === 14 ? 'Restart Quiz' : 'Next Question'}</button>
    </div>
  )
}

export default QuestionsList