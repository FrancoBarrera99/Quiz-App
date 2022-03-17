import React, { useState } from 'react';
import { fetchQuizQuestions } from './API';
import { Difficulty } from './API';
import QuestionCard from './Components/QuestionCard';

const Total_Questions = 10;

const App = () => {

  //states

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(fetchQuizQuestions(Total_Questions, Difficulty.EASY));

  //functions

  const startTrivia = async () => {

  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

  }

  const nextQuestion = () => {

  }



  return (
    <div className="App">
      <h1>REACT TS QUIZ</h1>
      <button className='start' onClick={startTrivia}>Start</button>
      <p className='score'>Score:</p>
      <p>Loading questions...</p>
{/*      <QuestionCard
        questionNumber={number + 1}
        totalQuestions={Total_Questions}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        callback={checkAnswer}
      />
  */}
      <button className='next' onClick={nextQuestion}>Next</button>
    </div>
  );
}

export default App;
