import React, { useEffect, useState } from 'react';
import './Auth.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast }  from 'react-toastify';
import { signIn,signUp } from '../../actions/Auth';

const initialState = { email: '', password: '', confirmPassword: '', firstName: '', lastName: '' };


function Auth() {
    const [formData, setFormData] = useState(initialState)
    const [isSignup, setIsSignup] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
   

    const switchHandler = (e) => {
        e.preventDefault()
        setIsSignup(preValue => !preValue)
    }

    const submitHandle = (e) => {
        e.preventDefault();

        if(formData.email==''){
            return toast.warn('Enter email');
        }

        if(formData.password==''){
            return toast.warn('Enter password');
        }

        if (isSignup) {
            if(formData.password != formData.confirmPassword){
                return toast.warn('Not Match Password');
            }
            dispatch(signUp(formData, navigate,setError))    
        }else{
            dispatch(signIn(formData, navigate,setError))
        }
    }

    useEffect(()=>{
       if(error){
        toast.error(error);
        setError('')
       }
    },[error])

    
    return (
        <div className='auth' >
            <ToastContainer/>
            <form onSubmit={submitHandle} >
                <div className='form-inner' >
                  <h2>{isSignup ? 'Sign Up' : 'Sign In'}</h2>
                    {isSignup ?
                        <div className='form-name' >
                            <input type={'text'} value={formData.firstName} name='firstName' placeholder='First Name' onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} required />
                            <input type={'text'} value={formData.lastName} name='lastName' placeholder='Last Name' onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} required />
                        </div>
                        :
                        null}
                    <div>
                        <input type={'email'} value={formData.email} name='email' placeholder='Your email' onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                        <input type={'passWord'} value={formData.password} name='password' placeholder='Password' onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
                        {isSignup ? <input type={'password'} value={formData.confirmPassword} name='password' placeholder='Confirm Password' onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} required /> : null}
                    </div>

                    <div className='buttons' >
                        <button>Submit</button>


                        <button className='switchBtn' onClick={switchHandler}>
                            {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Auth
