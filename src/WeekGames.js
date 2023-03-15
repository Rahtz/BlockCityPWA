import React from 'react'

const WeekGames = (props) => {
  return (
    <div>
    <table className="w-[112px] text-center">
            <img
              className="ml-[22px] mt-[5px] w-[75px] h-[40px]"
              src={props.team1Icon}
              alt="BC"
            />
              <tr>
                <th className="text-white text-[12px]">{props.team1}</th>
                <th className="text-white text-[12px] pr-[13px]">{props.team1Score}</th>
              </tr>
              <img
              className="ml-[24px] mt-[10px] col-span-1 w-[60px] h-[40px]"
              src={props.team2Icon}
              alt="HF"
            />
              <tr>
                <th className="text-white text-[12px]">{props.team2}</th>
                <th className="text-white text-[12px] pr-[13px]">{props.team2Score}</th>
              </tr>
            </table>
    </div>
  )
}

export default WeekGames