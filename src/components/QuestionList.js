import { useEffect, useState } from "react";
import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {

const [questions, setQuestions] = useState([]);

useEffect(() => {
  fetch("http://localhost:4000/questions")
  .then ((res) => res.json())
  .then((questions) => {
    console.log(questions)
    setQuestions(questions)
  })
}, [])

function handleDelete(id){
  fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        const updatedQuestions = questions.filter((quiz) => quiz.id !== id);
        setQuestions(updatedQuestions);
      });
  };

  function handleUpdate(id, correctIndex){
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex }),
    })
      .then((response) => response.json())
      .then((updatedQuestion) => {
        const updatedQuestions = questions.map((quiz) => {
          if (quiz.id === updatedQuestions.id) return updatedQuestion;
          return quiz;
        });
        setQuestions(updatedQuestions);
      });
  };

const questionsList = questions.map((question) => (
  <QuestionItem
  key={question.id}
  question={question}
  deleteQuestion={handleDelete}
  updateQuestion={handleUpdate}
  />
))

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */}
      {questionsList}
      </ul>
    </section>
  );
}

export default QuestionList;
