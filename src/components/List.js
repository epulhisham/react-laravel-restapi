import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const List = () => {

    const [userData, setUserData] = useState([]);
   

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {

        try {
            const result = await axios("http://127.0.0.1:8001/api/users");
            // console.log(result.data);
            setUserData(result.data.results);
        } catch(err) {
            console.log('error');
        }
    }

    const handleDelete = async(id) => {
        // console.log(id);
        await axios.delete("http://127.0.0.1:8001/api/user/delete/"+id);

        const newUserData = userData.filter((item) => {
            return (
                item.id !==id
            )
        })
        setUserData(newUserData);
    }

    return(
        <div className='container'>
            <h3>User Deatails</h3>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userData.map((user, i) => {
                            return (
                                <tr key={i}>
                                    <td>{ i + 1}</td>
                                    <td>{ user.name}</td>
                                    <td>{ user.email}</td>
                                    <td>
                                        <NavLink to={`/view/${user.id}`} className={'btn btn-dark mx-2'}>View</NavLink>
                                        <NavLink  to={`/edit/${user.id}`} className={'btn btn-warning mx-2'}>Edit</NavLink>
                                        <NavLink onClick={() => handleDelete(user.id)} className={'btn btn-danger mx-2'}>Delete</NavLink>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default List;