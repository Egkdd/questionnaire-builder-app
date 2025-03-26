import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  QuestionnaireCatalog,
  QuestionnaireBuilder,
  InteractiveQuestionnaire,
} from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QuestionnaireCatalog />} />
        <Route path="/create/:id?" element={<QuestionnaireBuilder />} />
        <Route
          path="/questionnaire/:id"
          element={<InteractiveQuestionnaire />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
