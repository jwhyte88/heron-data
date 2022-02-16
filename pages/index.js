import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Home() {

  const heronDataAPI = 'https://app.herondata.io/api/merchants/extract'
  const [inputValue, setInputValue] = useState('')
  const [searching, setSearching] = useState(false) 
  const [enrichedData, setEnrichedData] = useState([])
  const [displayResults, setDisplayResults] = useState(false)

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
            if(jsonObject.description_clean.length > 0) {
              enrichedData.unshift(jsonObject)
            }
            setDisplayResults(true)
            setSearching(false)
          })
          .catch((error) => {
            document.write(error);
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
            <input type='text' onChange={(e) => setInputValue(e.target.value)} />
            <button onClick={() => searchData() }>Enrich</button>
          </form>
          
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
