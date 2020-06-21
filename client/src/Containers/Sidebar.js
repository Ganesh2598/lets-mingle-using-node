import React, {  useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom"

function Sidebar() {

    const history = useHistory();
    const [user, setUser] = useState(null);

    useEffect(() =>{
        fetch("http://localhost:5000/userinfo",{
                    headers : { "Content-Type" : "application/json" ,"Authorization" : "Bearer "+localStorage.getItem("token")},
                    credentials : "include",
                    method : "get"
            }).then(res => res.json())
            .then(data =>{
                console.log(data)
                setUser(data)
            })
            .catch(err =>{
                console.log(err)
            })
    },[])

    return (
        <>
        {
            user ?
            (
                <div className="card side-bar">
                    <span className="card-title">My Profile</span>
                    <div className="card-image">
                        <img src={user.imageUrl} className="side-bar-image"/>
                    </div>  
                    <div className="card-content">
                        <span className="card-title">{user.name}</span>
                    </div>
                    <div className="card-action">
                        <Link to={"/userprofile/"+user.userid}>View Profile</Link>
                    </div>
                </div>
            ):(
                <h2>Loading...</h2>
            )
        }
        
        </>
    )
}

export default Sidebar;