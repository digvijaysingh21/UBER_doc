import React, {useState} from 'react'
import { Link } from 'react-router-dom'

const UserLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userData, setUserData] = useState({});

    const submitHandler = (e) => {
        e.preventDefault();
        setUserData({
            email:email,
            password: password
        })
        // console.log(userData)
        // console.log(email, password);
        setEmail("");
        setPassword("");
    }
  return (
    <div className="p-7 h-screen flex flex-col justify-between"> 
    <div>
        <img className='w-16 mb-10 rounded-[2rem]' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1JPvedCBmNG39bU4Zvq1PJTRRl6Nc8OOimA&s"/> 
        <form onSubmit={submitHandler}>
        <h3 className="text-lg font-medium mb-2">What's your email</h3>
        <input 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' 
            type="email" 
            placeholder='email@example.com'
        />
        <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
        <input 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' 
            type="password" 
            placeholder='password'/>
        <button
            className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-base' 
        >Login</button>
         <p className='text-center'>New here? <Link to='/signup' className='text-blue-600'>Create new Account</Link>
         </p>
        </form>
    </div>
    <div>
    <Link
    to='/captain-login'
      className='bg-[#10b461] flex item-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base' 

    >
        Sign in as Captain
    </Link>
    </div>
    </div>
  )
}

export default UserLogin
