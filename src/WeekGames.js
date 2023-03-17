import React from "react";

const WeekGames = (props) => {
  return (
    <div className="text-center pt-2">
      <div className="flex justify-center">
        <img
          className="w-[65px] h-[45px]"
          src={props.team1Icon}
          alt="BC"
        />
      </div>

      <div className="text-white text-[12px]">
        {props.team1} {props.team1Score}
      </div>
      <div className="flex justify-center">
        <img
          className="w-[65px] h-[45px]"
          src={props.team2Icon}
          alt="HF"
        />
      </div>

      <div className="text-white text-[12px]">
        {props.team2} {props.team2Score}
      </div>
    </div>
  );
};

export default WeekGames;
