import './custom.css'
import Header from './components/Header'
import Main from './components/Main'
import Loader from './components/Loader'
import Error from './components/Error'
import { useEffect } from 'react'
import { useReducer } from 'react'
import StartScreen from './components/StartScreen'
import Question from './components/Question'
import NextButton from './components/NextButton'
import Progress from './components/Progress'
import FinishScreen from './components/FinishScreen'
import Footer from './components/Footer'
import Timer from './components/Timer'

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],

  // 'loading', 'error', 'ready', 'active', 'finished'
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };

    case 'dataFailed':
      return { ...state, status: 'error' };

    case 'start':
      return { ...state, status: 'active', secondsRemaining: state.questions.length * SECS_PER_QUESTION }

    case 'newAnswer':
      const question = state.questions.at(state.index)
      return {
        ...state, answer: action.payload, points: action.payload === question.correctOption
          ? state.points + question.points
          : state.points
      }

    case 'nextQuestion':
      return { ...state, index: state.index + 1, answer: null }

    case 'finish':
      return { ...state, status: 'finished', highscore: state.points > state.highscore ? state.points : state.highscore }

    case 'reset':
      // return { ...state, status: 'ready', index: 0, answer: null, points: 0 } // my own solution
      return { ...initialState, questions: state.questions, status: 'ready' }

    case 'tick':
      return { ...state, secondsRemaining: state.secondsRemaining - 1, status: state.secondsRemaining === 0 ? 'finished' : state.status };

    default:
      throw new Error("Unknown action");
  }
}

function App() {
  const [{ questions, status, index, answer, points, highscore, secondsRemaining }, dispatch] = useReducer(reducer, initialState);

  const numQuestion = questions.length
  const maxPossiblePoints = questions.reduce((prev, curr) => prev + curr.points, 0)

  useEffect(() => {

    fetch('http://localhost:8000/questions')
      .then((response) => response.json())
      .then((data) => dispatch({ type: 'dataReceived', payload: data }))
      .catch((error) => dispatch({ type: 'dataFailed' }))
  }, [])

  return (
    <div className='app'>
      <Header />

      <Main className='main'>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen numQuestion={numQuestion} dispatch={dispatch} />}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestion}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer
                dispatch={dispatch}
                secondsRemaining={secondsRemaining}
              />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestion}
              />
            </Footer>
          </>
        )}

        {status === "finished" && <FinishScreen
          points={points}
          maxPossiblePoints={maxPossiblePoints}
          numQuestions={numQuestion}
          index={index}
          highscore={highscore}
          dispatch={dispatch}
        />
        }
      </Main>
    </div>
  )
}

export default App
