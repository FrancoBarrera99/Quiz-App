import React, { useState } from 'react';
import { fetchQuizQuestions } from './API';
import { QuestionState, Difficulty } from './API';
import QuestionCard from './Components/QuestionCard';

const Total_Questions = 10;

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const App = () => {

  //states

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);


  //functions

  const startTrivia = async () => {

    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      Total_Questions,
      Difficulty.EASY
    )

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);

  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {

      //get & check answer against correct answer
      const answer = e.currentTarget.value;

      const correct = questions[number].correct_answer === answer;

      if (correct) setScore(prev => prev + 1);

      //save answer in user answers
      const AnswerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      };

      setUserAnswers((prev) => [...prev, AnswerObject]);

    }
  }

  const nextQuestion = () => {

    const nextQuestion = number + 1;

    //if not last questions
    if (nextQuestion === Total_Questions) {

      setGameOver(true);

    } else {

      setNumber(nextQuestion);

    }

  }



  return (
    <div className="App">
      <h1>REACT TS QUIZ</h1>
      {gameOver || userAnswers.length === Total_Questions ? (
        <button className='start' onClick={startTrivia}>Start</button>
      ) : null}

      {!gameOver ? <p className='score'>Score: {score} </p> : null}
      {loading ? <p>Loading questions...</p> : null}

      {!loading && !gameOver ? (<QuestionCard
        questionNumber={number + 1}
        totalQuestions={Total_Questions}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        callback={checkAnswer}
      />) : null}

      {!gameOver && !loading && userAnswers.length === number + 1 && number !== Total_Questions - 1 ? (
        <button className='next' onClick={nextQuestion}>Next</button>
      ) : null}

    </div>
  );
}

export default App;
