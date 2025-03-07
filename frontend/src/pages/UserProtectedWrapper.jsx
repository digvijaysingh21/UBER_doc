import React , {useContext, useEffect, useState}from 'react'
import { UserDataContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import { locals } from '../../../Backend/app';

const UserProtectedWrapper = ({children}) => {
  // const {user} = useContext(UserDataContext);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const {user, setUser} = useContext(UserDataContext)
  const [isLoading, setLoading] = useState(true);

  // console.log(token);

  
  // if(!user.email){
  //   navigate('/login')
  // }

  useEffect(()=>{
    if(!token){
      navigate('/login')
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    }).then(response =>{
      if(response.status === 200){
        setUser(response.data.user)
        setLoading(false);
      }
    }).catch(err=>{
      console.log(err);
      localStorage.removeItem('token')
      navigate('/login')
    })
  },[token])

  if(isLoading){
    return (
      <div>Loadng...</div>

    )
  }
  
  return (
    <>
      {children}
    </>
  )
}

export default UserProtectedWrapper
