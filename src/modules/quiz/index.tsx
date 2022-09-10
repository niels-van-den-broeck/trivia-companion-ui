import QuizCreation from "./QuizCreation";
import QuizDetail from "./QuizDetail";
import QuizList from "./QuizList";

const routes = [
  {
    route: "/quiz",
    element: <QuizList />,
    requireAuth: true,
  },
  {
    route: "/quiz/new",
    element: <QuizCreation />,
    requireAuth: true,
  },
  {
    route: "/quiz/:id",
    element: <QuizDetail />,
    requireAuth: true,
  },
];

export default routes;
