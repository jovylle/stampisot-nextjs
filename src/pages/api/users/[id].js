
// src/pages/api/users/[id].js (GET user details, PUT update user, DELETE user)
import pool from '/src/utils/db';

export default async function handler (req, res) {
  const { method } = req;
  const userId = req.query.id;

  switch (method) {
    case 'GET': // Get user details
      try {
        const result = await pool.query('SELECT userId, firstName, lastName, phoneNumber, createdAt FROM Users WHERE userId = $1', [userId]);
        if (result.rows.length === 0) {
          return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(result.rows[0]);
      } catch (error) {
        console.error('Error getting user details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;

    case 'PUT': // Update user
      try {
        const { firstName, lastName, phoneNumber } = req.body;

        if (!firstName || !lastName || !phoneNumber) {
          return res.status(400).json({ error: "Missing required fields" });
        }

        const result = await pool.query(
          'UPDATE Users SET firstName = $1, lastName = $2, phoneNumber = $3 WHERE userId = $4 RETURNING userId, firstName, lastName, phoneNumber, createdAt',
          [firstName, lastName, phoneNumber, userId]
        );

        if (result.rowCount === 0) {
          return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(result.rows[0]);

      } catch (error) {
        console.error('Error updating user:', error);
        if (error.code === '23505') { // Check for unique constraint violation (phone number)
          return res.status(400).json({ error: "Phone number already exists" });
        }
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;

    case 'DELETE': // Delete user
      try {
        const result = await pool.query('DELETE FROM Users WHERE userId = $1 RETURNING userId', [userId]);

        if (result.rowCount === 0) {
          return res.status(404).json({ error: "User not found" });
        }

        res.status(204).end(); // 204 No Content

      } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
