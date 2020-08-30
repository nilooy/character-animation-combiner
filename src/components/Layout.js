import React from "react";
import GithubImage from "../assets/img/github.png";

const Layout = ({ children }) => {
  return (
    <div>
      <nav className="black">
        <div className="nav-wrapper ">
          <div className="brand-logo center">
            Mixamo Character Animation Combiner
          </div>
          <ul className="right">
            <li>
              <a
                rel="noopener noreferrer"
                style={{ padding: 10 }}
                href="https://github.com/nilooy/mixamo-animation-combiner"
                target="_blank"
              >
                <img src={GithubImage} alt="github logo" width="40" />
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {children}
    </div>
  );
};

export default Layout;
