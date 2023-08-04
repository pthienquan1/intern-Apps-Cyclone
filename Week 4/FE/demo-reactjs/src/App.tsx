import { BrowserRouter, Routes, Route } from "react-router-dom";
import Department from "./pages/Department";
import Navbar from "./components/navbar/Navbar";

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/departments" element={<Department />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
