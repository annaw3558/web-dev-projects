import {useContext, useEffect, useState} from "react";
import {useLocation} from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import { Context } from "../../context/Context"

import './singlePost.css';

//todo - go through above statements and make them have spaces
// {package} => { package }

export default function SinglePost() {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] =useState({});
    const imgPath = "http://localhost:8080/img/";
    const { user } = useContext(Context);

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() =>{
        const getPost = async () => {
            const res = await axios.get("/posts/" + path);
            console.log(res);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        };
        getPost()
    }, [path]);

    const handleDelete = async () => {
        try {
            await axios.delete("/posts/" + path, {data: {username: user.username}});
            window.location.replace("/");
        } catch(err) { }
    }

    const handleUpdate = async () => {
        try {
            await axios.put("/posts/" + path, {data: {
                username: user.username,
                title,
                desc,
                }
            });
            setUpdateMode(false);
            window.location.reload();
        } catch(err) { }
    }

  return (
    <div className='singlePost'>
        <div className='singlePostWrapper'>
            {post.photo &&  (
                <img 
                    src={imgPath + post.photo}
                    alt='Post' 
                    className="singlePostImg" 
                />
            )}
            { updateMode ? 
                <input 
                    type="text" 
                    value={title} 
                    className="singlePostTitleInput"
                    onChange={(e)=>setTitle(e.target.value)}
                    autoFocus
                /> 
            : (
                <h1 className="singlePostTitle">
                    {title}
                    
                    <div className="singlePostEdit">
                        <i className='singlePostIcon far fa-edit' onClick={()=> setUpdateMode(true)}></i>
                        <i className='singlePostIcon far fa-trash-alt' onClick={handleDelete}></i>
                    </div>
                </h1>
            )}
            <div className="singlePostInfo">
                <span className='singlePostAuthor'>
                    Author:
                    <Link to={`/?user=${post.username}`} className='link'>
                        <b>{post.username}</b>
                    </Link> 
                </span>
                <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
            </div>
            { updateMode ?
                <textarea 
                    className='singlePostDescriptionInput'
                    value={desc}
                    onChange={(e)=>setDesc(e.target.value)}/>
                : (
                <p className='singlePostDescription'>
                {desc}
                </p>
            )}
            {updateMode && 
                (<button 
                    className="singlePostButton"
                    onClick={handleUpdate}
                >
                    Update
                </button>)
            }
            
        </div>
    </div>
  )
}
