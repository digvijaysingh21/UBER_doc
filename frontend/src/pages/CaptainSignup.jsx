import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainSignup = () => {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [firstName, setFirstName] = useState("");
        const [lastName, setLastName] = useState("");
        const [userData, setUserData] = useState({});
    
        const submitHandler = (e) => {
            e.preventDefault();
            setUserData({
                email: email,
                password: password
            })
            
            // console.log(email, password);
            // console.log(userData);
            setUserData({
                fullName:{
                    firstName: firstName,
                    lastName: lastName
                },
                email: email,
                password: password
            })
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
        }

    return (
        <div className="py-5 px-5 h-screen flex flex-col justify-between">
            <div>
            <img className='w-16 mb-3 rounded-[2rem]' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjYjyprCeZ5cP2NZgN1phnikNi57xECVfPMw&s"/> 
            <form onSubmit={submitHandler}>


                    <h3 className="text-lg w-full font-medium mb-2">What's our Captain's name</h3>
                    <div className='flex gap-4 mb-6'>

                        <input
                            required
                            className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border-0 text-lg placeholder:text-lg'
                            type="text"
                            placeholder='First name'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input
                            required
                            className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border-0 text-lg placeholder:text-lg'
                            type="text"
                            placeholder='Last name'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                    <h3 className="text-lg font-medium mb-2">What's our Captain's email</h3>
                    <input
                        required
                        className='bg-[#eeeeee] mb-6 rounded-lg px-4 py-2 border-0 w-full text-lg placeholder:text-lg'
                        type="email"
                        placeholder='email@example.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <h3 className='text-base font-medium mb-2'>Enter Password</h3>
                    <input
                        required
                        className='bg-[#eeeeee] mb-6 rounded-lg px-4 py-2 border-0 w-full text-lg placeholder:text-lg'
                        type="password"
                        placeholder='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                         />
                    <button
                        className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-lg'
                    >Login</button>
                    <p className='text-center'>Already have a account? <Link to='/captain-login' className='text-blue-600'>Login here</Link>
                    </p>
                </form>
            </div>
            <div>
            <p className='text-[8px] leading-tight'>
                This site is protected by reCAPTCHA and the <span className='underline'> Google Privacy Policy </span>and  <span className='underline'>Terms of Service apply</span>.
                </p>
            </div>
        </div>
    )
}

export default CaptainSignup;