import React from "react";

const Container = ({ className, children, ...props }) => {
  return (
    <section
      {...props}
      className={" px-4 mx-auto w-full" + (className ? " " + className : "")}
    >
      {children}
    </section>
  );
};

export default Container;
