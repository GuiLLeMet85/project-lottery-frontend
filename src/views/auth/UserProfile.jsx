import React, {useContext, useEffect, useState} from "react";
import { useNavigate} from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import toast from 'react-hot-toast';
import axios from 'axios';

export default function UserProfile() {
    const storedToken = localStorage.getItem('authToken');
    const navigate = useNavigate();
    const { user, logOutUser } = useContext(AuthContext);
    const [userData, setUserData] = useState({
        username: user.username,
        email: user.email
      })
 
    useEffect(() => {
        const getDataUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/user/me`, { headers: { Authorization: `Bearer ${storedToken}` } })
                // console.log(response)
                setUserData(response.data.data)
            }
            catch (error) {
                console.error(error)
            }
        }
    getDataUser();
    }, [])
    

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/user/edit`, userData, { headers: { Authorization: `Bearer ${storedToken}` } });
      toast.success('User edited successfully. Please log in again.');
      logOutUser();
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  }

  const handleChange = (e) => {
    setUserData(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

    return (
        <div>
             <h1>Profile page</h1>
       
                <div className="user-profile">
                    <h2><span>User name:</span> {userData.username} </h2>
                    <form onSubmit={handleSubmit}>
                        <input required type="text" name="username" value={userData.username} onChange={handleChange} />
                        <input required type="email" name="email" value={userData.email} onChange={handleChange} />
                        <button type="submit">Save changes and log out</button>
                    </form>

                </div>
       
        </div>
    )
}