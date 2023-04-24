import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { API } from '../config'

const EmailVerify = () => {
    const params=useParams()
    const[values,setValues]=useState({
        error:'',
        success:false
    })
    const{error,success}=values

    //verify process 
    useEffect(()=>{
        const token= params.token
        fetch(`${API}/confirmation/${token}`,{
            method:"POST",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            }
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error})
            }
            else{
                setValues({...values,error:'',success:true})
            }
        })
        .catch(err=>console.log(err))
    },[params.token])

    //to show error msg 
    const showError=()=>(
        <div className='alert alert-danger' style={{display:error ? '':'none'}}>
            {error}
        </div>
    )

    // to show success msg
    const showSuccess=()=>(
        <div className='alert alert-success' style={{display:success ? '':'none'}}>
           Your account has been verified,login to continue
        </div>
    )
  return (
    <>
    {showError()}
    {showSuccess()}
    </>
  )
}

export default EmailVerify