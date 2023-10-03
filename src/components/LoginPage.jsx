import { useTranslation } from 'react-i18next';
import React, { useRef, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import {
  Row, Card, Col, Form, Button,
} from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';

const LoginPage = () => {
  const auth = useAuth();
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { login, password } = useSelector((state) => state.loginData);
  const [showData, setShowData] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const loginSchema = yup.object().shape({
    login: yup.string().trim().oneOf([login], 'Error').required(),
    password: yup.string().oneOf([password], 'Error Password').required(),
  });

  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    validationSchema: loginSchema,
    // validateOnBlur: false,
    // validateOnChange: true,
    onSubmit: () => {
      auth.logIn();
      const { from } = location.state || { from: { pathname: routes.profilePagePath } };
      navigate(from);
    },
  });

  return (
    <div className="container-fluid h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Form className="mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                <fieldset disabled={formik.isSubmitting}>
                  <Form.Group className="mb-3 form-floating">
                    <Form.Control
                      onChange={formik.handleChange}
                      value={formik.values.login}
                      placeholder={t('loginField')}
                      name="login"
                      id="login"
                      autoComplete="login"
                      isValid={(!formik.errors.login && formik.dirty)}
                      required
                      ref={inputRef}
                    />
                    <Form.Label htmlFor="login">{t('loginField')}</Form.Label>
                    <Form.Control.Feedback type="valid">{t('correctLogin')}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3 form-floating">
                    <Form.Control
                      type="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      placeholder={t('passwordField')}
                      name="password"
                      id="password"
                      autoComplete="password"
                      isValid={(!formik.errors.password && formik.dirty)}
                      required
                    />
                    <Form.Label htmlFor="password">{t('passwordField')}</Form.Label>
                    <Form.Control.Feedback type="valid">{t('correctPassword')}</Form.Control.Feedback>
                  </Form.Group>
                  <Button disabled={!(formik.isValid && formik.dirty)} type="submit" variant="outline-primary" className="w-100 mb-3">{t('logIn')}</Button>
                </fieldset>
              </Form>
            </Card.Body>
          </Card>
          <button
            onClick={() => setShowData(!showData)}
            type="button"
            className="mt-3 data-button"
          >
            {showData ? `login: ${login}, password: ${password}` : t('showDataButton')}
          </button>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;
