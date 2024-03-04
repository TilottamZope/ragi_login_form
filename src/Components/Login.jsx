import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',

    })
    const [errors, setErrors] = useState([])
    const [valid, setValid] = useState([])
    const navigate = useNavigate()

    const handleInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
        let isvalid = true
        let validationErrors = {}


        if (formData.email === '' || formData.email === null) {
            isvalid = false
            validationErrors.email = "Email Required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            isvalid = false
            validationErrors.email = "Email is not valid"
        }
        if (formData.password === '' || formData === null) {
            isvalid = false
            validationErrors.password = "Password Required"
        } else if (formData.password.length < 6) {
            isvalid = false
            validationErrors.password = "Enter password at least 6 character"
        }


        axios.get('http://localhost:9000/users').then(result => {
            result.data.map(user => {
                if (user.email === formData.email) {
                    if (user.password === formData.password) {
                        alert("Login Successfully")
                        navigate('/home')
                    } else {
                        isvalid = false
                        validationErrors.password = "Wrong password"
                    }
                } 
            })
            setErrors(validationErrors)
            setValid(isvalid)
        }).catch(err => alert(err))
    }
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-sm-8 col-md-6 offset-md-3">
                        <form className="register-form" onSubmit={handleSubmit}>
                            <h2 className="text-center text-success">Login Form</h2>
                            {
                                valid ? <></> : <span className="text-danger">
                                 {errors.email};{errors.password}
                                </span>
                            }
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="text"
                                    name='email'
                                    className="form-control"
                                    placeholder="Enter Your Email"
                                    onChange={handleInput} />
                            </div>
                            <div class="form-group" >
                                <label>Password</label>
                                <input
                                    type="password"
                                    name='password'
                                    className="form-control"
                                    placeholder="Password"
                                    onChange={handleInput} />
                            </div>

                            <button type="submit" className="btn btn-success float-right mt-2">Login</button>
                            <p className="text-center mt-2 mb-0 float-left">If you don't have an account <Link to="/ragistration">Ragister Now</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
