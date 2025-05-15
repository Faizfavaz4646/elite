import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import { toast } from 'react-toastify';

const EditProfile = () => {
  const [userData, setUserData] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem('user'));
  const currentUserId = currentUser?.id;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/users/${currentUserId}`);
        setUserData(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load user data");
      }
    };

    if (currentUserId) {
      fetchUser();
    } else {
      toast.error("User ID not found. Please login again.");
    }
  }, [currentUserId]);

  const handleUpdate = async (values) => {
    try {
      await axios.patch(`http://localhost:5000/users/${currentUserId}`, values);
toast.success("Profile updated successfully");

    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  if (!userData) return <div className="text-center mt-10 text-gray-700">Loading profile...</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white  rounded-xl shadow-md pt-20">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Edit Profile</h2>
      <Formik
        initialValues={{
          name: userData.name || '',
          email: userData.email || '',
          phone: userData.phone || '',
          profilePic: userData.profilePic || '',
          address: {
            line: userData.address?.line || '',
            city: userData.address?.city || '',
            state: userData.address?.state || '',
            zip: userData.address?.zip || '',
            country: userData.address?.country || '',
          }
        }}
        onSubmit={handleUpdate}
      >
        {({ setFieldValue }) => (
          <Form className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <Field name="name" className="w-full p-2 border rounded-md" />
            </div>

            <div>
              <label className="block text-sm font-medium">Email</label>
              <Field name="email" type="email" className="w-full p-2 border rounded-md" />
            </div>

            <div>
              <label className="block text-sm font-medium">Phone</label>
              <Field name="phone" className="w-full p-2 border rounded-md" />
            </div>

            {/* Profile Picture Preview & Upload */}
            <div>
              <label className="block text-sm font-medium">Profile Picture</label>
              {userData.profilePic && (
                <img src={userData.profilePic} alt="Profile" className="w-20 h-20 rounded-full mb-2" />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setFieldValue("profilePic", reader.result); // base64 URL
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </div>

            {/* Address Section */}
            <div>
              <label className="block text-sm font-medium">Address</label>
              <Field name="address.line" placeholder="Address Line" className="w-full p-2 border rounded-md mt-1" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Field name="address.city" placeholder="City" className="w-full p-2 border rounded-md" />
              </div>
              <div>
                <Field name="address.state" placeholder="State" className="w-full p-2 border rounded-md" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Field name="address.zip" placeholder="Zip" className="w-full p-2 border rounded-md" />
              </div>
              <div>
                <Field name="address.country" placeholder="Country" className="w-full p-2 border rounded-md" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
              Save Changes
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditProfile;
