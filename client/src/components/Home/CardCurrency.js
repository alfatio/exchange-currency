import React from 'react'

function CardCurrency (props) {
  
  return(
    <div className="border-2 border-black flex flex-row mx-2 min-h-0">
      <div className="w-10/12 flex flex-col px-2">
        <div className="flex flex-row justify-between">
          <p>{props.codeCurrency}</p>
          <p>{props.totalAmount}</p>
        </div>
        <div className="italic font-bold text-xs">
          <p>{props.codeCurrency} - {props.currency}</p>
        </div>
        <div className="text-xs italic">
          <p>1 {props.target} = {props.codeCurrency} {props.exchangeRate}</p>
        </div>
      </div>
      <div className="w-2/12 flex flex-row items-center justify-center border-l-2 border-black">
        <button onClick={() => {
          props.onDeleteChild( props.index )
        }}>( - )</button>
      </div>
    </div>
  )
}

export default CardCurrency