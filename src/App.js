import Header from "./components/Header"
import Main from "./components/Main.js"
import Loader from "./components/Loader.js"
import QuestionsList from "./components/QuestionsList.js"
import { useEffect, useReducer } from "react";
import StartScreen from "./components/StartScreen.js";
import Error from "./components/Error.js";

function App() {

  const initialState={questions: [], status: 'loading', index:0}

  const reducer=(state, action)=>{
    switch (action.type){
      case 'dataReceieved':
        return {... state, questions: action.payload, status: 'ready'}
      
        case 'dataReceievedFailed':
          return {...state, status: action.payload}
        
          case 'start':
            return {...state, status: 'active'}
          
          case 'selectedAnswer':
            return {...state, selectedAnswer: action.payload}
          
          case 'emptySelectedAnswer':
            return {...state, selectedAnswer: action.payload}
          
            case 'nextQuestion':
              return {...state, index: state.index+1, selectedAnswer: ''}

      }
    }

  const [state, dispatch]=useReducer(reducer,initialState)

  const questionsCount= state.questions.length

  async function fetchQuestions(){
    try{
    const Data= await fetch(`http://localhost:9001/questions`)
    const ques=await Data.json()
    dispatch({type: 'dataReceieved', payload: ques})
    }
catch(error){
   dispatch({type: 'dataReceievedFailed', payload: error})
}
  }


  useEffect(()=>{
     fetchQuestions()
  },[])

  return (
    <div className="App">
      <Header/>
      <Main>
        {state.status === 'loading' && <Loader/>}
        {state.status === 'Error' && <Error/>}
        {state.status === 'ready' && <StartScreen questionsCount={questionsCount} dispatch={dispatch}/>}
        {state.status === 'active' && <QuestionsList questions={state.questions[state.index]} dispatch={dispatch} selectedAnswer={state.selectedAnswer}/>}
        </Main>
    </div>
  );
}

export default App;
