import style from "./style.module.scss";

const Question = ({ question, index, answers, handleAnswerChange }) => {
  return (
    <div className={style.questionContainer}>
      <p className={style.questionText}>{question.question}</p>

      {question.type === "text" && (
        <input
          type="text"
          value={answers[index] || ""}
          onChange={(e) => handleAnswerChange(index, e.target.value)}
          className={style.inputField}
          placeholder="Your response..."
        />
      )}

      {question.type === "single" && (
        <div className={style.radioContainer}>
          {question.options.map((opt, idx) => (
            <div key={idx} className={style.radioContainer}>
              <input
                type="radio"
                name={question.question}
                id={opt}
                value={opt}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                checked={answers[index] === opt}
                className={style.radioInput}
              />
              <label htmlFor={opt} className={style.label}>
                {opt}
              </label>
            </div>
          ))}
        </div>
      )}

      {question.type === "multiple" && (
        <div className={style.checkboxContainer}>
          {question.options.map((opt, idx) => (
            <div key={idx} className={style.checkboxContainer}>
              <input
                type="checkbox"
                name={question.question}
                id={opt}
                value={opt}
                onChange={(e) =>
                  handleAnswerChange(
                    index,
                    e.target.checked
                      ? [...(answers[index] || []), e.target.value]
                      : answers[index].filter((a) => a !== e.target.value)
                  )
                }
                checked={answers[index]?.includes(opt)}
                className={style.checkboxInput}
              />
              <label htmlFor={opt} className={style.label}>
                {opt}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Question;
