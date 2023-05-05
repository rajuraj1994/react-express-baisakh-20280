import React,{useState} from 'react'
import { Link,useNavigate} from 'react-router-dom'
import { signin,authenticate,isAuthenticated } from '../auth'

const Login = () => {
    const navigate=useNavigate()
    const{user}=isAuthenticated()

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
              authenticate(data,()=>{
                setValues({...values,redirectToPage:true})
              })
            }
        })
    }
    //to show error msg 
    const showError=()=>(
        <div className='alert alert-danger' style={{display:error ? '':'none'}}>
            {error}
        </div>
    )

    // to redirect user 
    const redirectUser=()=>{
        const redirect='/profile'
        const searchParams=new URLSearchParams(window.location.search)
        const redirectParam=searchParams.get('redirect')
        if(redirectToPage){
            if(user && user.role===1){
                return navigate('/admin/dashboard')
            }
            else if(redirectParam==='shipping'){
                navigate('/shipping')
            }
            else{
                navigate(redirect)
            }
        }
    }

    return (
        <>
            <div className="d-flex justify-content-center">
                <div className="col-lg-5 my-4">
                    <form className="p-3 shadow-lg">
                        <h2 className="text-center text-success my-2">
                            Login Form
                        </h2>
                        {showError()}
                        {redirectUser()}
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