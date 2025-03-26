import style from "./style.module.scss";

const QuestionItem = ({ question, index, removeQuestion }) => {
  return (
    <li className={style.questionItem}>
      <div className={style.questionContent}>
        <p>
          {question.question} ({question.type})
        </p>
        {(question.type === "single" || question.type === "multiple") && (
          <ul>
            {question.options.map((opt, idx) => (
              <li key={idx}>{opt}</li>
            ))}
          </ul>
        )}
      </div>
      <button
        className={style.removeButton}
        type="button"
        onClick={() => removeQuestion(index)}
      >
        Remove
      </button>
    </li>
  );
};

export default QuestionItem;
