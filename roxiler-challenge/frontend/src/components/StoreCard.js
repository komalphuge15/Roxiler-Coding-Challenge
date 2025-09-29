import React from 'react';
import RatingForm from './RatingForm';

export default function StoreCard({ store, onRated }) {
  return (
    <div className="store-card" style={{ border: '1px solid #ccc', padding: 12, marginBottom: 10 }}>
      <h3>{store.name}</h3>
      <div>{store.address}</div>
      <div>Avg rating: {Number(store.avgRating || 0).toFixed(2)}</div>
      <div>Your rating: {store.userRating ?? 'Not rated'}</div>
      <RatingForm storeId={store.id} initial={store.userRating} onRated={onRated} />
    </div>
  );
}
