import React from 'react';
import './Result.css';

const Result = (props) => {
  return (
    <div className='result-container'>
      <div className='result-div'>
        <h1>You have successfully submitted the Assessment</h1>
        <h3>- Question Asked: </h3>
        {props.questionLength}
        <h3>- Question Correct: </h3>
        {props.correctQuestions}
        <h3>- Your Score: </h3>
        {props.score}%
      </div>
    </div>
  );
};

export default Result;
