// src/pages/api/users/index.js (GET all users, POST create user)
import pool from '/src/utils/db';

export default async function handler (req, res) {
  const { method } = req;

  switch (method) {
    case 'GET': // Get all users
      try {
        const result = await pool.query('SELECT userId, firstName, lastName, phoneNumber, createdAt FROM Users');
        res.status(200).json(result.rows);
      } catch (error) {
        console.error('Error getting all users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;

    case 'POST': // Create a new user
      try {
        const { firstName, lastName, phoneNumber } = req.body;

        if (!firstName || !lastName || !phoneNumber) {
          return res.status(400).json({ error: "Missing required fields" });
        }

        const result = await pool.query(
          'INSERT INTO Users (firstName, lastName, phoneNumber) VALUES ($1, $2, $3) RETURNING userId, firstName, lastName, phoneNumber, createdAt',
          [firstName, lastName, phoneNumber]
        );

        res.status(201).json(result.rows[0]); // 201 Created

      } catch (error) {
        console.error('Error creating user:', error);
        if (error.code === '23505') { // Check for unique constraint violation (phone number)
          return res.status(400).json({ error: "Phone number already exists" });
        }
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}


