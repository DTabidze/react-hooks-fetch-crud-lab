import React, { useState , useEffect} from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions,setQuestion] = useState([])
  const URL ="http://localhost:4000/questions"

  useEffect(()=> {
    fetch (URL)
    .then (response => response.json())
    .then (data => setQuestion(data))
  },[])

  function addQuestion (question) {
    fetch (URL, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(question)
    })
    .then (response => response.json())
    .then (data => setQuestion([...questions,data]))
  }

  function handleDelete (id) {

    fetch (`${URL}/${id}`, {
      method: "DELETE"
    })
    .then (response => setQuestion(questions.filter((question) => question.id !== id)))
  }

  function updateCorrectAnswer (id,answer) {
    fetch (`${URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({"correctIndex": answer})
    })
    .then (response => response.json())
    .then (updatedQuestion => setQuestion(questions.map((question) => {
      if (question.id === id) { 
        question.correctIndex = answer 
      }
      return question
    })))
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm addQuestion={addQuestion} updateCorrectAnswer={updateCorrectAnswer}/> : <QuestionList questions={questions} handleDelete={handleDelete} updateCorrectAnswer={updateCorrectAnswer}/>}
    </main>
  );
}

export default App;
