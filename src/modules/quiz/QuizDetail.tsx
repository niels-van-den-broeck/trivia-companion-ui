import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getQuiz, QUIZ_API_TYPES } from "@api/quiz";

type Params = {
  id: string;
};

export default function QuizList() {
  const { id } = useParams() as Params;
  const [quiz, setQuiz] = useState<QUIZ_API_TYPES["get"]>();

  useEffect(() => {
    async function fetchQuizDetail() {
      const data = await getQuiz(id);

      setQuiz(data);
    }

    fetchQuizDetail();
  }, [id]);

  return <h1>Quiz {quiz?.title}</h1>;
}
