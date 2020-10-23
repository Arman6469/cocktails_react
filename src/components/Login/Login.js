import React from "react";
import "../Signup/Signup.css";
import { Formik } from "formik";
import * as Yup from "yup";
import Error from "../Signup/Error";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Must b a valid email address")
    .max(30, "Must be shorter than 30")
    .required("required"),
  password: Yup.string()
    .min(6, "Must be more than 6 letters")
    .required("required"),
});

const Login = (props) => {
  const confirmLogin = async (values) => {
    try {
      const data = await fetch(
        "https://morning-eyrie-35918.herokuapp.com/user/auth/signin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );
      const fetchedData = await data.json();

      if (fetchedData.message) {
        console.log(fetchedData.message);
      } else {
        localStorage.setItem("token", fetchedData.auth_token);
        props.history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="signup_main_section">
      <div className="signup_form">
        <div className="left_side"></div>
        <div className="signup_main_part">
          <h2 className="registration_title">Login</h2>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setSubmitting(true);  
              confirmLogin(values);
              resetForm();
              setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <div
                  className={
                    touched.email && errors.email
                      ? "error ui input form_input"
                      : "ui input form_input"
                  }
                >
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Please enter your email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                  />
                  <Error touched={touched.email} message={errors.email} />
                </div>
                <div
                  className={
                    touched.password && errors.password
                      ? "error ui input form_input"
                      : "ui input form_input"
                  }
                >
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Please enter your password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                  />
                  <Error touched={touched.password} message={errors.password} />
                </div>
                <button className="ui positive basic button" type="submit">
                  Login
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default Login;
