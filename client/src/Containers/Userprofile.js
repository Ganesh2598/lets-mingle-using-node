import React,{ useContext, useState, useEffect} from "react";
import { useParams } from "react-router-dom";


function Userprofile() {
    const [user, setUser] = useState(null);
    const [post, setPost] = useState([]);
   
    const id = useParams();
    useEffect(()=> {
        if(user) {
            fetch(`http://localhost:5000/userpost/${user.userid}`,{
                    headers : { "Content-Type" : "application/json" ,"Authorization" : "Bearer "+localStorage.getItem("token")},
                    credentials : "include",
                    method : "get"
            }).then(res => res.json())
            .then(data =>{
                console.log(data)
                setPost(data)
            })
            .catch(err =>{
                console.log(err)
            })
        }
    },[user])

    useEffect(()=> {
            fetch(`http://localhost:5000/userinfo/${id.id}`,{
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
        <div>
            <div className="profile">
                <div>
                    <img src={user?user.imageUrl:"loading"} className="profilepic"/>
                </div>
                <div>
                    <h3>{user?user.name:"loding"}</h3>
                    <div className="followers">
                        <h5>{post?post.length:"Loading..."} Post</h5>
                    </div>
                </div>
            </div>
            {
                post ?
                (
                    <div className="photos">
                    {
                        post.map(item => {
                            return (
                                <img key={item.fk_userid} src={item.imageUrl} />
                            )
                        })
                    }
                    </div>
                ) :
                (
                    <h5>No post Available Yet</h5>
                )
            }
           
        </div>
    )
}

export default Userprofile;
