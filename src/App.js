import { BrowserRouter, Routes, Route } from "react-router-dom";
import AnimeItem from "./Components/AnimeItem";
import Gallery from "./Components/Gallery";
import Homepage from "./Components/Homepage";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import NewPost from "./Components/Post";
import Footer from "./Components/Footer";
function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/home/" element={<Homepage />} />
          <Route path="/anime/:id" element={<AnimeItem />} />
          <Route path="/character/:id" element={<Gallery />} />
          <Route path="/post" element={<NewPost />} />
        </Routes>
      </BrowserRouter>
      {/* <Footer/> */}
    </>
  );
}

export default App;

