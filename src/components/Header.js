import React from "react";
import headerLogo from '../../src/images/header-logo.svg';

function Header(){
    return(
      <header className="header indent__header">
        <img className="header__logo" src={headerLogo} alt="Логотип сервиса Mesto Russian"/>
      </header>
    )
}

 export default Header;
