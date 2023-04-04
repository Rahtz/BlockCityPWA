import React from "react";

const WeekGames = (props) => {
  return (
    <div className="flex items-center justify-center border border-gray-500 bg-white">
      <div className="w-[120px] text-center">
          

        <div className="text-[12px] flex">
        <img
            className="w-[25px] h-[25px]"
            src={props.team1Icon}
            alt="BC"
          />
          <p>{props.team1} {props.team1Score}</p>
        </div>          

        <div className="text-[12px] flex">
        <img
            className="w-[25px] h-[25px]"
            src={props.team2Icon}
            alt="HF"
          />
          <p>{props.team2} {props.team2Score}</p>
        </div>
      </div>
    </div>
  );
};

export default WeekGames;
