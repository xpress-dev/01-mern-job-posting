import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import LoginPage from "./pages/LoginPage"; // Import LoginPage
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import the toast styles

const App = () => {
  return (
    <main>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-job" element={<CreatePage />} />
        <Route path="/login" element={<LoginPage />} />{" "}
        {/* Add route for LoginPage */}
      </Routes>

      {/* ToastContainer to display toasts globally */}
      <ToastContainer position="top-center" autoClose={3000} />
    </main>
  );
};

export default App;
