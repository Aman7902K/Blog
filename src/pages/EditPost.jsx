import React from 'react'
import { useState,useEffect } from 'react'
import { Container,Post_form } from '../component'
import appwriteService from "../appwrite/config"
import { useNavigate, useParams } from 'react-router-dom'


function EditPost() {

    const [post,setPosts] = useState([])
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        if(slug){
            appwriteService.getPost(slug).then(()=>{
                if(post){
                    setPosts(post)
                }

            })
        }
        else{
            navigate("/")
        }
    },[slug,navigate])

  return post ? 
    <div className='py-8'>
        <Container>
            <Post_form post={post} />
        </Container>
    </div>:
    null
}

export default EditPost