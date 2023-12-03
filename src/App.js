import About from "./components/About";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import Missing from "./components/Missing";
import Nav from "./components/Nav";
import NewPost from "./components/NewPost";
import PostPage from "./components/PostPage";
import { Route, Routes } from "react-router-dom";
import EditPost from "./components/EditPost";
import { DataProvider } from "./components/context/DataContext";

function App() {


  return (
    <>

      <div className="App">
        <DataProvider>
          <Header title="Social Media" />
          <Nav/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="post">
              <Route index element={<NewPost/>} />
              <Route path=":id" element={<PostPage/>} />
            </Route>
            <Route path="/edit/:id" element={<EditPost/>}
            />
            <Route path="about" element={<About />} />
            <Route path="*" element={<Missing />} />
          </Routes>
          <Footer />
        </DataProvider>
      </div>

    </>
  );
}

export default App;
