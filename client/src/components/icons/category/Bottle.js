import React from "react";

const Bottle = ({ className, ...props }) => {
  return (
    <svg
      {...props}
      className={"w-3.5 h-3.5 " + (className ? " " + className : "")}

     width="64px" height="64px" viewBox="0 0 118 108" id="Layeri" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="currentColor"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <defs> <clipPath id="clip-path"> <rect className="cls-1" height="104" width="104" x="2" y="2"></rect> </clipPath> </defs> <title></title> <g className="cls-2"> <path d="M79.2,28.67h0l0,0a.25.25,0,0,0,0-.07,26,26,0,0,1-3.58-10.29h.57a2,2,0,0,0,2-2V4a2,2,0,0,0-2-2h-29a2,2,0,0,0-2,2V16.25a2,2,0,0,0,2,2H48.7a26.24,26.24,0,0,1-3.6,10.46,0,0,0,0,0,0,0L45,28.8l0,0A57.25,57.25,0,0,0,36.32,59V97.88a8.06,8.06,0,0,0,8,8.12H51v-4H44.32a4.06,4.06,0,0,1-4-4.12V59c0-.41,0-.81,0-1.22a24.41,24.41,0,0,1,4.91,3.85c2.85,2.62,5.81,5.33,9.21,5.33s6.35-2.71,9.21-5.33c2.29-2.11,4.66-4.29,6.51-4.29s4.21,2.18,6.5,4.29,4.63,4.24,7.21,5V97.88a4.06,4.06,0,0,1-4,4.12H63v4H79.89a8.06,8.06,0,0,0,8-8.12V58.8A57.28,57.28,0,0,0,79.2,28.67ZM49.11,6h25v8.25h-25ZM83.89,62.28a27,27,0,0,1-4.5-3.63c-2.86-2.63-5.81-5.34-9.21-5.34S63.82,56,61,58.65c-2.29,2.11-4.66,4.28-6.5,4.28S50.25,60.76,48,58.65s-4.71-4.33-7.35-5.07A53.92,53.92,0,0,1,48.39,31l.14-.23a30.35,30.35,0,0,0,4.2-12.51H71.51a30.07,30.07,0,0,0,4.17,12.33l.14.23a53.31,53.31,0,0,1,8.07,28Z"></path> <rect height="4" rx="2" ry="2" width="4" x="55" y="102"></rect> </g> </g></svg>
  );
};

export default Bottle;
