import React, { useEffect, useState } from "react";
import {  useNavigate,useParams } from "react-router";
import axios from "axios";

const Edit = () => {

    const {id} = useParams()
    const navigate = useNavigate();

    const [userField, setUserField] = useState({
        name: "",
        email: "",
        password: ""
    });

    useEffect(()=>{
        fetchUser();
    },[id])

    const fetchUser = async () => {
        try{
            const result = await axios.get('http://127.0.0.1:8001/api/users/'+id);
            // console.log(result.data.users);
            setUserField(result.data.users)
        } catch(err) {
            console.log("error")
        }
    }

    const changeUserFieldHandler = (e) => {
        setUserField({
            ...userField,
            [e.target.name]: e.target.value
        });
        console.log(userField);
    }

    const onSubmitChange = async (e) => {
        e.preventDefault();
        try {
            await axios.put('http://127.0.0.1:8001/api/user/update/' + id, userField);
            navigate('/');
        } catch (err) {
            console.log("error");
        }
    }

    
    const clickToBackHandler = () => {
        navigate('/');
    }

    return (
        <div className="container">
            <h1>Edit form</h1>
            <form>
                <div className='mb-3 mt-3'>
                    <label className='form-label'>ID:</label>
                    <input type='text' className='form-control' id='id' name='id'value={id} disabled/>
                </div>
                <div className='mb-3 mt-3'>
                    <label className='form-label'>Full Name:</label>
                    <input type='text' className='form-control' id='name' name='name' placeholder='Enter Your Fullname' value={userField.name} onChange={e => changeUserFieldHandler(e)}/>
                </div>
                <div className='mb-3 mt-3'>
                    <label className='form-label'>Email:</label>
                    <input type='email' className='form-control' id='email' name='email' placeholder='Enter Your Email' value={userField.email} onChange={e => changeUserFieldHandler(e)}/>
                </div>
                <div className='mb-3 mt-3'>
                    <label className='form-label'>Password:</label>
                    <input type='password' className='form-control' id='password' name='password' value={userField.password} onChange={e => changeUserFieldHandler(e)}/>
                </div>

                <button type='submit' className='btn btn-primary' onClick={e=>onSubmitChange(e)}> Update User </button>
            </form>
            <div className="container d-flex justify-content-center mt-3">
            <button className="btn btn-primary" onClick={clickToBackHandler}>Back To Home</button>
            </div>
        </div>
    )
}

export default Edit;