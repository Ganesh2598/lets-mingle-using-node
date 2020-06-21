import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


function Home() {

    const [posts, setPosts] = useState(null);

    useEffect(()=> {
            fetch("http://localhost:5000/allpost",{
                    headers : { "Content-Type" : "application/json" ,"Authorization" : "Bearer "+localStorage.getItem("token")},
                    credentials : "include",
                    method : "get"
            }).then(res => res.json())
            .then(data =>{
                data = data.reverse();
                console.log(data)
                setPosts(data)
                console.log(posts)
            })
            .catch(err =>{
                console.log(err)
            })
    },[])


    return (
        <>
            {
                posts ? 
                <div className="home-card">
                    {
                        posts.map(post =>{
                            return (
                                <div className="card home-card-single">
                                    <span className="card-title">{post.userName.charAt(0).toUpperCase()+post.userName.slice(1)}</span>
                                    <div className="card-image">
                                        <img src={post.imageUrl} alt="Loading..."/>
                                    </div>
                                    <div className="card-content">
                                        <p>{post.caption}</p>
                                    </div>
                                    <div className="card-action">
                                        <Link to={"/userprofile/"+post.fk_userid}>View Profile</Link>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div> : 
                <h2>Loading</h2>
            }
        </>
        
            
    )
}

export default Home;
