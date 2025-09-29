import React, { useEffect, useState } from "react";
import * as API from "../api/api";
import Navbar from "../components/Navbar";
import "./Dashboard.css";


const AdminDashboard = () => {
  const token = localStorage.getItem("token");
  const [stats, setStats] = useState({ users: 0, stores: 0, ratings: 0 });
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [filter, setFilter] = useState({ type: "user", query: "" });

  const [newUser, setNewUser] = useState({ name: "", email: "", address: "", password: "", role: "user" });
  const [newStore, setNewStore] = useState({ name: "", email: "", address: "" });

  useEffect(() => {
    fetchStats();
    fetchUsers();
    fetchStores();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.getAdminStats(token);
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await API.getUsers(token);
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStores = async () => {
    try {
      const res = await API.getStores(token);
      setStores(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await API.addUser(newUser, token);
      setNewUser({ name: "", email: "", address: "", password: "", role: "user" });
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddStore = async (e) => {
    e.preventDefault();
    try {
      await API.addStore(newStore, token);
      setNewStore({ name: "", email: "", address: "" });
      fetchStores();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <h2>Admin Dashboard</h2>

        <div className="stats-container">
          <div className="stat-card">Total Users: {stats.users}</div>
          <div className="stat-card">Total Stores: {stats.stores}</div>
          <div className="stat-card">Total Ratings: {stats.ratings}</div>
        </div>

        <div className="forms-container">
          <div className="form-card">
            <h3>Add User</h3>
            <form onSubmit={handleAddUser}>
              <input placeholder="Name" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} required />
              <input placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} required />
              <input placeholder="Address" value={newUser.address} onChange={(e) => setNewUser({ ...newUser, address: e.target.value })} />
              <input placeholder="Password" type="password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} required />
              <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="store_owner">Store Owner</option>
              </select>
              <button type="submit">Add User</button>
            </form>
          </div>

          <div className="form-card">
            <h3>Add Store</h3>
            <form onSubmit={handleAddStore}>
              <input placeholder="Name" value={newStore.name} onChange={(e) => setNewStore({ ...newStore, name: e.target.value })} required />
              <input placeholder="Email" value={newStore.email} onChange={(e) => setNewStore({ ...newStore, email: e.target.value })} required />
              <input placeholder="Address" value={newStore.address} onChange={(e) => setNewStore({ ...newStore, address: e.target.value })} />
              <button type="submit">Add Store</button>
            </form>
          </div>
        </div>

        <div className="lists-container">
          <div className="list-card">
            <h3>Users List</h3>
            <input placeholder="Filter Users by Name/Email" onChange={(e) => setFilter({ type: "user", query: e.target.value })} />
            <ul>
              {users.filter(u => u.name.includes(filter.query) || u.email.includes(filter.query)).map(u => (
                <li key={u.id}>{u.name} | {u.email} | {u.role}</li>
              ))}
            </ul>
          </div>

          <div className="list-card">
            <h3>Stores List</h3>
            <input placeholder="Filter Stores by Name/Email" onChange={(e) => setFilter({ type: "store", query: e.target.value })} />
            <ul>
              {stores.filter(s => s.name.includes(filter.query) || s.email.includes(filter.query)).map(s => (
                <li key={s.id}>{s.name} | {s.email} | {s.address}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
