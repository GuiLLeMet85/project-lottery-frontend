import React, {useEffect, useState} from "react";
import { useParams, useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function UserProfile() {

    const [userData, setUserData] = useState(null);
    const storedToken = localStorage.getItem('authToken');
    const {id} = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        const getDataUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/users/`)
                // console.log(response)
                setUserData(response.data.data)
            }
            catch (error) {
                console.error(error)
            }
        }
    getDataUser();
    }, [id])
    

    return (
        <div>
             <h1>Profile page</h1>

            {userData && userData.map(userData => {
                return <div className="profile-pict" key={userData._id}>
                    <h2>Name: {userData.username}</h2>
                </div>

             } )}

        </div>
    )

}