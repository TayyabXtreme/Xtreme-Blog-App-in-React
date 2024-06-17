import { useState } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import { useEffect } from 'react'
import { login ,logOut} from './store/authSlice'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {

  const [loading,setLoading] = useState(true)
  const dispatch=useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logOut())
      }

    })
    .finally(()=>setLoading(false))
  },[])

  
  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
     <div className='w-full block'>
      <Header/>
      <main>
        Todo Outlet
        {/* <Outlet/> */}
      </main>
      <Footer/>
     </div>
    </div>
  ):<h1>null</h1>
}

export default App
