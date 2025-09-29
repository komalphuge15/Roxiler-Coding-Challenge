
const { Store, Rating } = require("../models");


async function getUserRatings(req, res) {
  try {
    const userId = req.user.id;
    const ratings = await Rating.findAll({ where: { userId } });
    res.json(ratings);
  } catch (err) {
    console.error("Error fetching user ratings:", err);
    res.status(500).json({ message: err.message });
  }
}

async function submitRating(req, res) {
  try {
    const userId = req.user.id;
    const storeId = req.params.storeId;
    const { score, comment } = req.body;

    if (!score) {
      return res.status(400).json({ message: "Rating score is required" });
    }

    // Fix: map score → rating column
    const rating = await Rating.create({
      userId,
      storeId,
      rating: score,
      comment,
    });

    res.json({ message: "Rating submitted successfully!", rating });
  } catch (err) {
    console.error("Error submitting rating:", err);
    res.status(500).json({ message: err.message });
  }
}

module.exports = { getUserRatings, submitRating };
