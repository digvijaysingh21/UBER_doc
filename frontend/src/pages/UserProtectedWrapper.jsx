import React , {useContext, useEffect}from 'react'
import { UserDataContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'

const UserProtectedWrapper = ({children}) => {
  // const {user} = useContext(UserDataContext);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // console.log(token);

  
  // if(!user.email){
  //   navigate('/login')
  // }

  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  },[token])
  
  return (
    <>
      {children}
    </>
  )
}

export default UserProtectedWrapper
