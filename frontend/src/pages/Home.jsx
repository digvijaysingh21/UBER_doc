import React, { use, useRef, useState } from 'react'
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPannel from '../components/LocationSearchPannel';

const Home = () => {
  const [pickup, setPickUp] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen , setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const vehiclePanelRef = useRef(null);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
  }

  // for animation
  useGSAP(function(){
    if(panelOpen){
      gsap.to(panelRef.current,{
        height: '70%',
        // opacity:1
        padding:24
      })
      gsap.to(panelCloseRef.current,{
        opacity:1
      })
    }else{
      gsap.to(panelRef.current,{
        height: '0%',
        // opacity:0
      })
      gsap.to(panelCloseRef.current,{
        opacity:0
      })
    }
  }, [panelOpen])


  useGSAP(function(){
    if(vehiclePanel){
    gsap.to(vehiclePanelRef.current,{
      transform:'translateY(0)',
    })
  }else{
    gsap.to(vehiclePanelRef.current,{
      transform:'translateY(100%)',
      })
  }
  },[vehiclePanel])



  return (
    <div className="h-screen relative overflow-hidden">
      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" />
      <div className='h-screen w-screen'>
        {/* image for temporary use */}
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="uber-map-image" />
      </div>
      <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
        <div className='h-[30%] bg-white p-6 relative'>
          <h5 ref={panelCloseRef}
          className='absolute opacity-0 right-6 top-6 text-2xl'
          onClick={() => {
            setPanelOpen(false)
          }}
          
          >
        <i className="ri-arrow-down-wide-line"></i>
        </h5>
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
        <div ref={panelRef} className=' bg-white h-0 '>
        <LocationSearchPannel panelOpen={panelOpen} setPanelOpen={setPanelOpen} vehiclePanel={vehiclePanel} setVehiclePanel={setVehiclePanel}/>
        </div>  
      </div>

      <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-14'>
        <h5 className='p-1 text-center w-[95%] absolute top-0' onClick={() => {
          setVehiclePanel(false)
        }}><i className="text-3xl text-gray-200 ri-arrow-down-s-line"></i></h5>
        <h3 className='text-2xl font-semibold mb-5'>Choose a vehicle</h3>

        <div className='flex border-2 border-gray-50 active:border-black rounded-xl w-full p-3 mb-2 items-center justify-between'>
          <img className='h-10' src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png' alt='car'/>
        <div className='ml-8 w-1/2'>
          <h4 className='font-medium text-base'>UberGo <span><i className="ri-user-3-fill"></i>4</span></h4>
          <h5 className='font-medium text-sm'>2 mins away
            <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
          </h5>
        </div>
        <h2 className='text-lg font-semibold'>₹193.32</h2>
        </div>

        <div className='flex border-2 border-gray-50 active:border-black rounded-xl w-full p-3 mb-2 items-center justify-between'>
          <img className='h-10' src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png' alt='car'/>
        <div className='-ml-5 w-1/2'>
          <h4 className='font-medium text-base'>Moto <span><i className="ri-user-3-fill"></i>1</span></h4>
          <h5 className='font-medium text-sm'>3 mins away
            <p className='font-normal text-xs text-gray-600'>Affordable, motorcycle rides</p>
          </h5>
        </div>
        <h2 className='text-lg font-semibold'>₹65</h2>
        </div>

        <div className='flex border-2 border-gray-50 active:border-black rounded-xl w-full p-3 mb-2 items-center justify-between'>
          <img className='h-10' src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png' alt='car'/>
        <div className='ml-2 w-1/2'>
          <h4 className='font-medium text-base'>UberAuto <span><i className="ri-user-3-fill"></i>3</span></h4>
          <h5 className='font-medium text-sm'>3 mins away
            <p className='font-normal text-xs text-gray-600'>Affordable, Auto rides</p>
          </h5>
        </div>
        <h2 className='text-lg font-semibold'>₹118.68</h2>
        </div>

      </div>
    </div>
  )
}

export default Home
