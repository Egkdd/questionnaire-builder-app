import { useState } from "react";

const QuestionInput = ({ addQuestion }) => {
  const [question, setQuestion] = useState("");
  const [questionType, setQuestionType] = useState("text");
  const [options, setOptions] = useState("");

  const handleAddQuestion = () => {
    addQuestion(question, questionType, options);
    setQuestion("");
    setOptions("");
  };

  return (
    <div>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Add a question"
      />
      <select
        onChange={(e) => setQuestionType(e.target.value)}
        value={questionType}
      >
        <option value="text">Text</option>
        <option value="single">Single choice</option>
        <option value="multiple">Multiple choices</option>
      </select>
      {questionType !== "text" && (
        <input
          type="text"
          value={options}
          onChange={(e) => setOptions(e.target.value)}
          placeholder="Options (separate by commas)"
        />
      )}
      <button type="button" onClick={handleAddQuestion}>
        Add a question
      </button>
    </div>
  );
};

export default QuestionInput;
