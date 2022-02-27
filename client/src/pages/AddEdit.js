import React, {useState, useEffect} from 'react';
import {useNavigate, useParams, Link} from "react-router-dom";
import axios, { Axios } from 'axios';
import { toast } from 'react-toastify';
const initialState = {
    name: "",
    email: "",
    mobile_no: "",
}
const AddEdit = () => {
    const [state, setstate] = useState(initialState);

    const {name,email,mobile_no} = state;

    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(() => {
       axios.get(`http://localhost:5000/api/get/${id}`).then((resp) => setstate({...resp.data[0]}));
    }, [id]);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !mobile_no ) {
            toast.error("please provide value in each input field")
        }
        else{
            if (!id) {
                axios.post("http://localhost:5000/api/post",{
                    name,
                    email,
                    mobile_no
                }).then(() =>{
                    setstate({name: "", email: "", mobile_no:""})
                }).catch((err) => toast.error(err.response.data));
                toast.success("contact added successfully");
            }
            else{
                axios.put(`http://localhost:5000/api/put/${id}`,{
                    name,
                    email,
                    mobile_no
                }).then(() =>{
                    setstate({name: "", email: "", mobile_no:""})
                }).catch((err) => toast.error(err.response.data));
                toast.success("contact updated successfully");
            }
            setTimeout(() => navigate("/")   , 1000);   
        }
    };
    const handleInputChange = (e) => {
        //  const {name, value} = e.target;
        setstate({...state, [e.target.name]: e.target.value });
        console.log(state);
    }


  return (
    <div style={{marginTop:"100px"}}>
            <form action="" onSubmit={handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <input type="text" className='form-control' name='name' id='name' value={name || ""} onChange={handleInputChange}/>
                    <label htmlFor="email">Email</label>
                    <input type="text" className='form-control' name='email' id='email' value={email || ""}  onChange={handleInputChange} />
                    <label htmlFor="mobile_no">Mobile number</label>
                    <input type="text" className='form-control mb-2' name='mobile_no' id='mobile_no' value={mobile_no || ""}  onChange={handleInputChange} />

                       <input type="submit" className='btn btn-success' value={id ? "Upadate" :"save"} />
                    <Link to="/">
                       <input type="button" className='btn btn-dark' value="Go back" />
                    </Link>
            </form>
    </div>
  )
}


export default AddEdit;