import React, { useState } from 'react';
import './Quiz.css';
import ReviewAnswers from '../../components/ReviewAnswers/ReviewAnswers';
import Result from '../../components/Result/Result';

const Quiz = () => {
  const questions = [
    {
      id: 1,
      questionText: 'A line which cuts a pair of parallel lines is called',
      answerOptions: [
        { answerText: 'Tangent', isCorrect: true },
        { answerText: 'Chord', isCorrect: false },
        { answerText: 'Traversal', isCorrect: false },
        { answerText: 'Intersector', isCorrect: false },
      ],
    },
    {
      id: 2,
      questionText:
        'If a certain sum of money can become 5 times of its principal in 10 years, then the rate of interest',
      answerOptions: [
        { answerText: '20%', isCorrect: false },
        { answerText: '30%', isCorrect: true },
        { answerText: '40%', isCorrect: false },
        { answerText: '50%', isCorrect: false },
      ],
    },
    {
      id: 3,
      questionText:
        'A shopkeeper purchases 15 mangoes for Rs. 10 and sells them at 10 mangoes for Rs 15. Thus, he earns a profit of',
      answerOptions: [
        { answerText: '50%', isCorrect: false },
        { answerText: '75%', isCorrect: false },
        { answerText: '80%', isCorrect: true },
        { answerText: '125%', isCorrect: false },
      ],
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState({
    id: '',
    questionText: '',
    answerOption: '',
  });
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [result, setResult] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const nextButtonHandler = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    }
  };
  const previousButtonHandler = () => {
    const currentIndex = currentQuestion;
    if (currentIndex === 0) {
      return;
    }
    setCurrentQuestion(currentIndex - 1);
  };

  const handleAnswerClicked = (answer) => {
    const currentQuestionText = questions[currentQuestion].questionText;
    const clickedQuestionAnswer = {
      id: currentQuestion + 1,
      questionText: currentQuestionText,
      answerOption: answer,
    };
    setSelectedAnswer(clickedQuestionAnswer);
    let selectedAnss = clickedQuestionAnswer;
    addAnswerToList(selectedAnss);
  };

  const addAnswerToList = (answerObject) => {
    const temp = selectedAnswers;
    const temp1 = temp.filter(
      (ques) => ques.questionText !== answerObject.questionText
    );
    temp1.push(answerObject);
    temp1.sort((a, b) => (a.id > b.id ? 1 : -1));
    setSelectedAnswers(temp1);
  };

  const onSubmission = () => {
    const temp = selectedAnswers;
    let result = 0;
    temp.forEach((question) => {
      console.log(question.answerOption.isCorrect);
      if (question.answerOption.isCorrect) {
        result++;
      }
    });
    setIsSubmitted(true);
    setResult(result);
  };

  const quiz = (
    <>
      <ReviewAnswers
        selectedAnswers={selectedAnswers}
        questionIndex={currentQuestion}
      />
      <div className='quiz-area'>
        <div className='quiz-data'>
          <div className='quiz-header'>
            <button
              className='navigation-button'
              onClick={previousButtonHandler}
              disabled={currentQuestion === 0}
            >
              Previous
            </button>
            <h1>Answer Questions here</h1>
            <button
              className='navigation-button'
              onClick={nextButtonHandler}
              disabled={currentQuestion === questions.length - 1}
            >
              Next
            </button>
          </div>
          <h3>
            Question#{currentQuestion + 1}{' '}
            {questions[currentQuestion].questionText}
          </h3>
          <div className='answers'>
            {questions[currentQuestion].answerOptions.map(
              (answerOption, index) => {
                console.log('currentques=', currentQuestion);

                return (
                  <button
                    className={
                      selectedAnswer.answerOption === answerOption.answerText
                        ? 'answer-buttons answer-buttons-active'
                        : 'answer-buttons'
                    }
                    key={index}
                    onClick={() => handleAnswerClicked(answerOption)}
                  >
                    {answerOption.answerText}
                  </button>
                );
              }
            )}
          </div>
          <button className='submit-button' onClick={onSubmission}>
            Submit
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className='container'>
      {isSubmitted ? (
        <Result
          questionLength={questions.length}
          correctQuestions={result}
          score={(result / questions.length) * 100}
        />
      ) : (
        quiz
      )}
    </div>
  );
};
export default Quiz;
