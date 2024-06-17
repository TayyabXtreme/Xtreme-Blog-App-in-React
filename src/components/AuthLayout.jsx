import React,{useEffect,useState} from 'react'
import { set } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'



const Protected = ({children,authentication=true}) => {
    const navigate=useNavigate()
    const [loader,setLoader]=useState(true)
    const authStatus=useSelector(state=>state.auth.status)

    useEffect(()=>{
        if(authentication && authStatus!==authentication){
            navigate('/login')
        }else if(!authentication && authStatus!==authentication){
            navigate('/')
        }

        setLoader(false)

    }   
    ,[authStatus,navigate,authentication])


  return loader ? <h1>Loading...</h1> : <>{children}</>
}

export default Protected