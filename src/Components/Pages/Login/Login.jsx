import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginValidation = Yup.object({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const initialValues = {
  email: '',
  password: '',
};

function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const res = await axios.get('http://localhost:5000/users', {
        params: {
          email: values.email,
          password: values.password,
        },
      }

      );
      console.log("res", res)

      if (res.data.length > 0) {
        const user = res.data[0];
        localStorage.setItem("user", JSON.stringify(user));
        alert("Login successful!");
        navigate("/");
      } else {
        alert("User not found. Please sign up first.");
      }
      // const user = res.data
      // localStorage.setItem("user", JSON.stringify(user));
      // alert("Login successful!");
      // navigate("/");



    } catch (err) {
      console.error(err);
      alert("Login error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg shadow-yellow-400 p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>
        <Formik initialValues={initialValues} validationSchema={LoginValidation} onSubmit={handleSubmit}>
          {({ errors, touched }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <Field type="email" name="email" className="w-full mt-1 p-2 border border-gray-300 rounded-lg" />
                {errors.email && touched.email && <small className="text-red-500">{errors.email}</small>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <Field type="password" name="password" className="w-full mt-1 p-2 border border-gray-300 rounded-lg" />
                {errors.password && touched.password && <small className="text-red-500">{errors.password}</small>}
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                Login
              </button>

              <div className="text-sm text-center mt-4">
                Don’t have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;
