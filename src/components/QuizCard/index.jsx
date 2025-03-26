import { useNavigate } from "react-router-dom";
import style from "./style.module.scss";

const QuizCard = ({ questionnaire, toggleMenu, activeMenu, handleDelete }) => {
  const navigate = useNavigate();

  return (
    <div
      className={style.quizCard}
      onClick={() => navigate(`/questionnaire/${questionnaire.id}`)}
    >
      <h3>{questionnaire.name}</h3>
      <p>{questionnaire.description}</p>
      <p className={style.questionsCount}>
        Questions: {questionnaire.questions.length}
      </p>

      <div className={style.completionText}>
        Completed: {questionnaire.completions}
      </div>

      <button
        className={style.menuButton}
        onClick={(e) => {
          e.stopPropagation();
          toggleMenu(questionnaire.id);
        }}
      >
        &#x22EE;
      </button>

      {activeMenu === questionnaire.id && (
        <div className={style.menu}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/create/${questionnaire.id}`);
            }}
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(questionnaire.id);
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizCard;
