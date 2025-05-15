import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/users');
      const onlyUsers = res.data.filter(user => user.role === 'user');
      setUsers(onlyUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const toggleBlockStatus = async (userId, isBlocked) => {
    try {
      await axios.patch(`http://localhost:5000/users/${userId}`, {
        isBlocked: !isBlocked,
      });
      fetchUsers();
    } catch (error) {
      console.error('Error updating user block status:', error);
    }
  };

  const formatAddress = (address) => {
    if (!address) return 'N/A';
    const { line, city, state, zip, country } = address;
    return `${line}, ${city}, ${state} - ${zip}, ${country}`;
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 w-full max-w-screen min-h-screen bg-gray-50">
      <h2 className="text-2xl font-bold mb-6 text-center bg-blue-100 text-gray-800 py-3 px-6 rounded-lg inline-block">
        Manage Users
      </h2>

      {/* Card View (Mobile) */}
      <div className="space-y-4 sm:hidden">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white p-4 rounded-lg shadow border text-gray-800"
          >
            <p><span className="font-semibold">Name:</span> {user.name}</p>
            <p><span className="font-semibold">Email:</span> {user.email}</p>
            <p><span className="font-semibold">Address:</span> {formatAddress(user.address)}</p>
            <p><span className="font-semibold">Status:</span> {user.isBlocked ? 'Blocked' : 'Active'}</p>
            <button
              onClick={() => toggleBlockStatus(user.id, user.isBlocked)}
              className={`mt-3 px-4 py-1 rounded text-white text-sm ${
                user.isBlocked
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-red-500 hover:bg-red-600'
              }`}
            >
              {user.isBlocked ? 'Unblock' : 'Block'}
            </button>
          </div>
        ))}
      </div>

      {/* Table View (Desktop) */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
          <thead className="bg-gray-100 text-gray-800">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Address</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{formatAddress(user.address)}</td>
                <td className="py-3 px-4">{user.isBlocked ? 'Blocked' : 'Active'}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => toggleBlockStatus(user.id, user.isBlocked)}
                    className={`px-4 py-1 rounded text-white text-sm ${
                      user.isBlocked
                        ? 'bg-green-500 hover:bg-green-600'
                        : 'bg-red-500 hover:bg-red-600'
                    }`}
                  >
                    {user.isBlocked ? 'Unblock' : 'Block'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUserManagement;
