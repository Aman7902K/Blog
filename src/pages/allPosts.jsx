import React from 'react'
import { useState,useEffect } from 'react'
import { Container,Post } from '../component'
import appwriteService from "../appwrite/config"

function allPosts() {
    const [post,setPosts] = useState([])
    useEffect(() => {
        appwriteService.getAllPost([]).then((post)=>{
            if(post){
                setPosts(post.documents)
            }
        })
    },[])
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
            {
                post.map(()=>(
                    <div className='p-2 w-1' key={post.$id}>
                        <Post post = {post}/>
                    </div>
                ))
            }
            </div>
        </Container>
    </div>
  )
}

export default allPosts