import {useEffect, useState} from "react";
import {useLocation} from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";

import './singlePost.css';

//todo - go through above statements and make them have spaces
// {package} => { package }

export default function SinglePost() {
    const location = useLocation();
    const path = location.pathname.split("/")[2];

    const [post, setPost] =useState({});

    useEffect(() =>{
        const getPost = async () => {
            const res = axios.get("/posts/"+ path);
            setPost(res.data);
        };
        getPost()
    }, [path]);

  return (
    <div className='singlePost'>
        <div className='singlePostWrapper'>
            {post.photo &&  (
                <img 
                    src={post.photo}
                    alt='Post' 
                    className="singlePostImg" 
                />
            )}
            <h1 className="singlePostTitle">
                {post.title}
                <div className="singlePostEdit">
                    <i className='singlePostIcon far fa-edit'></i>
                    <i className='singlePostIcon far fa-trash-alt'></i>
                </div>
            </h1>
            <div className="singlePostInfo">
                <span className='singlePostAuthor'>
                    Author:
                    <Link to={`/?user=${post.username}`} className='link'>
                        <b>{post.username}</b>
                    </Link> 
                </span>
                <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
            </div>
            <p className='singlePostDescription'>
                {post.desc}
            </p>
        </div>
    </div>
  )
}