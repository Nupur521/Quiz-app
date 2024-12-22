import {useEffect, useState, useRef} from 'react'
import "../styles.css"

const QuestionsList=({questions, dispatch,selectedAnswer})=>{

     const inputElementsRef=useRef([])
     const [selectedIdx, setSelectedIdx]=useState('')

        function handleAnswerSubmit(){
        if(selectedAnswer)
        {
         document.getElementsByClassName('select-answer')[0].style.display="none"
         if(selectedAnswer === questions.correctAnswer) 
         {
            inputElementsRef.current[+selectedIdx].style.color="green"
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

    // setIndex((index)=>index+1)
    }
     
    function handleChange(e, idx){
      dispatch({type: 'selectedAnswer', payload: e.target.value})
      setSelectedIdx(idx)
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
  return (
    <div>
      <h1>
        {questions.question}
      </h1>
      <h2>
          {questions.options?.map((item, idx)=>{
                  return <><label ref={(el)=> (inputElementsRef.current[idx]=el)} ><input type="radio" value={item} checked={selectedAnswer === item} onChange={(e)=>handleChange(e,idx)}/>{item}</label><br/></>
             })}
             </h2>
        <button onClick={()=>{handleAnswerSubmit()}}>Submit Answer</button>
        <h3 className='correct-answer'>Your answer is correct !</h3>
             <h3 className='incorrect-answer'>Your answer is not correct !</h3>
             <h3 className='select-answer'>You need to select an answer to proceed!</h3>
             <button onClick={()=>handleNextQuestion()} className='next-question-btn'>Next Question</button>
    </div>
  )
}

// const QuestionsList=({question, dispatch})=>{

//     const[index, setIndex]=useState(0)
//     const [currentQuestion, setCurrentQuestion]=useState('')




//     // useEffect(()=>{
//     //     if(questions?.questions?.length>0)
//     //        setCurrentQuestion(questions?.questions[index])
//     // },[questions])

   



    
//     function handleNextQuestion(){
//       document.getElementsByClassName('correct-answer')[0].style.display="None"
//       document.getElementsByClassName('incorrect-answer')[0].style.display="None"
//       inputElementsRef.current[selectedIdx].style.color="black"

//         {[...Array(inputElementsRef.current.length)].map((_,i)=>(
//              inputElementsRef.current[i].querySelector('input').removeAttribute('disabled')
//         ))}
//         document.getElementsByClassName('next-question-btn')[0].style.display="None"
//         dispatch({type: 'emptySelectedAnswer', payload: ''})
//         setSelectedIdx('')
//     }

//     return (
//         <div>
//                <h1>
//                 {question}
//             </h1>
//            <h2>
//             {question.options?.map((item, idx)=>{
//                  return <><label ref={(el)=> (inputElementsRef.current[idx]=el)} ><input type="radio" value={item} checked={question.selectedAnswer === item} onChange={(e)=>handleChange(e,idx)}/>{item}</label><br/></>
//             })}
//             </h2>
//        
//             <h3 className='correct-answer'>Your answer is correct !</h3>
//             <h3 className='incorrect-answer'>Your answer is not correct !</h3>
//             <h3 className='select-answer'>You need to select an answer to proceed!</h3>
//             <button onClick={()=>handleNextQuestion()} className='next-question-btn'>Next Question</button>
//             {/* <select>
//                {currentQuestion.options?.map((item)=> <option value={item}>{item}</option>)}</select> 
//            </h2> */}
//         </div>
//     )
// }

export default QuestionsList