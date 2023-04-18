import React, { useState } from 'react'; 

/**
 * Pop up window for user to tell him about successful registration
 * @returns {JSX.Element} pop window UI for successful registration
 */
function SuccessfulPopUp({  }) {

    return (
       
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">​</span>
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div>
                                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                    
                                    <div className="mt-2 flex justify-center items-center ">
                                <h2 className= " leading-6 font-bold text-lg text-green-500 md:text-xl ml-4 mr-4 md:ml-8 md:mr-8">Sucessful registration</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
          
       

    );
}

export default SuccessfulPopUp;