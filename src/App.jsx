import { BrowserRouter,Routes,Route } from "react-router-dom" 
import * as pages from "./pages";
function App() {
  const {Home,Jobs,Assessments,Candidates}=pages;
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/jobs" element={<Jobs/>} />
          <Route path="/assessments" element={<Assessments/>} />
          <Route path="/candidates" element={<Candidates/>} />
        </Routes>  
      </BrowserRouter>
    </>
  )
}

export default App
