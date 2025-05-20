'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  password: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState<Partial<User>>({});
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchUsers = async () => {
    const res = await fetch('/api/auth/users');
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async () => {
  try {
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/auth/users/${editingId}` : '/api/auth/users';
    const payload = editingId ? { ...form, id: editingId } : form;

    console.log('Request URL:', url);
    console.log('Request Method:', method);
    console.log('Request Payload:', payload);

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    // console.log('Response Status:', res.status);
    console.log('Response Data:', await res.text());

    if (!res.ok) {
      throw new Error(`Failed to save user (Status ${res.status})`);
    }

    setForm({});
    setEditingId(null);
    fetchUsers();
  } catch (error) {
    console.error(error);
  }
};

  const handleEdit = (user: User) => {
    setForm(user);
    setEditingId(user.id);
  };

  const handleDelete = async (id: string) => {
    await fetch('/api/auth/users', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchUsers();
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <Input name="name" placeholder="Name" value={form.name || ''} onChange={handleChange} />
        <Input name="email" placeholder="Email" value={form.email || ''} onChange={handleChange} />
        <Input name="role" placeholder="Role" value={form.role || ''} onChange={handleChange} />
        <Input name="password" placeholder="Password" type="password" value={form.password || ''} onChange={handleChange} />
      </div>
      <Button onClick={handleSubmit}>{editingId ? 'Update' : 'Add'} User</Button>

      <table className="w-full mt-8 border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.role}</td>
              <td className="p-2 space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(user)}>Edit</Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(user.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
