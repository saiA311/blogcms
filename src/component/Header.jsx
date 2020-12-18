import React from "react";
import { useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();
  return (
    <div className="header">
      <h1 onClick={() => history.push("/")}>React Markup Design</h1>
    </div>
  );
};

export default Header;
