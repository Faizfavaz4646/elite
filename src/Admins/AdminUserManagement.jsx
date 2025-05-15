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
      await axios.patch(`http://localhost:5000/users/${userId}`, { isBlocked: !isBlocked });
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
    <div className="p-4 sm:p-6 lg:p-8 w-full max-w-screen overflow-x-auto">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center bg-blue-600 text-white py-3 px-6 rounded-md inline-block">
        Manage Users
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded text-sm sm:text-base">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-2 px-3 sm:px-4 text-left">Name</th>
              <th className="py-2 px-3 sm:px-4 text-left">Email</th>
              <th className="py-2 px-3 sm:px-4 text-left">Address</th>
              <th className="py-2 px-3 sm:px-4 text-left">Status</th>
              <th className="py-2 px-3 sm:px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="py-2 px-3 sm:px-4">{user.name}</td>
                <td className="py-2 px-3 sm:px-4">{user.email}</td>
                <td className="py-2 px-3 sm:px-4">{formatAddress(user.address)}</td>
                <td className="py-2 px-3 sm:px-4">
                  {user.isBlocked ? 'Blocked' : 'Active'}
                </td>
                <td className="py-2 px-3 sm:px-4">
                  <button
                    onClick={() => toggleBlockStatus(user.id, user.isBlocked)}
                    className={`px-4 py-1 rounded text-white transition-colors duration-200 ${
                      user.isBlocked
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-red-600 hover:bg-red-700'
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
