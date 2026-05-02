import React, { useState } from 'react';

function AddUser() {
  const [formData, setFormData] = useState({
    uniqueUsername: '',
    name: '',
    branch: '',
    year: '',
    gmail: '',
    codeforces: '',
    leetcode: '',
    codechef: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. Add User
      const userRes = await fetch('/api/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const user = await userRes.json();
      
      // 2. Add Score
      await fetch('/api/leaderboard/auto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user._id,
          codeforces: formData.codeforces,
          leetcode: formData.leetcode,
          codechef: formData.codechef
        }),
      });

      alert('User and score added successfully!');
      window.location.reload(); // Refresh leaderboard
    } catch (err) {
      console.error(err);
      alert('Error adding user');
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial", maxWidth: "500px", margin: "auto" }}>
      <h2 style={{ textAlign: "center" }}>➕ Add New User</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input name="uniqueUsername" placeholder="Unique Username" onChange={handleChange} required />
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="branch" placeholder="Branch" onChange={handleChange} required />
        <input name="year" placeholder="Year of Study" onChange={handleChange} required />
        <input name="gmail" type="email" placeholder="Gmail" onChange={handleChange} required />
        <input name="codeforces" placeholder="Codeforces Handle" onChange={handleChange} required />
        <input name="leetcode" placeholder="LeetCode Handle" onChange={handleChange} />
        <input name="codechef" placeholder="CodeChef Handle" onChange={handleChange} />
        <button type="submit" style={{ padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Add User
        </button>
      </form>
    </div>
  );
}

export default AddUser;
