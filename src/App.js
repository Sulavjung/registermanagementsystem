import "./App.css";
import Nav from "./layoutComponent/mainNav";
import MainScreenDisp from "./layoutComponent/mainScreenDisp";
import { Helmet } from "react-helmet";
import img from "./assets/logo.png";
import ProductPage from "./product/productPage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Helmet>
        <meta property="og:image" content={img} />
      </Helmet>
      <div className="h-screen overflow-hidden">
        <Nav />
        <MainScreenDisp />
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/product" element={<ProductPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
