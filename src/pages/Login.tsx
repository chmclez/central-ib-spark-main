import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '@/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = login(email, password);
    if (user) {
      navigate('/');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-80 space-y-4">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        {error && <div className="text-red-600 text-sm text-center">{error}</div>}
        <Input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <Button type="submit" className="w-full">Sign In</Button>
      </form>
    </div>
  );
};

export default Login;