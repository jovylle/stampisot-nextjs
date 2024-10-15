// src/components/UserList.js
"use client"; // Add this line to mark the component as a Client Component

import { useState, useEffect } from 'react';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch('/api/users');
    const data = await res.json();
    setUsers(data);
  };

  const handleCreateOrUpdate = async () => {
    const method = editId ? 'PUT' : 'POST';
    const body = JSON.stringify({ id: editId, name, email });

    await fetch('/api/users', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body,
    });

    setName('');
    setEmail('');
    setEditId(null);
    fetchUsers();
  };

  const handleEdit = (user) => {
    setName(user.name);
    setEmail(user.email);
    setEditId(user.id);
  };

  const handleDelete = async (id) => {
    await fetch('/api/users', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    fetchUsers();
  };

  return (
    <div>
      <h1>User List</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleCreateOrUpdate(); }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">{editId ? 'Update' : 'Create'}</button>
      </form>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
