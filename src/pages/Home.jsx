import React from 'react'
import { useState,useEffect } from 'react'
import appwriteService from "../appwrite/config"
import { Container,Post } from '../component'

function Home() {

    const [post,setPosts] = useEffect([])

    useEffect(()=>{
        appwriteService.getPost().then(()=>{
            if(post){
                setPosts(post)
            }

        })
    },[])

    if(post === 0){
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='p-2 w-full'>
                            <h2 className='text-2xl font-bold hover:text-gray-500'>
                                No Posts Found Login to Continue
                            </h2>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

  return (
    <div> clas Home</div>
  )
}

export default Home