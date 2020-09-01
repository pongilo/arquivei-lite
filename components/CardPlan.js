import React, { useRef } from "react";

import {
  container,
  radio,
  radioEntry,
  radioText,
  oldPriceText,
  eachPriceConsultText,
} from "../styles/components/CardPlan.module.css";

function CardPlan({
  consults,
  economy,
  oldPrice,
  newPrice,
  eachPriceConsult,
  radioValue,
  onChange
}) {
  return (
    <label className={`card card-hover ${container}`}>
      <div className={radio}>
        <input
          className={radioEntry}
          type="radio"
          name="plan"
          value={radioValue}
          onChange={onChange}
        />
        <span className={radioText}>
          Primeiras <b>{consults}</b> consultas
        </span>
      </div>

      <span className="tag">Economia de R$ {economy}</span>

      <p className={oldPriceText}>
        de R$ <strike>{oldPrice}</strike> por
      </p>

      <h2 className="hero">R$ {newPrice}</h2>

      <p className={eachPriceConsultText}>
        R$ {eachPriceConsult} por consulta de NF-e
      </p>
    </label>
  );
}

export default CardPlan;
