import React, { useState } from 'react'
import { useNavigate,Link, data } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button, Input, Logo} from "./index"
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import authService from '../appwrite/auth'

function Login() {

  const navigate = useNavigate()
  const [error,setError] = useState("")
  const {register,handleSubmit} = useForm()
  const dispatch = useDispatch()

  const login = async(data) => {
    setError("")
    try {
      const session = await authService.login(data)
      if(session){
        const userData = await authService.getUserAcc()
        if(userData) dispatch(authLogin(userData))
          navigate("/")
      }
    } catch (error) {
        setError(error)
    }
  }

  return (
    <div className='flex items-center justify-center w-full'>
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
          <span className='w-full inline-block max-w-[100px]'>
            <Logo width='100%'/>
          </span>
        </div>
        <h2 className='text-center text-2xl font-bold leading-tight'>
          Sign in to your Account
        </h2>
        <p className='mt-2 text-center text-base text-black/60'>
          Don&apos;t have any Account
          <Link className='font-medium text-primary transition-all duration-200 hover:underline'>
            Sign Up
          </Link>
        </p>
        {
          error && <p className='text-red-600 mt-8 text-center'>{error}</p>
        }
        <form onSubmit={handleSubmit(login)}
          className='mt-8'> 
          <div className="space-y-5">
            <Input 
              label="Email"
              placeholder="Enter your email"
              type="email"
              {
                ...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address"
                  }
                })
              }
            />
            <Input 
              label="Password"
              placeholder="Enter your password"
              type="password"
              { 
                ...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }
                })
              }
            />
          </div>
          <div className='mt-6'>
            <Button type="submit" className='w-full'>
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login