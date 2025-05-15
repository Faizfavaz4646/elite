import React from 'react';
import { Formik, Form, Field } from 'formik';
import { SignupValidation } from '../../SignupValidation';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const initialValues = {
  name: '',
  email: '',
  password: '',
  confirmpassword: '',
  photo: '', // ✅ New field
  address: '',
  city: '',
  state: '',
  zip: '',
  country: '',
  phone: ''
};

function SignUp() {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const res = await axios.get(`http://localhost:5000/users?email=${values.email}`);
      if (res.data.length > 0) {
        toast.info("You already have an account!");
        navigate("/login");
        return;
      }

      const newUser = {
        name: values.name,
        email: values.email,
        password: values.password,
        cart: [],
        wishlist: [],
        photo: values.photo || "https://via.placeholder.com/150", // ✅ Default image fallback
        address: {
          line: values.address,
          city: values.city,
          state: values.state,
          zip: values.zip,
          country: values.country
        },
        phone: values.phone,
        role: "user"
      };

      await axios.post('http://localhost:5000/users', newUser);
      toast.success("Signup successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error("Signup failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg shadow-yellow-400 p-6">
        <h2 className="text-2xl font-bold text-center text-black mb-6">Sign Up</h2>
        <Formik initialValues={initialValues} validationSchema={SignupValidation} onSubmit={handleSubmit}>
          {({ errors, touched }) => (
            <Form className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-black">Name</label>
                <Field type="text" name="name" className="w-full mt-1 p-2 border border-gray-300 rounded-lg" />
                {errors.name && touched.name && <small className="text-red-500">{errors.name}</small>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-black">Email</label>
                <Field type="email" name="email" className="w-full mt-1 p-2 border border-gray-300 rounded-lg" />
                {errors.email && touched.email && <small className="text-red-500">{errors.email}</small>}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-black">Password</label>
                <Field type="password" name="password" className="w-full mt-1 p-2 border border-gray-300 rounded-lg" />
                {errors.password && touched.password && <small className="text-red-500">{errors.password}</small>}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmpassword" className="block text-sm font-medium text-black">Confirm Password</label>
                <Field type="password" name="confirmpassword" className="w-full mt-1 p-2 border border-gray-300 rounded-lg" />
                {errors.confirmpassword && touched.confirmpassword && (
                  <small className="text-red-500">{errors.confirmpassword}</small>
                )}
              </div>

              {/* ✅ Photo URL */}
              <div>
                <label htmlFor="photo" className="block text-sm font-medium text-black">Profile Photo URL</label>
                <Field name="photo" className="w-full mt-1 p-2 border border-gray-300 rounded-lg" />
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-black">Address</label>
                <Field name="address" className="w-full mt-1 p-2 border border-gray-300 rounded-lg" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-black">City</label>
                  <Field name="city" className="w-full mt-1 p-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-black">State</label>
                  <Field name="state" className="w-full mt-1 p-2 border border-gray-300 rounded-lg" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="zip" className="block text-sm font-medium text-black">Zip Code</label>
                  <Field name="zip" className="w-full mt-1 p-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-black">Country</label>
                  <Field name="country" className="w-full mt-1 p-2 border border-gray-300 rounded-lg" />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-black">Phone Number</label>
                <Field name="phone" className="w-full mt-1 p-2 border border-gray-300 rounded-lg" />
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
