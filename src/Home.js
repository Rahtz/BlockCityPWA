import React from 'react'

const Home = () => {
  return (
    <div className="-mt-5 bg-gray-200 h-screen">

        <div className="container relative top-10 w-screen h-40 overflow-x-auto scrollbar-hide">
                <div className="w-[112px] h-full ml-[30px] bg-blue-500 rounded-lg"></div>
                <div className="w-[112px] h-full ml-[172px] -mt-40 bg-blue-500 rounded-lg"></div>
                <div className="w-[112px] h-full ml-[314px] -mt-40 bg-blue-500 rounded-lg"></div>
        </div>

        <div className="relative top-16 mx-5 h-auto py-5 border bg-white rounded-lg drop-shadow-lg">
            {/* <table>
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
            </table> */}
        </div>

    </div>
  )
}

export default Home