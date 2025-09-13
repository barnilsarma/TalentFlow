import { BrowserRouter,Routes,Route } from "react-router-dom" 
import * as pages from "./pages";
import server from "./server";
server();
function App() {
  const {Home,Jobs,Assessments,Candidates,JobDescription}=pages;
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/jobs" element={<Jobs/>} />
          <Route path="/jobs/:id" element={<JobDescription/>} />
          <Route path="/assessments" element={<Assessments/>} />
          <Route path="/candidates" element={<Candidates/>} />
        </Routes>  
      </BrowserRouter>
    </>
  )
}

export default App
