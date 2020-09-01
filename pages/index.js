import Head from "next/head";
import Link from "next/link";

import { useState } from "react";

import Header from "../components/Header";
import CardPlan from "../components/CardPlan";

import { main, container, footer } from "../styles/pages/Home.module.css";

export default function Home() {
  const [plan, setPlan] = useState("");

  function handleChange(event) {
    const { value } = event.target;
    setPlan(value);
  }

  return (
    <>
      <Head>
        <title>Arquivei Lite</title>
        <link rel="icon" href="/favicon-192-192.png" />
      </Head>

      <Header />

      <main className={main}>
        <div className={container}>
          <CardPlan
            consults="1000"
            economy="150,00"
            oldPrice="240,00"
            newPrice="90,00"
            eachPriceConsult="0,09"
            radioValue="1"
            onChange={handleChange}
          />

          <CardPlan
            consults="2000"
            economy="320,00"
            oldPrice="480,00"
            newPrice="160,00"
            eachPriceConsult="0,08"
            radioValue="2"
            onChange={handleChange}
          />
        </div>

        <div className={footer}>
          <Link href={`/checkout?plan=${plan}`}>
            <button type="button" className={`btn-primary ${!plan ? "btn-disabled" : ""}`}>
              Fazer o pagamento
            </button>
          </Link>
        </div>
      </main>
    </>
  );
}
