import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase";
import QuestionInput from "../../components/QuestionInput";
import QuestionItem from "../../components/QuestionItem";
import style from "./style.module.scss";

const QuestionnaireBuilder = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchQuestionnaire = async () => {
        const docRef = doc(db, "questionnaires", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name);
          setDescription(data.description);
          setQuestions(data.questions);
        } else {
          console.log("Questionnaire not found");
        }
      };
      fetchQuestionnaire();
    }
  }, [id]);

  const addQuestion = (question, questionType, options) => {
    if (!question.trim()) {
      alert("Question cannot be empty");
      return;
    }
    if (
      (questionType === "single" || questionType === "multiple") &&
      !options.trim()
    ) {
      alert("Options cannot be empty for single or multiple choice questions");
      return;
    }

    const newQuestion = {
      question,
      type: questionType,
      options: options.split(",").map((opt) => opt.trim()),
      correctAnswers:
        questionType === "single" ? [options.split(",")[0].trim()] : [],
    };

    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (questions.length === 0) {
      alert("You must add at least one question to the questionnaire");
      return;
    }

    try {
      if (id) {
        const docRef = doc(db, "questionnaires", id);
        await updateDoc(docRef, { name, description, questions });
        alert("The questionnaire has been updated!");
      } else {
        await addDoc(collection(db, "questionnaires"), {
          name,
          description,
          questions,
          completions: 0,
        });
        alert("The questionnaire has been created!");
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving document: ", error);
    }
  };

  return (
    <div className={style.questionnaireBuilder}>
      <h2>{id ? "Edit the questionnaire" : "Create the questionnaire"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name of the questionnaire"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description of the questionnaire"
          required
        />
        <QuestionInput addQuestion={addQuestion} />
        <ul className={style.questionList}>
          {questions.map((q, index) => (
            <QuestionItem
              key={index}
              question={q}
              index={index}
              removeQuestion={removeQuestion}
            />
          ))}
        </ul>
        <button type="submit">
          {id ? "Edit the questionnaire" : "Create the questionnaire"}
        </button>
      </form>
    </div>
  );
};

export default QuestionnaireBuilder;
