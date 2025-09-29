import React, { useState } from "react";

const RatingForm = ({ currentRating = 0, onSubmit }) => {
  const [selectedRating, setSelectedRating] = useState(currentRating);

  const handleClick = (rating) => {
    setSelectedRating(rating);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
      {[1, 2, 3, 4, 5].map((r) => (
        <span
          key={r}
          onClick={() => handleClick(r)}
          style={{ cursor: "pointer", color: r <= selectedRating ? "#f59e0b" : "#ccc", fontSize: "20px" }}
        >
          ★
        </span>
      ))}
      <button onClick={() => onSubmit(selectedRating)} style={{ marginLeft: "10px" }}>
        Submit
      </button>
    </div>
  );
};

export default RatingForm;
