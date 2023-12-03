import React, { useContext } from 'react';
import { useParams,Link } from 'react-router-dom';
import DataContext from './context/DataContext';

const PostPage = () => {
  const{posts,handleDelete}=useContext(DataContext);
  const {id}=useParams()
  const post = posts.find(post=> (post.id).toString()===id)
  return (
    <main className='PostPage'>
      <article className='post'>
      {
        post && 
        <>
        <h2>{post.title}</h2>
        <p className='postDate'>{post.datetime}</p>
        <p className='postBody'>{post.body}</p>
        <Link to={`/edit/${post.id}`} style={{margin:"4px"}}><button className='editbutton'>Edit Post</button></Link>
        <button className='deletebutton' onClick={()=>handleDelete(post.id)}>Delete Post</button>
        </>
      }
      {
        !post &&
        <>
        <h2>Page Not Found</h2>
      <p>Well, that's Disappointing.</p>
      <Link to='/'><p>Visit Our Homepage</p></Link>
      </>
      }
      </article>

    </main>
  );
}

export default PostPage;
