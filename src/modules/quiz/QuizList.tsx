import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getQuizList, QUIZ_API_TYPES } from "@api/quiz";

export default function QuizList() {
  const [quizList, setQuizList] = useState<QUIZ_API_TYPES["getList"][]>([]);

  const fetchQuizList = useCallback(async () => {
    const data = await getQuizList();

    setQuizList(data);
  }, []);

  useEffect(() => {
    fetchQuizList();
  }, [fetchQuizList]);

  async function deleteQuiz(id: string) {
    await deleteQuiz(id);
    await fetchQuizList();
  }

  return (
    <>
      <h1>Quiz List</h1>
      <Link to="/quiz/new">New quiz</Link>
      <ul>
        {quizList.map((quiz) => (
          <li key={quiz.id}>
            <Link to={`/quiz/${quiz.id}`}>{quiz.title}</Link>
            <button type="button" onClick={() => deleteQuiz(quiz.id)}>
              delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
