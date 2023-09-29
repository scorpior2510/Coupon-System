import "./App.css";

import Header from "./Components/Layout/Header/Header";
import Menu from "./Components/Layout/Menu/Menu";
import Main from "./Components/Layout/Main/Main";
import Footer from "./Components/Layout/Footer/Footer";

import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { selectIsDarkMode } from "./Redux/slices/lightingSlice";

function App() {
  
  const theme = useSelector(selectIsDarkMode) ? "dark" : "light";

  return (
    <div className={`App ${theme}`}>
      <Header />
      <Menu />
      <Main />
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
