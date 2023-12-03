import React, { createContext } from 'react';
import { format } from "date-fns";
import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import useWindowSize from '../hooks/useWindowSize';
import useAxiosFetch from '../hooks/useAxiosFetch';
import api from "../api/posts";

   const DataContext = createContext({})

export const DataProvider = ({ children }) => {
    const [posts,setPosts]=useState([])
    const [search,setSearch]=useState('')
    const [searchResults,setSearchResults]=useState([])
    const [postTitle,setPostTitle]=useState('')
    const [postBody,setPostBody]=useState('')
    const [editTitle,setEditTitle]=useState('')
    const [editBody,setEditBody]=useState('')
    const navigate = useNavigate()
    const {width}=useWindowSize()
    const {data,fetchError,isLoading}=useAxiosFetch("http://localhost:3500/posts")
  
          useEffect(()=>{
            setPosts(data);
          },[data])
  
         useEffect(()=>{
        const filteredResults=posts.filter((post)=>(
          ((post.title).toLowerCase().includes(search.toLowerCase()))
        || ((post.body).toLowerCase().includes(search.toLowerCase()))
          ))
          setSearchResults(filteredResults.reverse());
  
      },[posts,search])
      const handleSubmit=async(e)=>{
        e.preventDefault()
        const id=posts.length ? posts[posts.length-1].id+1 :1;
        const datetime=format(new Date(),"MMMM dd, yyyy pp")
        const newPost={id,title:postTitle,datetime,body: postBody}
        try{
        const response= await api.post("/posts",newPost)
        const allPosts=[...posts,response.data]
        setPosts(allPosts)
        setPostBody('')
        setPostTitle('')
        navigate('/')
      }
      catch(err){
        console.log(`Error:${err.message}`);
      } 
      }
     
    
      const handleDelete=async(id)=>{
        try{
        await api.delete(`/posts/${id}`)
        const deletePost=posts.filter(post=>post.id!==id);
        setPosts(deletePost)
        navigate("/")
      }
      catch(err){
        console.log(`Error:${err.message}`);
      } 
      }
  
  
      const handleEdit=async(id)=>{
        const datetime=format(new Date(),"MMMM dd, yyyy pp")
        const updatePost={id,title:editTitle,datetime,body: editBody}
        try{
          const response=await api.put(`/posts/${id}`,updatePost)
          setPosts(posts.map(post=>post.id===id ? {...response.data} : post))
          setEditBody('')
          setEditTitle('')
          navigate('/')
        }
        catch(err){
          console.log(`Error:${err.message}`);
        }
  
      }
return(
    <DataContext.Provider value={{
        width, search, setSearch,searchResults, isLoading, fetchError,
        handleSubmit, postTitle, setPostTitle, postBody, setPostBody,
        posts, handleDelete, setEditBody, setEditTitle,
        editBody, editTitle, handleEdit
    }}>
        {children}
    </DataContext.Provider>
    )
}



export default DataContext;
