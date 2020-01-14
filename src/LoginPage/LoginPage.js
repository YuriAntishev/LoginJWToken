import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormRender from './Form.js'

import { authenticationService } from '../_services/authentication.service.js';

class LoginPage extends React.Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this)

        // redirect to home if already logged in
        if (authenticationService.currentUserValue) {
            this.props.history.push('/');
        }
    }

    onSubmit({ email, password }, { setStatus, setSubmitting }) {
        setStatus();
        authenticationService.login(email, password)
            .then(
                user => {
                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                    this.props.history.push(from);
                },
                error => {
                    setSubmitting(false);
                    setStatus(error);
                }
            );
    }

    render() {

        const validationSchema = Yup.object().shape({
            email: Yup.string().required('Заполните поле Почта'),
            password: Yup.string().required('Заполните поле Пароль')
        });

        const values = {
            email: '',
            password: ''
        };

        return (
            <div className="col-md-6 offset-md-3">
                <div className="alert alert-info">
                    email: test@gmail.com<br />
                    Password: test
                </div>
                <Formik
                    initialValues={values}
                    validationSchema={validationSchema}
                    onSubmit={this.onSubmit}
                    render={(props) => <FormRender {...props} />}
                />
            </div>
        )
    }
}

export { LoginPage }; 