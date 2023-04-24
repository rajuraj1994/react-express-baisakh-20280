import React,{useState} from 'react'
import { Link,useNavigate,Navigate } from 'react-router-dom'
import { signin } from '../auth'

const Login = () => {
    const navigate=useNavigate()

    const[values,setValues]=useState({
        email:'',
        password:'',
        error:'',
        redirectToPage:false
    })
    const{email,password,error,redirectToPage}=values
    
    
    const handleChange=name=>event=>{
        setValues({...values,error:false,[name]:event.target.value})
    }

    const handleSubmit=e=>{
        e.preventDefault()
        setValues({...values,error:false})
        //call signin function with email and password 
        signin({email,password})
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error})
            }
            else{
                return <Navigate to='/'/>
            }
        })
    }
    //to show error msg 
    const showError=()=>(
        <div className='alert alert-danger' style={{display:error ? '':'none'}}>
            {error}
        </div>
    )

    return (
        <>

            <div className="d-flex justify-content-center">
                <div className="col-lg-5 my-4">
                    <form className="p-3 shadow-lg">
                        <h2 className="text-center text-success my-2">
                            Login Form
                        </h2>
                        {showError()}
                        <div className="mb-3">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" className="form-control" 
                            onChange={handleChange('email')} value={email} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pass">Password</label>
                            <input type="password" id="pass" className="form-control" 
                            onChange={handleChange('password')} value={password}/>
                        </div>

                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Login</button>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <Link to="/forgotpassword" className='text-decoration-none'>
                                Forgot password?
                            </Link>

                            <Link to="/signup" className='text-decoration-none'>
                                Create an account instead
                            </Link>
                        </div>
                    </form>
                </div>
            </div>


        </>
    )
}

export default Login