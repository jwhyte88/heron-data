import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {

  const [inputValue, setInputValue] = useState('')
  const enrichData = async () => {}

  return (
    <div className="container">
      <Head>
        <title>Try Us - Heron Data</title>
        <meta name="description" content="Data enrichment by Heron Data" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <div className="enrich-demo">
          <div className="enrich-demo__intro">
            <h1>Try us</h1>
            <p>This is a free demo of our merchant enrichment product used to create a beautiful transaction feed. Enter a bank transaction or try our examples.</p>
          </div>
          <form className="enrich-demo__input">
            <input type='text' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <button onClick={enrichData}>Enrich</button>
          </form>
        </div>
      </main>
    </div>
  )
}
