import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logOut } from '../../store/authSlice'

const LogOutBtn = () => {
    const dispatch = useDispatch()
    const logOutHandler = () => {
        authService.logout().then(()=>{
            dispatch(logOut())
        })
      
    }
  return (
    <button onClick={logOutHandler} className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
        Logout</button>
  )
}

export default LogOutBtn