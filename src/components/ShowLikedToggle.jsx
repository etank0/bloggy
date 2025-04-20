import React from "react";

function ShowLikedToggle({ isToggled, handleIsToggled }) {
  return (
    <div className="fixed z-10 right-0 flex px-6 py-2 justify-end">
      <div className="flex items-center rounded-full bg-bkg-secondary/40 backdrop-blur-md px-4 py-3">
        <span className="flex justify-center font-medium items-center mr-3">
          Liked Only
        </span>
        <button
          className={`toggleBtn ${isToggled && "toggled"} bg-primary`}
          onClick={handleIsToggled}
        >
          <div className="thumb bg-bkg-secondary"></div>
        </button>
      </div>
    </div>
  );
}

export default ShowLikedToggle;
