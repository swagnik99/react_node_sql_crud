import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import "./home.css";
import {toast} from "react-toastify";
import axios from "axios";

const Home = () => {
    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/get");
        setData(response.data);
    }
    useEffect(() => {
        loadData();
    }, []);

    const deleteContact = (id) => {
        if(window.confirm("are you sure you want to delete that contact ?")){
            axios.delete(`http://localhost:5000/api/remove/${id}`);
            toast.success("contact deleted successfully");
            setTimeout(() => loadData(), 500);
        }
    }
    
  return (
    <div className='container mt-4'>
        <Link to="/addContact">
          <button className="btn btn-danger">Add Contact</button>
        </Link>
        <table className='table'>
            <thead>
                <tr>
                <th scope="col">No.</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Contact</th>
                <th scope="col">Action </th>
                </tr>
            </thead>
            <tbody>
               {data.map((item, index) => {
                   return(
                       <tr key={item.id}>
                           <th scope='row'>{index+1}</th>
                           <td>{item.name}</td>
                           <td>{item.email}</td>
                           <td>{item.mobile_no}</td>
                           <td>
                               <Link to={`/update/${item.id}`}>
                                    <button className='btn btn-success'>Edit</button>
                               </Link>
                               <Link to={`/view/${item.id}`}>
                                    <button className='btn btn-primary'>view</button>
                               </Link>
                               <button className='btn btn-danger' onClick={() => deleteContact(item.id)}> Delete </button>
                           </td>
                       </tr>
                   )
               })}
            </tbody>
     </table>
    </div>
  )
}

export default Home ;