import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const Ragistration = () => {
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        bdate : '',
        email :'',
        password: '',
        cpassword: ''
    })
    const handleInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })

    }

    const [errors, setErrors] = useState({})
    const [valid, setValid] = useState(true)
    const navigate = useNavigate()

    

    const handleSubmit = (e) => {
        e.preventDefault();
        let isvalid = true
        let validationErrors = {}
        if (formData.fname === '' || formData.fname === null) {
            isvalid = false
            validationErrors.fname = "First Name Required"
        }
        if (formData.lname === '' || formData.lname === null) {
            isvalid = false
            validationErrors.lname = "Last Name Required"
        }
        if (formData.bdate === '' || formData.bdate === null) {
            isvalid = false
            validationErrors.bdate = "Birth date Required"
        }
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
        if (formData.cpassword !== formData.password) {
            isvalid = false
            validationErrors.cpassword = "Password Doesn't match"
        }
        setErrors(validationErrors)
        setValid(isvalid)

        if (Object.keys(validationErrors).length === 0) {
            axios.post('http://localhost:9000/users', formData)
                .then(result => {
                    alert("Ragistration successfully")
                    navigate('/login')
                }
                ).catch(err => alert(err))
        }
        
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-sm-8 col-md-6 offset-md-3">
                        <form className="register-form" onSubmit={handleSubmit}>
                            <h2 className="text-center text-success">Registration Form</h2>
                            {
                                valid ? <></> : <span className="text-danger">
                                    {errors.fname} ; {errors.lname};{errors.bdate};{errors.email};{errors.password};{errors.cpassword}
                                </span>
                            } 
                            <div className="form-group">
                                <label>First Name </label>
                                <input
                                    type="text"
                                    name='fname'
                                    className="form-control"
                                    placeholder="Enter First Name"
                                    onChange={handleInput} />
                            </div>
                            <div className="form-group">
                                <label>Last Name </label>
                                <input
                                    type="text"
                                    name='lname'
                                    className="form-control"
                                    placeholder="Enter Last Name"
                                    onChange={handleInput} />
                            </div>
                            <div className="form-group">
                                <label>Birth Date </label>
                                <input
                                    type='date'
                                    name='bdate'
                                    className="form-control"
                                    placeholder="Enter Birth Date"
                                    onChange={handleInput} />
                            </div>
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
                            <div class="form-group" >
                                <label>Conform Password</label>
                                <input
                                    type="password"
                                    name='cpassword'
                                    className="form-control"
                                    placeholder="Conform Password"
                                    onChange={handleInput} />
                            </div>
                            <button type="submit" className="btn btn-success float-right mt-2">Register</button>
                            <p className="text-center mt-2 mb-0 float-left">If you have account <Link to="/login">Login Now</Link></p>
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Ragistration
