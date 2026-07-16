import React from "react";

function LeftSider() {
  return (
    <div className="fixed left-0 bottom-0 px-10 sm:static">
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href="https://github.com/1606DP/MERNPortfolio" target="_blank" rel="noreferrer">
            <i className="ri-mail-line text-gray-500 text-xl"></i>
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
            <i className="ri-instagram-line text-gray-500 text-xl"></i>
          </a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
            <i className="ri-linkedin-box-fill text-gray-500 text-xl"></i>
          </a>
          <a href="https://github.com/1606DP" target="_blank" rel="noreferrer">
            <i className="ri-github-fill text-gray-500 text-xl"></i>
          </a>
        </div>
        <div className="w-[1px] h-52 bg-[#125f63] sm:hidden"></div>
      </div>
    </div>
  );
}

export default LeftSider;
