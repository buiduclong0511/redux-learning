import styled from "styled-components";
import { Formik } from "formik";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useHistory } from "react-router";

import { InputField } from "src/Components";
import { ILogin } from "src/Interface";
import { loginSchema } from "src/Validations";
import { login } from "src/Redux";

export const Login: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const initialValues: ILogin = {
    email: "",
    password: "",
  };

  const handleSwitchToRegister = () => {
    history.push("/register");
  };

  return (
    <Container>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values: ILogin, { setSubmitting }) => {
          try {
            setSubmitting(true);
            const res = await dispatch(login(values));
            // @ts-ignore
            unwrapResult(res);
            console.log(res);
          } catch (err) {
            // @ts-ignore
            console.log(err.response);
          } finally {
            setSubmitting(false);
          }
        }}
        validationSchema={loginSchema}
      >
        {(props) => {
          const { values, errors, handleBlur, handleChange, handleSubmit, touched, isSubmitting } =
            props;
          return (
            <form>
              <h2>Login</h2>
              <InputField
                label="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                touched={touched.email}
                error={errors.email}
                name="email"
                id="email"
                placeholder="Enter your email"
              />
              <InputField
                label="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                touched={touched.password}
                error={errors.password}
                name="password"
                type="password"
                id="password"
                placeholder="Enter your password"
              />
              <div className="btn">
                <Button loading={isSubmitting} type="primary" onClick={() => handleSubmit()}>
                  Login
                </Button>
                <Button type="link" onClick={handleSwitchToRegister}>
                  Create new account
                </Button>
              </div>
            </form>
          );
        }}
      </Formik>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  form {
    border: 1px solid #ccc;
    padding: 20px;

    .btn {
      padding-top: 10px;
      display: flex;
      justify-content: space-around;
    }
  }
`;
