

import React from "react";

const Product = ({...props }) => {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M22 3H2v6h1v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9h1zM4 5h16v2H4zm15 15H5V9h14zm-6-10v5.17l2.59-2.58L17 14l-5 5l-5-5l1.41-1.42L11 15.17V10z"/></svg>
  );
};

export default Product;
