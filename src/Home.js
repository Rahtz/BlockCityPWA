import React from 'react'
import Blockcity from "./images/Blockcity.png";
import Highflyers from "./images/Highflyers.png";

const Home = () => {
  return (
    <div className="-mt-5 bg-gray-200 h-screen">
        
            <div className="flex container relative top-10 w-screen h-[200px] overflow-x-auto scrollbar-hide pt-12">
                    <div className="-mt-11">
                        <div className="bg-white w-[80px] h-[30px] pl-[12px] pt-[3px] ml-[35px] mb-[20px] rounded shadow-lg">
                            <h1 className="">Week 2</h1>
                        </div>
                        <div className="grid grid-cols-2 w-[112px] h-[150px] ml-[30px] -mt-[5px] bg-gray-800 rounded-lg">
                            <img className="ml-[5px] mt-[30px] col-span-1 w-[39px] h-[39px]" src={Blockcity} alt="BC"/>
                            <img className="-ml-[2px] mt-[30px] col-span-1 w-[65px] h-[39px]" src={Highflyers} alt="HF"/>
                            {/* <div className="w-[112px]">
                                <h1 className="text-white text-sm">Block City<span className="pl-5">98</span></h1>
                                <h1 className="text-white text-sm">High Flyers<span className="pl-5">69</span></h1>
                            </div> */}
                            <table className="w-[112px]">
                                <tr>
                                    <th className="text-white text-[12px]">Block City</th>
                                    <th className="text-white text-[12px] pr-[5px]">98</th>
                                </tr>
                                <tr>
                                    <th className="text-white text-[12px]">High Flyers</th>
                                    <th className="text-white text-[12px] pr-[5px]">69</th>
                                </tr>
                            </table>
                        </div>
                        <div className="w-[112px] h-[150px] ml-[172px] -mt-[150px] bg-blue-500 rounded-lg"></div>
                        <div className="w-[112px] h-[150px] ml-[314px] -mt-[150px] bg-blue-500 rounded-lg"></div>
                    </div>
                    <div className="-mt-11">
                        <div className="bg-white w-[80px] h-[30px] pl-[12px] pt-[3px] ml-[35px] mb-[20px] rounded shadow-lg">
                            <h1 className="">Week 1</h1>
                        </div>
                        <div className="grid grid-cols-2 w-[112px] h-[150px] ml-[30px] -mt-[5px] bg-gray-800 rounded-lg">
                            <img className="ml-[5px] mt-[30px] col-span-1 w-[39px] h-[39px]" src={Blockcity} alt="BC"/>
                            <img className="-ml-[2px] mt-[30px] col-span-1 w-[65px] h-[39px]" src={Highflyers} alt="HF"/>
                            {/* <div className="w-[112px]">
                                <h1 className="text-white text-sm">Block City<span className="pl-5">98</span></h1>
                                <h1 className="text-white text-sm">High Flyers<span className="pl-5">69</span></h1>
                            </div> */}
                            <table className="w-[112px]">
                                <tr>
                                    <th className="text-white text-[12px]">Block City</th>
                                    <th className="text-white text-[12px] pr-[5px]">98</th>
                                </tr>
                                <tr>
                                    <th className="text-white text-[12px]">High Flyers</th>
                                    <th className="text-white text-[12px] pr-[5px]">69</th>
                                </tr>
                            </table>
                        </div>
                        <div className="w-[112px] h-[150px] ml-[172px] -mt-[150px] bg-blue-500 rounded-lg"></div>
                        <div className="w-[112px] h-[150px] ml-[314px] -mt-[150px] bg-blue-500 rounded-lg"></div>
                    </div>
            </div>

        <div className="relative top-16 mx-5 h-auto py-5 border bg-white rounded-lg drop-shadow-lg">
            <table>
                <thead>
                    <tr>
                        <th>P</th>
                        <th>Team</th>
                        <th>W</th>
                        <th>L</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Block City</td>
                        <td>5</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>High Flyers</td>
                        <td>2</td>
                        <td>5</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>The Pirates</td>
                        <td>0</td>
                        <td>5</td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
  )
}

export default Home