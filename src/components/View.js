import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";

const View = () => {

    const {id} = useParams();
    const[user, setUser] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUser();
    }, [id]);

    const fetchUser = async () => {
        try{
            const result = await axios.get('http://127.0.0.1:8001/api/users/'+id);
            // console.log(result.data.users);
            setUser(result.data.users)
        } catch(err) {
            console.log("error")
        }
    }

    const clickToBackHandler = () => {
        navigate('/');
    }

    return (

        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>User Details</h1>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Full Name</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="container d-flex justify-content-center">
                <button className="btn btn-primary" onClick={clickToBackHandler}>Back To Home</button>
            </div>
        </div>
    )
}

export default View;