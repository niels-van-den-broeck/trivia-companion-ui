import QuizCreation from "./QuizCreation";
import QuizDetail from "./QuizDetail";
import QuizList from "./QuizList";

const routes = [
  {
    route: "/quiz",
    element: <QuizList />,
  },
  {
    route: "/quiz/new",
    element: <QuizCreation />,
  },
  {
    route: "/quiz/:id",
    element: <QuizDetail />,
  },
];

export default routes;
