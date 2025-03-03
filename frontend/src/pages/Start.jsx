import React from 'react'
import { Link } from 'react-router-dom';

const Start = () => {
  return (
    <div>
      <div className='bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1624724126923-e2c021df1311?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dHJhZmZpYyUyMGxpZ2h0fGVufDB8fDB8fHww)] h-screen pt-8 flex justify-between flex-col w-full '>
        <img className='w-16 ml-8 rounded-[2rem]' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1JPvedCBmNG39bU4Zvq1PJTRRl6Nc8OOimA&s"/>
        <div className='bg-white pb-7 py-4 px-4'>
            <h2 className='text-[30px] font-semibold'>
                Get Started with Uber
            </h2>
            <Link to='/login' className=' flex item-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5'>Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Start;
