import logo from './logo.svg';
import {BrowserRouter, Routes , Route} from "react-router-dom";
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import AddEdit from './pages/AddEdit';

function App() {
  return (
    <BrowserRouter>
      <div  className="container ">
        <ToastContainer position='top-center'/>
        <Routes>
          <Route  path="/" element={<Home />} />
          <Route  path="/addContact" element={<AddEdit />} />
          <Route  path="/update/:id" element={<AddEdit />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

