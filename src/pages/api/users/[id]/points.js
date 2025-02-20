// src/pages/api/users/[id]/points.js
import pool from '/src/utils/db';

export default async function handler (req, res) {
  const { method } = req;
  const userId = req.query.id; // Access userId from query parameters

  switch (method) {
    case 'GET': // Check Points
      try {
        const result = await pool.query('SELECT points FROM LoyaltyCards WHERE userId = $1', [userId]);

        if (result.rows.length === 0) {
          return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ points: result.rows[0].points });

      } catch (error) {
        console.error('Error checking points:', error);
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;

    case 'POST': // Add Points
      try {
        const { points } = req.body; // Access points from request body

        if (!points || typeof points !== 'number') {
          return res.status(400).json({ error: "Invalid points data" });
        }

        await pool.query('BEGIN'); // Start transaction

        try {
          const cardResult = await pool.query('SELECT cardId, points FROM LoyaltyCards WHERE userId = $1', [userId]);
          if (cardResult.rows.length === 0) {
            await pool.query('ROLLBACK');
            return res.status(404).json({ error: "User not found" });
          }
          const cardId = cardResult.rows[0].cardId;
          const currentPoints = cardResult.rows[0].points;
          const newPoints = currentPoints + points;

          await pool.query('UPDATE LoyaltyCards SET points = $1 WHERE cardId = $2', [newPoints, cardId]);
          await pool.query('INSERT INTO Transactions (cardId, pointsChange) VALUES ($1, $2)', [cardId, points]);

          await pool.query('COMMIT');
          res.status(204).end(); // Successful update

        } catch (innerError) {
          await pool.query('ROLLBACK');
          console.error("Error within transaction:", innerError); // Log the inner error
          return res.status(500).json({ error: "Internal Server Error" }); // Return a 500
        }

      } catch (error) {
        console.error('Error adding points:', error);
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
