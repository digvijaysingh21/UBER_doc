import React from 'react'

const LocationSearchPannel = (props) => {
  console.log(props)
    const locations = [
        "Brahampur, Buxar,Bihar",
        "Brahampur, Buxar,Bihar",
        "Brahampur, Buxar,Bihar",
        "Brahampur, Buxar,Bihar"
    ]
  return (
    <div>
      {/* this is sample data */}
      {locations.map(function(elem,idx){
        return <div key={idx} onClick={() =>{
          props.setVehiclePanel(true)
          props.setPanelOpen(false)
        }}
        className='flex gap-4 border-2 border-gray-50 active:border-black p-3 rounded-xl items-center justify-start my-2'>
        <h2 className='bg-[#eee] h-8 w-12 flex items-center justify-center rounded-full'><i className="ri-map-pin-fill"></i></h2>
        <h4 className='font-medium'>{elem}</h4>
      </div>
      })
      }

    

      
    </div>
  )
}

export default LocationSearchPannel
