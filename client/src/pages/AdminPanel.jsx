import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersRes, quizzesRes] = await Promise.all([
        axios.get('/api/admin/users'),
        axios.get('/api/admin/quizzes'),
      ]);
      setUsers(usersRes.data);
      setQuizzes(quizzesRes.data);
    } catch (error) {
      console.error('Failed to fetch admin data', error);
      alert('Could not load data. Are you an admin?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`/api/admin/users/${userId}`);
        alert('User deleted successfully.');
        fetchData(); // Refresh data
      } catch (error) {
        alert('Failed to delete user.');
        console.error(error);
      }
    }
  };

  const handleDeleteQuiz = async (quizId) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      try {
        await axios.delete(`/api/admin/quizzes/${quizId}`);
        alert('Quiz deleted successfully.');
        fetchData(); // Refresh data
      } catch (error) {
        alert('Failed to delete quiz.');
        console.error(error);
      }
    }
  };

  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }

  if (loading) return <p>Loading Admin Panel...</p>;

  return (
    <div>
      <h1>Admin Panel</h1>
      
      <h2>Manage Users ({users.length})</h2>
      <table style={{width: '100%', borderCollapse: 'collapse'}}>
        <thead>
            <tr style={{background: '#eee'}}>
                <th style={{padding: '8px', border: '1px solid #ddd'}}>Name</th>
                <th style={{padding: '8px', border: '1px solid #ddd'}}>Email</th>
                <th style={{padding: '8px', border: '1px solid #ddd'}}>Role</th>
                <th style={{padding: '8px', border: '1px solid #ddd'}}>Actions</th>
            </tr>
        </thead>
        <tbody>
            {users.map(u => (
                <tr key={u._id}>
                    <td style={{padding: '8px', border: '1px solid #ddd'}}>{u.name}</td>
                    <td style={{padding: '8px', border: '1px solid #ddd'}}>{u.email}</td>
                    <td style={{padding: '8px', border: '1px solid #ddd'}}>{u.role}</td>
                    <td style={{padding: '8px', border: '1px solid #ddd'}}>
                        {u.role !== 'admin' && <button onClick={() => handleDeleteUser(u._id)} style={{backgroundColor: '#dc3545'}}>Delete</button>}
                    </td>
                </tr>
            ))}
        </tbody>
      </table>

      <h2 style={{marginTop: '40px'}}>Manage Quizzes ({quizzes.length})</h2>
       <table style={{width: '100%', borderCollapse: 'collapse'}}>
        <thead>
            <tr style={{background: '#eee'}}>
                <th style={{padding: '8px', border: '1px solid #ddd'}}>Title</th>
                <th style={{padding: '8px', border: '1px solid #ddd'}}>Creator</th>
                <th style={{padding: '8px', border: '1px solid #ddd'}}>Questions</th>
                <th style={{padding: '8px', border: '1px solid #ddd'}}>Actions</th>
            </tr>
        </thead>
        <tbody>
            {quizzes.map(q => (
                <tr key={q._id}>
                    <td style={{padding: '8px', border: '1px solid #ddd'}}>{q.title}</td>
                    <td style={{padding: '8px', border: '1px solid #ddd'}}>{q.user?.name || 'N/A'}</td>
                    <td style={{padding: '8px', border: '1px solid #ddd'}}>{q.questions.length}</td>
                    <td style={{padding: '8px', border: '1px solid #ddd'}}>
                        <button onClick={() => handleDeleteQuiz(q._id)} style={{backgroundColor: '#dc3545'}}>Delete</button>
                    </td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;