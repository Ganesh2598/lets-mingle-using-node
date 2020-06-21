import React,{ useContext, useState, useEffect} from "react";
import { UserContext } from "../App"


function Profile() {
    const [data, setData] = useState([]);
    const { state } = useContext(UserContext);

    useEffect(()=> {
        if(data) {
            fetch("http://localhost:5000/mypost",{
                    headers : { "Content-Type" : "application/json" ,"Authorization" : "Bearer "+localStorage.getItem("token")},
                    credentials : "include",
                    method : "get"
            }).then(res => res.json())
            .then(data =>{
                console.log(data)
                setData(data)
            })
            .catch(err =>{
                console.log(err)
            })
        }
    },[])


    return (
        <div>
            <div className="profile">
                <div>
                    <img src={state?state.imageUrl:"loading"} className="profilepic"/>
                </div>
                <div>
                    <h3>{state?state.name:"loding"}</h3>
                    <div className="followers">
                        <h5>{data.length} Posts</h5>
                        
                    </div>
                </div>
            </div>
            {
                data ?
                (
                    <div className="photos">
                    {
                        data.map(item => {
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

export default Profile;
