import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {

  const [inputValue, setInputValue] = useState('')
  const [enrichedData, setEnrichedData] = useState([])

  console.log('\n\n\n\n\ enrichData', enrichedData)

  const enrichData = async () => {
    const response = await fetch('https://app.herondata.io/api/merchants/extract', {
      method: 'POST',
      body: JSON.stringify({ description: inputValue }),
      headers: { 
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonObject) => {
        console.log(jsonObject)
        enrichedData.push(jsonObject)
        console.log('\n\n\n\n\ enrichData', enrichedData)
      })
      .catch((error) => {
        document.write(error);
      });
  }

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
            <p>Example: SALESFORCE CRM - SIN HTTPSNINJAFOR TN 08/06</p>
          </div>
          <div className="enrich-demo__input">
            <input type='text' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <button onClick={enrichData}>Enrich</button>
          </div>
          <div className="enrich-demo__results">
            Results go here.
          </div>
        </div>
      </main>
    </div>
  )
}
