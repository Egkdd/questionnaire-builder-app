import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import QuizCard from "../../components/QuizCard";
import Pagination from "../../components/Pagination";
import styles from "./style.module.scss";

const QuestionnaireCatalog = () => {
  const [questionnaires, setQuestionnaires] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [activeMenu, setActiveMenu] = useState(null);
  const [sortBy, setSortBy] = useState("name");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestionnaires = async () => {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "questionnaires"));
      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQuestionnaires(docs);
      setLoading(false);
    };

    fetchQuestionnaires();
  }, []);

  const sortedQuestionnaires = [...questionnaires].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "questions":
        return a.questions.length - b.questions.length;
      case "completions":
        return a.completions - b.completions;
        return 0;
    }
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedQuestionnaires.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = async (id) => {
    try {
      const docRef = doc(db, "questionnaires", id);
      await deleteDoc(docRef);
      setQuestionnaires(questionnaires.filter((q) => q.id !== id));
    } catch (error) {
      console.error("Error deleting document: ", error);
      alert(
        "An error occurred while deleting the questionnaire. Please try again."
      );
    }
  };

  const toggleMenu = (id) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  return (
    <div>
      <div className={styles.catalogContainer}>
        <h2>Quiz Catalog</h2>
        <button
          className={styles.createButton}
          onClick={() => navigate("/create")}
        >
          Create New
        </button>
        <div className={styles.sortMenu}>
          <label>Sort by: </label>
          <select
            className={styles.sortSelect}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="questions">Number of Questions</option>
            <option value="completions">Completions</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className={styles.loadingSpinner}>Loading...</div>
      ) : (
        <div className={styles.questionnaireList}>
          {currentItems.map((questionnaire) => (
            <QuizCard
              key={questionnaire.id}
              questionnaire={questionnaire}
              toggleMenu={toggleMenu}
              activeMenu={activeMenu}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {currentItems.length > 0 && (
        <Pagination
          currentPage={currentPage}
          paginate={paginate}
          indexOfLastItem={indexOfLastItem}
          questionnaires={questionnaires}
        />
      )}
    </div>
  );
};

export default QuestionnaireCatalog;
