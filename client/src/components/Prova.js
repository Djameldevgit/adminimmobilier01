 
import React from 'react'

const Prova = ({setOpenModal}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
     
     <button className="btn btn-danger btn_close"
            onClick={() => setOpenModal(false)}>
                Close
            </button>
   
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold">Este es un modal</h2>
        <p className="mt-2">Puedes cerrarlo haciendo clic en el botón.</p>
     
      </div>
    </div>

</div>
  )
}

export default Prova
