import React from 'react';
import './ReviewAnswers.css';

const ReviewAnswers = (props) => {
  const answerList = props.selectedAnswers.map((answer, index) => {
    // console.log(props.selectedAnswers);
    return (
      <div key={index} className='answers-review'>
        <b>#{answer.id}</b> {answer.answerOption.answerText}
      </div>
    );
    // return <div key={index}>answers</div>;
  });

  return (
    <div className='review-answers'>
      <h2>Review Answers here :-</h2> {answerList}
    </div>
  );
};
export default ReviewAnswers;
