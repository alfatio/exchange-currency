import React, { useEffect, useState } from 'react'
import axios from '../config/axios'
import cc from 'currency-codes'
import CardCurrency from '../components/Home/CardCurrency'

function Home () {
  const [target, setTarget] = useState('USD')
  const [allTarget, setAllTarget] = useState({})
  const [amount, setInput] = useState(0)
  const [childTarget, setChildTarget] = useState([])
  const [newChildTarget, setNewChildTarget] = useState('CAD')

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`/latest?base=${target}`)
      setAllTarget(data.rates)
    } catch (err) {
      console.log(err);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setChildTarget(childTarget.concat([newChildTarget]))
  }

  const handleDeleteChild = (index) => {
    let ptrA = [...childTarget]
    ptrA.splice(index,1)
    setChildTarget(ptrA)
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  },[target])

  return(
    <div className="w-full min-h-screen flex flex-row justify-center items-center overflow-auto">
      
      <div className="flex flex-row justify-center border-2 border-black">

        <div className="" style={{minWidth: '30vw',minHeight: '50vh'}}>

          <header className="flex flex-col border-b-2 border-black gap-2">
            <div className="italic px-4">
              <h6>{target} - { cc.code(target).currency }</h6>
            </div>
            <div className="flex flex-row justify-between px-4 font-bold">
              <select className="font-bold w-1/2" name="target" value={target} onChange={(e) => setTarget(e.target.value)}>
                {
                  Object.keys(allTarget).map((key, index) => {
                    return (
                      <option key={index} value={key}>{key}</option>
                    )
                  })
                }
              </select>
              <input 
              className="text-right font-bold w-1/3" name="amount" type="number" 
              value={amount} min='0' onChange={(e) => setInput(e.target.value)}
              step='0.1'
              />
            </div>
          </header>

          <div className="flex flex-col justify-center gap-2 py-2">
            {
              childTarget.map((child, index) => {
                const codeCurrency = child
                const currency = cc.code(codeCurrency).currency
                const exchangeRate = allTarget[child] < 0.0001 ? allTarget[child]?.toFixed(8) : allTarget[child]?.toFixed(4)
                const totalAmount = (exchangeRate * amount).toFixed(4)
                return(
                  <CardCurrency 
                  key={index} index={index} codeCurrency={codeCurrency} target={target}
                  exchangeRate={exchangeRate} totalAmount={totalAmount}
                  currency={currency} onDeleteChild={handleDeleteChild}
                  />
                )
              })
            }
          </div>

          <form className="mx-4 flex flex-row justify-between py-2" onSubmit={handleSubmit}>
            <select className="font-bold w-1/2" name="target" value={newChildTarget} onChange={(e) => setNewChildTarget(e.target.value)}>
              {
                Object.keys(allTarget).map((key, index) => {
                  return (
                    <option key={index} value={key}>{key}</option>
                  )
                })
              }
            </select>
            <button type="submit">submit</button>
          </form>

        </div>

      </div>

    </div>
  )
}

export default Home