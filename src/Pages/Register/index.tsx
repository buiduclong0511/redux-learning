import { Formik } from "formik";
import styled from "styled-components";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";

import { InputField } from "src/Components";
import { IRegisterForm } from "src/Interface";
import { Button } from "antd";
import { registerSchema } from "src/Validations";
import { register } from "src/Redux";
import { unwrapResult } from "@reduxjs/toolkit";

export const Register: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const initialValues: IRegisterForm = {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  };

  const handleSwitchToLogin = () => {
    history.push("/login");
  };
  return (
    <Container>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            setSubmitting(true);
            const res = await dispatch(
              register({
                email: values.email,
                password: values.password,
                username: values.username,
              })
            );
            // @ts-ignore
            unwrapResult(res);
          } catch (err) {
            // @ts-ignore
            console.log(err.response);
          } finally {
            setSubmitting(false);
          }
        }}
        validationSchema={registerSchema}
      >
        {(props) => {
          const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } =
            props;
          return (
            <form action="">
              <h2>Register</h2>
              <InputField
                label="Email"
                placeholder="Enter your email"
                value={values.email}
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
                touched={touched.email}
                id="email"
              />
              <InputField
                label="Username"
                placeholder="Enter your username"
                value={values.username}
                name="username"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.username}
                touched={touched.username}
                id="username"
              />
              <InputField
                label="Password"
                placeholder="Enter your password"
                value={values.password}
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password}
                touched={touched.password}
                type="password"
                id="password"
              />
              <InputField
                label="Confirm password"
                placeholder="Confirm your password"
                value={values.confirmPassword}
                name="confirmPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.confirmPassword}
                touched={touched.confirmPassword}
                type="password"
                id="confirmPassword"
              />
              <div className="btn">
                <Button loading={isSubmitting} type="primary" onClick={() => handleSubmit()}>
                  Register
                </Button>
                <Button type="link" onClick={handleSwitchToLogin}>
                  Login
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
