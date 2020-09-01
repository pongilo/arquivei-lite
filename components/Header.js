import React from "react";

import {
  container,
  logo,
  arquiveiLite,
} from "../styles/components/Header.module.css";

function Header() {
  return (
    <>
      <header className={container}>
        <img
          src="/logo-arquivei-160-32.svg"
          alt="Arquivei logo"
          className={logo}
        />
      </header>

      <div className={arquiveiLite}>
        <h1 className="hero">Arquivei Lite</h1>
        <p>
          Aproveite nossos lotes promocionais e compre suas primeiras consultas
          de notas fiscais com a Arquivei.
        </p>
      </div>
    </>
  );
}

export default Header;
