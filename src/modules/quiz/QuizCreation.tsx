import { ChangeEvent, useState } from "react";
import { Navigate } from "react-router";

import { postQuiz } from "@api/quiz";

export default function QuizCreation() {
  const [formValues, setFormValues] = useState({
    title: "",
  });
  const [createdId, setCreatedId] = useState("");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  }

  async function submitForm() {
    const data = await postQuiz(formValues);

    setCreatedId(data.id);
  }

  return (
    <div>
      <h1>Create Quiz</h1>
      <form>
        <label htmlFor="title">
          Title:
          <input
            id="title"
            name="title"
            type="text"
            placeholder="title"
            value={formValues.title}
            onChange={handleChange}
          />
        </label>
        <button type="button" onClick={submitForm}>
          Create quiz
        </button>
      </form>
      {createdId && <Navigate to={`/quiz/${createdId}`} />}
    </div>
  );
}
