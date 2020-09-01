import { useState, useEffect, useRef } from "react";
import IMask from "imask";

import Head from "next/head";
import Link from "next/link";

import validateCnpj from "../../utils/validateCnpj";

import Header from "../../components/Header";

import {
  container,
  bag,
  bagItem,
  divider,
  payment,
  field,
  fieldGroup,
  fieldText,
  fieldEntry,
  fieldError,
  creditCardText,
  creditCardContainer,
  footer,
} from "../../styles/pages/Checkout.module.css";

export default function Checkout() {
  const currentYear = Number(new Date().getFullYear());

  const [plan, setPlan] = useState("");

  const [cnpj, setCnpj] = useState("");
  const [cnpjIsInvalid, setCnpjIsInvalid] = useState(false);

  const [name, setName] = useState("");
  const [nameIsInvalid, setNameIsInvalid] = useState(false);

  const [card_number, setCard_number] = useState("");
  const [card_numberIsInvalid, setCard_numberIsInvalid] = useState(false);

  const [expiration_date, setExpiration_date] = useState("");
  const [expiration_dateIsInvalid, setExpiration_dateIsInvalid] = useState(
    false
  );

  const [cvv, setCvv] = useState("");
  const [cvvIsInvalid, setCvvIsInvalid] = useState(false);

  const inputElCnpj = useRef(null);
  const inputElCardNumber = useRef(null);
  const inputElExpirationDate = useRef(null);
  const inputElCvv = useRef(null);

  useEffect(() => {
    IMask(inputElCnpj.current, {
      mask: "00.000.000/0000-00",
    });

    IMask(inputElCardNumber.current, {
      mask: "0000 0000 0000 0000",
    });

    IMask(inputElExpirationDate.current, {
      mask: "MM/YYYY",
      blocks: {
        MM: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 12,
        },
        YYYY: {
          mask: IMask.MaskedRange,
          from: currentYear,
          to: 9999,
        },
      },
    });

    IMask(inputElCvv.current, {
      mask: "000",
    });
  }, []);

  useEffect(() => {
    setPlan(window.location.href.split("=")[1]);
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    setCnpjIsInvalid(false);
    setNameIsInvalid(false);
    setCard_numberIsInvalid(false);
    setExpiration_dateIsInvalid(false);
    setCvvIsInvalid(false);

    if (!validateCnpj(cnpj)) {
      setCnpjIsInvalid(true);
      return;
    }

    if (!name) {
      setNameIsInvalid(true);
      return;
    }

    if (!card_number || card_number.length != 19) {
      setCard_numberIsInvalid(true);
      return;
    }

    const year = Number(expiration_date.split("/")[1]);
    if (
      !expiration_date ||
      expiration_date.length != 7 ||
      year > currentYear + 10
    ) {
      setExpiration_dateIsInvalid(true);
      return;
    }

    if (!cvv || cvv.length != 3) {
      setCvvIsInvalid(true);
      return;
    }

    alert(`
      Compra Realizada com sucesso!
      
      CNPJ: ${cnpj}
      Nome do titular: ${name}
      Número do cartão: ${card_number}
      Data de vencimento: ${expiration_date}
      Cod. de segurança: ${cvv}
    `);
  }

  return (
    <>
      <Head>
        <title>Arquivei Lite</title>
        <link rel="icon" href="/favicon-192-192.png" />
      </Head>

      <Header />

      <main className={container}>
        <header className={bag}>
          <span>Sua compra</span>
          <Link href="/">Escolher outro plano</Link>
        </header>

        <div className={`card ${bagItem}`}>
          <div>
            <p>
              <b>{plan}000</b> consultas de NF-e
            </p>
            <div className="tag">
              Economia de R$ {plan == 1 ? "150,00" : "320,00"}
            </div>
          </div>
          <span className="title">R$ {plan == 1 ? "90,00" : "160,00"}</span>
        </div>

        <hr className={divider} />

        <div className={`card ${payment}`}>
          <label className={field}>
            <span className={fieldText}>Seu CNPJ</span>
            <input
              className={fieldEntry}
              name="cnpj"
              type="text"
              ref={inputElCnpj}
              onChange={(e) => setCnpj(e.target.value)}
            />
            {cnpjIsInvalid && (
              <span className={fieldError}>Informe um CNPJ válido</span>
            )}
          </label>

          <span className={creditCardText}>Cartão de crédito</span>
          <div className={creditCardContainer}>
            <label className={field}>
              <input
                className={fieldEntry}
                type="text"
                name="name"
                placeholder="Nome do titular"
                onChange={(e) => setName(e.target.value)}
              />
              {nameIsInvalid && (
                <span className={fieldError}>Informe o nome do titular</span>
              )}
            </label>
            <label className={field}>
              <input
                className={fieldEntry}
                type="text"
                name="card_number"
                ref={inputElCardNumber}
                placeholder="Número do cartão"
                onChange={(e) => setCard_number(e.target.value)}
              />
              {card_numberIsInvalid && (
                <span className={fieldError}>
                  Informe um número do cartão válido
                </span>
              )}
            </label>
            <div className={fieldGroup}>
              <label className={field}>
                <input
                  className={fieldEntry}
                  type="text"
                  name="expiration_date"
                  ref={inputElExpirationDate}
                  placeholder="Data de vencimento"
                  onChange={(e) => setExpiration_date(e.target.value)}
                />
                {expiration_dateIsInvalid && (
                  <span className={fieldError}>Informe uma data válida</span>
                )}
              </label>
              <label className={field}>
                <input
                  className={fieldEntry}
                  type="text"
                  name="cvv"
                  ref={inputElCvv}
                  placeholder="Cod. de segurança"
                  onChange={(e) => setCvv(e.target.value)}
                />
                {cvvIsInvalid && (
                  <span className={fieldError}>Informe um CVV válido</span>
                )}
              </label>
            </div>
          </div>
        </div>
      </main>

      <footer className={footer}>
        <button type="button" onClick={handleSubmit} className="btn-primary">
          Finalizar
        </button>
      </footer>
    </>
  );
}
