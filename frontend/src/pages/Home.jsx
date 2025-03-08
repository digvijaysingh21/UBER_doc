import React, { useState } from 'react'
import {useGSAP} from '@gsap/react';

const Home = () => {
  const [pickup, setPickUp] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen , setPanelOpen] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
  }

  return (
    <div className="h-screen relative">
      <img className='w-16 absolute left-5 top-5' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1JPvedCBmNG39bU4Zvq1PJTRRl6Nc8OOimA&s" />
      <div className='h-screen w-screen'>
        {/* image for temporary use */}
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="uber-map-image" />
      </div>
      <div className='bg-white flex flex-col justify-end h-screen absolute top-0 w-full'>
        <div className='h-[30%] bg-white p-5 relative'>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <form onSubmit={(e) => { submitHandler(e) }}>
            <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-900 rounded-full"></div>
            <input
            onClick={ () => setPanelOpen(true)}
              value={pickup}
              onChange={(e) => { setPickUp(e.target.value) }}
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5'
              type="text"
              placeholder="Add a pick-up location"
            />

            <input
            onClick={ () => setPanelOpen(true)}
              value={destination}
              onChange={(e) => { setDestination(e.target.value) }}
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3'
              type="text"
              placeholder="Enter your destination"
            />

          </form>
        </div>
        {/* as below div in comment  */}
        {/* <div className='h-[70%] bg-red-500 p-5 hidden'>
        </div> */}
        {/*  or h-0initially and whenclicke make h-[70%] */}
        <div className=' bg-red-500 h-0 '></div>

      </div>
    </div>
  )
}

export default Home
