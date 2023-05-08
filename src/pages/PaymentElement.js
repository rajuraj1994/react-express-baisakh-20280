import React,{useState,useEffect} from 'react'
import {API} from '../config'
import axios from 'axios'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Payment from './Payment'

const PaymentElement = () => {
    const [stripeApiKey,setStripeApiKey]=useState('')

    useEffect(()=>{

        async function getStripeApiKey(){
            const {data}=await axios.get(`${API}/stripeapi`)
            setStripeApiKey(data.stripeApiKey)
        }
        getStripeApiKey()

    },[])
  return (
    <>
    {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
            <Payment/>
        </Elements>
    )}

    </>
  )
}

export default PaymentElement