import React from 'react';
import { Formik, Form, Field } from 'formik';
import { SignupValidation } from '../../SignupValidation';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  name: '',
  email: '',
  password: '',
  confirmpassword: '',
};

function SignUp() {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const res = await axios.get(`http://localhost:5000/users?email=${values.email}`);
      if (res.data.length > 0) {
        alert("You already have an account!");
        navigate("/login");
        return;
      }

      const newUser = {
        name: values.name,
        email: values.email,
        password: values.password,
        cart: [],
        wishlist: [],
      };

      await axios.post('http://localhost:5000/users', newUser);
      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Signup failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg shadow-yellow-400 p-6">
        <h2 className="text-2xl font-bold text-center text-black mb-6">Sign Up</h2>
        <Formik initialValues={initialValues} validationSchema={SignupValidation} onSubmit={handleSubmit}>
          {({ errors, touched }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-black">Name</label>
                <Field type="text" name="name" className="w-full mt-1 p-2 border border-gray-300 rounded-lg" />
                {errors.name && touched.name && <small className="text-red-500">{errors.name}</small>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-black">Email</label>
                <Field type="email" name="email" className="w-full mt-1 p-2 border border-gray-300 rounded-lg" />
                {errors.email && touched.email && <small className="text-red-500">{errors.email}</small>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-black">Password</label>
                <Field type="password" name="password" className="w-full mt-1 p-2 border border-gray-300 rounded-lg" />
                {errors.password && touched.password && <small className="text-red-500">{errors.password}</small>}
              </div>

              <div>
                <label htmlFor="confirmpassword" className="block text-sm font-medium text-black">Confirm Password</label>
                <Field type="password" name="confirmpassword" className="w-full mt-1 p-2 border border-gray-300 rounded-lg" />
                {errors.confirmpassword && touched.confirmpassword && (
                  <small className="text-red-500">{errors.confirmpassword}</small>
                )}
              </div>

              <button type="submit" className="w-full bg-yellow-400 text-black font-semibold py-2 rounded-lg hover:bg-yellow-500">
                Register
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default SignUp;
