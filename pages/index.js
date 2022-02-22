import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Home() {

  const exampleTransaction = [
    'GOOGLE *ADS12340929 cc@google.com US',
    'BUSINESS ADVANCE CARD TRANSACTION BAT LINKEDIN SI NG 27SEP XXXX-XXXX-XXXX-XXXX',
    'FACEBK *1111XX1XX1 IRELAND ON 29 JAN BDC',
    '*Pending DEBIT PURCHASE Aug19 11:19a XXXX AT 11:19 UBER * PENDING',
    'CARD PAYMENT TO MCDONALDS,12.99 GBP, RATE 1.00/GBP ON 06-02-2020',
    'SALESFORCE CRM - SIN HTTPSNINJAFOR TN 08/06',
    'DDBR xxXXX XXXXXXXXX ATLANTIC BEAC',
    'GOOGLE *ADS12340929 cc@google.com US'
  ]

  const heronDataAPI = 'https://app.herondata.io/api/merchants/extract'
  const [inputValue, setInputValue] = useState(exampleTransaction[0])
  const [searching, setSearching] = useState(false) 
  const [enrichedData, setEnrichedData] = useState([])
  const [displayResults, setDisplayResults] = useState(false)
  const [displayError, setDisplayError] = useState(false)
  const [displayErrorMsg, setDisplayErrorMsg] = useState('')

  useEffect(() => {
    if(searching) {
      const enrichData = async () => {
        const response = await fetch(heronDataAPI, {
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
            setDisplayError(false)
            if(jsonObject.description_clean && jsonObject.description_clean.length > 0) {
              enrichedData.unshift(jsonObject)
            }
            setDisplayResults(true)
            setSearching(false)
            let currentExampleTransactionIndex = exampleTransaction.indexOf(inputValue);
            let nextExampleTransactionIndex = (currentExampleTransactionIndex + 1) % exampleTransaction.length;
            setInputValue(exampleTransaction[nextExampleTransactionIndex])
          })
          .catch((error) => {
            setDisplayError(true)
            setDisplayErrorMsg("Please try again.")
            setSearching(false)
          });
      }
      enrichData()
    }

  }, [searching])

  const searchData = async () => {
    event.preventDefault()
    setSearching(true)
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
          </div>
          
          <form className="enrich-demo__input">
            <input type='text' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <button onClick={() => searchData() }>
              { searching ? 
                <div className="dot-flashing" /> : "Enrich"
              }
            </button>
          </form>

          {displayError &&
            <div className="enrich-demo__error">
              {displayErrorMsg}
            </div>
          }
          
          {displayResults && 
            <div className="enrich-demo__results">
              {enrichedData && enrichedData.map((transaction) => (
                <div className="transaction" key={transaction.description_clean}>
                  <div className="merchant">

                    { transaction.merchant && transaction.merchant.icon_url &&
                      <div className="merchant__img">
                        <Image src={transaction.merchant.icon_url} alt={transaction.merchant.name + " logo"} width={32} height={32} /> 
                      </div>
                    }
                    <div className="merchant__text">
                      { transaction.merchant && transaction.merchant.name &&
                        <div className="merchant__title"> 
                          {transaction.merchant.name} <a href={transaction.merchant.url}>{transaction.merchant.url}</a>
                        </div>
                      }
                      { transaction.merchant && transaction.merchant.categories &&
                        <div className="merchant__details">
                          MCC: {transaction.merchant.categories[0].code} {transaction.merchant.categories[0].description}
                        </div>
                      }
                    </div>
                  </div>
                  <div className="amount">
                    $??
                  </div>
                </div>
              ))}
            </div>
          }
      
        </div>
      </main>
    </div>
  )
}