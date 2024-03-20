import React, { useContext, useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Bars } from "react-loader-spinner";
import { RegisterFormValidation } from "../../services/validationSchema";
import { userContext } from "../../Context/UserContext";

const Register = () => {
  const navigate = useNavigate();

  const { isloading, error, RegisterSubmit, registerSucess ,setRegisterSucess } =
    useContext(userContext);

  useEffect(() => {
    if (registerSucess) {
      setRegisterSucess(false)
      navigate("/login");
    }
  }, [registerSucess]);


  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: RegisterFormValidation,
    onSubmit: RegisterSubmit,
  });

  return (
    <>
      <div className="w-75 m-auto py-4">
        {!!error && <div className="alert alert-danger">{error}</div>}
        <h2 className="mb-3">Register Now</h2>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Name : </label>
          <input
            value={formik.values.name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            className="form-control mb-2"
            id="name"
            name="name"
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger py-2 mt-2" role="alert">
              {formik.errors.name}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="email">Email : </label>
          <input
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="email"
            className="form-control mb-2"
            id="email"
            name="email"
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger py-2 mt-2" role="alert">
              {formik.errors.email}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="phone">phone : </label>
          <input
            value={formik.values.phone}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="tel"
            className="form-control mb-2"
            id="phone"
            name="phone"
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger py-2 mt-2" role="alert">
              {formik.errors.phone}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="password">password : </label>
          <input
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            className="form-control mb-2"
            id="password"
            name="password"
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger py-2 mt-2" role="alert">
              {formik.errors.password}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="rePassword">rePassword : </label>
          <input
            value={formik.values.rePassword}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            className="form-control mb-2"
            id="rePassword"
            name="rePassword"
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger py-2 mt-2" role="alert">
              {formik.errors.rePassword}
            </div>
          ) : (
            ""
          )}

          <div className="d-flex justify-content-start">
            {isloading ? (
              <button type="button" className="btn bg-main mt-2 text-white">
                <Bars
                  height="20"
                  width="20"
                  color="#fff"
                  ariaLabel="bars-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              </button>
            ) : (
              <button
                disabled={!(formik.isValid && formik.dirty)}
                type="submit"
                className="btn bg-main mt-2 text-white"
              >
                Register
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
