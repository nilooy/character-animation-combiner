import React from "react";

const Layout = ({ children }) => {
  return (
    <div>
      <nav className="indigo accent-3">
        <div className="nav-wrapper ">
          <a href="#" className="brand-logo center">
            Mixamo Character Combiner
          </a>
        </div>
      </nav>
      {children}
    </div>
  );
};

export default Layout;
