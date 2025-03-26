import Question from "../QuestionForm/Question";
import style from "./style.module.scss";

const QuestionnaireForm = ({ questionnaire, answers, handleAnswerChange }) => {
  return (
    <div className={style.formContainer}>
      <h2 className={style.formTitle}>{questionnaire.name}</h2>
      <p className={style.formDescription}>{questionnaire.description}</p>
      {questionnaire.questions.map((q, index) => (
        <Question
          key={index}
          question={q}
          index={index}
          answers={answers}
          handleAnswerChange={handleAnswerChange}
        />
      ))}
    </div>
  );
};

export default QuestionnaireForm;
