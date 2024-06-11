import React, { useState } from 'react';
import List from './List';
import axios from 'axios';

const Home = () => {

    const [userField, setUserField] = useState({
        name: "",
        email: "",
        password: ""
    })

    const changeUserFieldHandler = (e) => {
        setUserField({
            ...userField,
            [e.target.name]: e.target.value
        });
        // console.log(userField);
    }

    const [loading,setLoading]=useState()

    const onSubmitChange = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post("http://127.0.0.1:8001/api/store", userField);
            console.log(result)
            setLoading(true);
        } catch (err) {
            console.log("err");
        }
    }

    if(loading){
        return <Home />
    }

    return(
        <div className='container'>
            <h2 className='w-100 d-flex justify-content-center p-3'>
                React JS Laravel 10 Rest API CRUD
            </h2>
            <div className='row'>
                <div className='col-md-4'>
                    <h3>
                        Add User Deatails
                    </h3>
                    <form>
                        <div className='mb-3 mt-3'>
                            <label className='form-label'>Full Name:</label>
                            <input type='text' className='form-control' id='name' name='name' placeholder='Enter Your Fullname' onChange={e => changeUserFieldHandler(e)}/>
                        </div>
                        <div className='mb-3 mt-3'>
                            <label className='form-label'>Email:</label>
                            <input type='email' className='form-control' id='email' name='email' placeholder='Enter Your Email' onChange={e => changeUserFieldHandler(e)}/>
                        </div>
                        <div className='mb-3 mt-3'>
                            <label className='form-label'>Password:</label>
                            <input type='text' className='form-control' id='password' name='password' placeholder='Enter Your Password' onChange={e => changeUserFieldHandler(e)}/>
                        </div>

                        <button type='submit' className='btn btn-primary' onClick={e => onSubmitChange(e)}> Add User </button>
                    </form>
                </div>
                <div className='col-md-8'>
                    <List />
                </div>
            </div>
        </div>
    )
}

export default Home;