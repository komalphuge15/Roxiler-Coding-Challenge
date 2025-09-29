import React, { useEffect, useState } from "react";
import { getStores, getUserRatings, submitRating } from "../api/api";
import RatingForm from "../components/RatingForm";
import Navbar from "../components/Navbar";
import "./Dashboard.css";

const UserDashboard = () => {
  const token = localStorage.getItem("token");
  const [stores, setStores] = useState([]);
  const [userRatings, setUserRatings] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchStores();
    fetchUserRatings();

  }, []);

  const fetchStores = async () => {
    try {
      const res = await getStores(token);
      setStores(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUserRatings = async () => {
    try {
      const res = await getUserRatings(token);
      const ratingsMap = {};
      res.data.forEach((r) => {
        ratingsMap[r.storeId] = r.score; 
      });
      setUserRatings(ratingsMap);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitRating = async (storeId, score) => {
    try {
      await submitRating(storeId, { storeId, score }, token);
      alert("Rating submitted successfully!");
      fetchUserRatings();
    } catch (err) {
      console.error(err);
      alert("Failed to submit rating");
    }
  };

  const filteredStores = stores.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h2>User Dashboard</h2>
        <input
          placeholder="Search by Name/Address"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "5px", marginBottom: "10px", width: "300px" }}
        />
        <ul style={{ listStyle: "none", padding: 0 }}>
          {filteredStores.map((store) => (
            <li key={store.id} style={{ marginBottom: "15px", border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
              <p>
                <b>{store.name}</b> | {store.address} | Avg Rating: {store.avgRating || 0}
              </p>
              <RatingForm
                currentRating={userRatings[store.id] || 0}
                onSubmit={(score) => handleSubmitRating(store.id, score)}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default UserDashboard;
