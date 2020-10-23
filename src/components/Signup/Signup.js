import React from "react";
import "./Signup.css";
import { Formik } from "formik";
import * as Yup from "yup";
import Error from "./Error";
import { NavLink } from "react-router-dom";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Must b a valid email address")
    .max(30, "Must be shorter than 30")
    .required("required"),
  password: Yup.string()
    .min(6, "Must be more than 6 letters")
    .required("required"),
  username: Yup.string().required("required"),
});

export default function Signup(props) {
  const SignUp = async (values) => {
    const data = await fetch(
      "https://morning-eyrie-35918.herokuapp.com/user/auth/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );
    const fetchedData = await data.json();
    console.log(props);
    props.history.push("/signin");
    console.log(fetchedData);
  };

  return (
    <section className="signup_main_section">
      <div className="signup_form">
        <div className="signup_main_part">
          <h2 className="registration_title">Registration</h2>
          <Formik
            initialValues={{ username: "", email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setSubmitting(true);

              SignUp(values);
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
                    touched.username && errors.username
                      ? "error ui input form_input"
                      : "ui input form_input"
                  }
                >
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Please enter your name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.username}
                  />
                  <Error touched={touched.username} message={errors.username} />
                </div>
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
                  Sign up
                </button>
              </form>
            )}
          </Formik>
          <p className="already">
            {" "}
            Already have an account ?
            <NavLink to="/signin">
              {" "}
              <span className="login_link">Login</span>{" "}
            </NavLink>
          </p>
        </div>
      </div>
    </section>
  );
}
