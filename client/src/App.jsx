import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Contact from "./pages/Contact/Contact";
import Travel from "./pages/Travel/Travel";
import TravelItem from "./pages/TravelItem/TravelItem";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Blog from "./pages/Blog/Blog";
import BlogItem from "./pages/BlogItem/BlogItem";
import MyBlog from "./pages/MyBlog/MyBlog";
import { useContext } from "react";
import { AuthContext } from "./contexts/authContext/AuthContext";

function App() {
  // const [selectedFile, setSelectedFile] = useState();
  // const [isFilePicked, setIsFilePicked] = useState(false);
  // const [data, setData] = useState();

  // const changeHandler = (event) => {
  //   setSelectedFile(event.target.files[0]);
  //   // setIsSelected(true);
  // };

  // console.log(selectedFile);
  // const handleSubmission = async () => {
  //   const config = {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   };
  //   const res = await axios.post(
  //     `http://localhost:5000/register`,
  //     {
  //       photo: selectedFile,
  //     },
  //     config
  //   );
  // };

  // useEffect(() => {
  //   const getData = async () => {
  //     const res = await axios.get(`http://localhost:5000/getdata`);
  //     setData(res.data);
  //   };
  //   getData();
  // }, []);

  // console.log("data", data?.data[0].img);
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <div className="main">
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/travel" element={<Travel />} />
          <Route path="/travel/:id" element={<TravelItem />} />
          <Route path="/blog/:idBlog" element={<BlogItem />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          {user?.id && <Route path="/myblog" element={<MyBlog />} />}
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
