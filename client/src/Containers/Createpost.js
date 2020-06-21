import React, {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";

function Createpost() {

    const history = useHistory();
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");

    useEffect(() =>{
        if (url){
        fetch("http://localhost:5000/createpost",{
                    headers : { "Content-Type" : "application/json" ,"Authorization" : "Bearer "+localStorage.getItem("token")},
                    credentials : "include",
                    method : "post",
                    body : JSON.stringify({
                        caption : description,
                        url : url

                    })
                }).then(response =>response.json())
                .then(data =>{
                    if (!data.error){
                        console.log(data)
                        history.push("/home")
                    }else{
                        console.log(data.error)
                    }
                })
            }
    },[url])

    const sumbitHandler = () =>{
        const formData = new FormData();
        formData.append("file",image);
        formData.append("upload_preset","letsmingle");
        formData.append("cloud_name","dvezzidsw");
        fetch("https://api.cloudinary.com/v1_1/dvezzidsw/image/upload",{
            method : "post",
            body : formData
        })
            .then(response =>response.json())
            .then(data =>{
                setUrl(data.url);
            })
        
    }

    return (
        <div className="createpost">
        <div className="card auth-card">
        <h2>Upload Post</h2>
        <input type="text" 
        placeholder="Description"
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
        />
        <div className="file-field input-field">
            <div className="btn">
                <span>Upload Image</span>
                <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text"/>
            </div>
        </div>
        <button className="waves-effect waves-light btn" onClick={sumbitHandler}> 
            Post
        </button>
    </div>
        </div>
    )
}

export default Createpost;
