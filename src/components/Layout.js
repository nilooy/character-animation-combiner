import React from "react";
import GithubImage from "../assets/img/github.png";
import TwitterImage from "../assets/img/twitter.png";

const Layout = ({ children }) => {
  return (
    <div>
      <nav className="black">
        <div className="nav-wrapper ">
          <div className="brand-logo center">
            Character Animation Combiner
          </div>
          <ul className="right">
            <li>
              <a
                rel="noopener noreferrer"
                style={{ padding: 10 }}
                href="https://github.com/nilooy/character-animation-combiner"
                target="_blank"
              >
                <img src={GithubImage} alt="github logo" width="40" />
              </a>
            </li>
            <li>
              <a
                rel="noopener noreferrer"
                style={{ padding: 10 }}
                href="https://twitter.com/nil_ooy"
                target="_blank"
              >
                <img src={TwitterImage} alt="twitter logo" width="40" />
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
