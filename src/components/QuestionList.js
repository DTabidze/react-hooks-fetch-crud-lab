import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({questions,handleDelete,updateCorrectAnswer}) {
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map ((question) => <QuestionItem key={question.id} question={question} handleDelete={handleDelete} updateCorrectAnswer={updateCorrectAnswer}/>)}</ul>
    </section>
  );
}

export default QuestionList;
