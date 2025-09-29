import React, { useEffect, useState } from "react";
import { getStores, getStoreRatings } from "../api/api";
import Navbar from "../components/Navbar";
import "./Dashboard.css";

const OwnerDashboard = () => {
  const token = localStorage.getItem("token");
  const [store, setStore] = useState(null);
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const res = await getStores(token);
      const myStore = res.data.find(s => s.ownerEmail === localStorage.getItem("email"));
      setStore(myStore);
      if (myStore) fetchRatings(myStore.id);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRatings = async (storeId) => {
    try {
      const res = await getStoreRatings(storeId, token);
      setRatings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const avgRating = ratings.length 
    ? (ratings.reduce((sum, r) => sum + r.score, 0) / ratings.length).toFixed(2) 
    : 0;

  return (
    <div>
      <Navbar />
      <h2>Store Owner Dashboard</h2>
      {store ? (
        <div>
          <h3>{store.name}</h3>
          <p>Address: {store.address}</p>
          <p>Average Rating: {avgRating}</p>
          <h4>User Ratings:</h4>
          {ratings.length > 0 ? (
            <ul>
              {ratings.map(r => (
                <li key={r.id}>
                  {r.userName} | Rating: {r.score} {r.comment && `| Comment: ${r.comment}`}
                </li>
              ))}
            </ul>
          ) : (
            <p>No ratings yet</p>
          )}
        </div>
      ) : (
        <p>No store assigned to you</p>
      )}
    </div>
  );
};

export default OwnerDashboard;
