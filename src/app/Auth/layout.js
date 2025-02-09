import React from "react";

const AthLayout = ({ children }) => {
  return (
    <div className="container mx-auto w-full  ">
      <div>{children}</div>
    </div>
  );
};

export default AthLayout;
