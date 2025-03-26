import styles from "./style.module.scss";

const Pagination = ({
  currentPage,
  paginate,
  indexOfLastItem,
  questionnaires,
}) => (
  <div className={styles.pagination}>
    <button
      onClick={() => paginate(currentPage - 1)}
      disabled={currentPage === 1}
    >
      Prev
    </button>
    <span>Page {currentPage}</span>
    <button
      onClick={() => paginate(currentPage + 1)}
      disabled={indexOfLastItem >= questionnaires.length}
    >
      Next
    </button>
  </div>
);

export default Pagination;
