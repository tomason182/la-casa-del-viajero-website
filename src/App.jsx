import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Home from "./pages/Home/Home.jsx";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <main>
        <Home />
      </main>
      <Footer />
    </>
  );
}

export default App;
