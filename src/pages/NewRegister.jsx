import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { signup } from '../auth/authIndex';

const Register = () => {
    const [values, setValues] = useState({
        error: '',
        success: false,
    });
    const{error,success}=values

    //to show error msg 
    const showError = () => (
        <div className='alert alert-danger' style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    )

    // to show success msg
    const showSuccess = () => (
        <div className='alert alert-success' style={{ display: success ? '' : 'none' }}>
            New account created, verify your account before login
        </div>
    )

    return (
        <div className="d-flex justify-content-center">
            <div className="col-lg-5 my-4">
                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        password: '',
                        cpassword: '',
                    }}
                    validationSchema={Yup.object({
                        name: Yup.string()
                            .required('Name is mandatory')
                            .max(20, '20 characters or less'),
                        email: Yup.string()
                            .required('Email is mandatory')
                            .email('Invalid email format'),
                        password: Yup.string()
                            .required('Password is mandatory')
                            .matches(
                                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$!_?])[A-Za-z\d@#$!_?]{8,50}$/,
                                'Must contain one uppercase, one lowercase, one digit, and one special character and must be a minimum of 8 characters'
                            ),
                        cpassword: Yup.string()
                            .required('Confirm password is mandatory')
                            .oneOf([Yup.ref('password'), null], 'Password and confirm password do not match'),
                    })}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        setSubmitting(true);

                        signup(values)
                            .then((data) => {
                                if (data.error) {
                                    setValues({ ...values, error: data.error });
                                } else {
                                    setValues({ ...values, success: true });
                                    resetForm()
                                }
                                setSubmitting(false);
                            })
                            .catch((error) => {
                                console.log(error); // Handle the error as needed
                                setSubmitting(false);
                            });
                    }}
                >
                    <Form className="p-3 shadow-lg">
                        {showError()}
                        {showSuccess()}
                        <div className="mb-2">
                            <label htmlFor="name">Name</label>
                            <Field type="text" name="name" id="name" className="form-control" />
                            <ErrorMessage name="name" component="div" style={{ color: 'red' }} />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="email">Email</label>
                            <Field type="email" name="email" id="email" className="form-control" />
                            <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="password">Password</label>
                            <Field type="password" name="password" id="password" className="form-control" />
                            <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="cpassword">Confirm Password</label>
                            <Field type="password" name="cpassword" id="cpassword" className="form-control" />
                            <ErrorMessage name="cpassword" component="div" style={{ color: 'red' }} />
                        </div>
                        <div className="mb-2">
                            <button type="submit" className="btn btn-primary">
                                Register
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default Register;
