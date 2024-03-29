import Header from './Header'
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import { useEffect, useReducer } from 'react';
import StartScreen from './StartScreen';
import Question from './Question';

const initialState = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0
}
function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' }

    case 'dataFailed':
      return {
        ...state,
        status: 'error'
      }

    case 'startQuiz':
      return { ...state, status: 'active' }

    case 'newAnswer':
      const question = state.questions.at(state.index);
      return { ...state, answer: action.payload, points: action.payload === question.correctOption ? state.points + question.points : state.points }

    default:
      return state
  }
}


function App() {
  const [{ status, questions, index, answer }, dispatch] = useReducer(reducer, initialState);

  const numQuestions = questions.length;

  useEffect(() => {
    fetch("http://localhost:9000/questions")
      .then(res => res.json())
      .then(data => dispatch({ type: 'dataReceived', payload: data }))
      .catch(err => dispatch({ type: 'dataFailed' }))
  }, [])

  function startQuiz(action) {
    dispatch(action);
  }

  return (
    <div className="app">
      <Header />

      <Main className="main">
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen numQuestions={numQuestions} startQuiz={startQuiz} />}
        {status === 'active' && <Question question={questions[index]} dispatch={dispatch} answer={answer} />}
      </Main>
    </div>
  );
}

export default App;
