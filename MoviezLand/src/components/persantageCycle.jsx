import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const PersantageCycle = ({ percentage = 40 }) => {
  const textSize = 35;
  const wholeSize = 150;
  let Progress_color = "21d07a";

  if (percentage < 25) {
    Progress_color = "ff0000";
  } else if (percentage < 50) {
    Progress_color = "d2d531";
  } else if (percentage < 75) {
    Progress_color = "00ffff";
  }

  return (
    <div
      style={{
        width: wholeSize,
        height: wholeSize,
        backgroundColor: "black",
        borderRadius: "50%",
        padding: `${wholeSize / 30}px`,
      }}
    >
      <CircularProgressbar
        value={percentage}
        text={
          <tspan>
            {percentage}
            <tspan style={{ fontSize: `${textSize / 3}px` }} dy="-5">
              %
            </tspan>
          </tspan>
        }
        styles={buildStyles({
          pathColor: `#${Progress_color}`, // Progress color
          textColor: "#fff", // Text color
          trailColor: "#204529", // Background circle color
          textSize: `${textSize}px`, // Font size for the main text
        })}
      />
    </div>
  );
};

export default PersantageCycle;
