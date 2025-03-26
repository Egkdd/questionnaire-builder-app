import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase";
import QuestionnaireForm from "../../components/QuestionForm";
import styles from "./style.module.scss";

const InteractiveQuestionnaire = () => {
  const { id } = useParams();
  const [questionnaire, setQuestionnaire] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [submittedTimestamp, setSubmittedTimestamp] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    const fetchQuestionnaire = async () => {
      try {
        const docRef = doc(db, "questionnaires", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setQuestionnaire(docSnap.data());
          setStartTime(new Date());
          setLoading(false);
        } else {
          setError("Questionnaire not found.");
          setLoading(false);
        }
      } catch (e) {
        setError("An error occurred while fetching the questionnaire.");
        setLoading(false);
      }
    };

    fetchQuestionnaire();
  }, [id]);

  const handleAnswerChange = (index, answer) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);

    setIsSubmitDisabled(newAnswers.some((ans) => !ans));
  };

  const handleSubmit = async () => {
    try {
      const docRef = doc(db, "questionnaires", id);
      await updateDoc(docRef, {
        completions: (questionnaire.completions || 0) + 1,
      });

      const answersObj = questionnaire.questions.reduce(
        (acc, { question }, index) => ({
          ...acc,
          [question]: answers[index],
        }),
        {}
      );

      const timestamp = new Date();
      await addDoc(collection(db, "responses"), {
        questionnaireId: id,
        answers: answersObj,
        timestamp,
      });

      setSubmittedTimestamp(timestamp);

      const timeTaken = Math.floor((timestamp - startTime) / 1000);
      const minutes = Math.floor(timeTaken / 60);
      const seconds = timeTaken % 60;
      setElapsedTime(`${minutes}m ${seconds}s`);

      alert("The questionnaire is filled out and the answers are saved!");
    } catch (error) {
      setError("Error saving answers.");
    }
  };

  if (loading) return <div>Завантаження...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <QuestionnaireForm
        questionnaire={questionnaire}
        answers={answers}
        handleAnswerChange={handleAnswerChange}
      />
      <button
        className={styles.submitButton}
        onClick={handleSubmit}
        disabled={isSubmitDisabled}
      >
        Submit
      </button>

      {submittedTimestamp && (
        <div className={styles.answers}>
          <h3>Your Answers:</h3>
          <ul>
            {questionnaire.questions.map((q, index) => (
              <li key={index}>
                <strong>{q.question}</strong>: {answers[index] + " "}
              </li>
            ))}
          </ul>
          <p>Time taken: {elapsedTime}</p>
          <p>Submitted at: {submittedTimestamp.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default InteractiveQuestionnaire;
