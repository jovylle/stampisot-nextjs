// src/pages/api/users/index.js
import pool from '../../../utils/db';

export default async function handler (req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const result = await pool.query('SELECT * FROM users');
        res.status(200).json(result.rows);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;
    case 'POST':
      try {
        const { name, email } = req.body;
        const result = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
        res.status(201).json(result.rows[0]);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;
    case 'PUT':
      try {
        const { id, name, email } = req.body;
        const result = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', [name, email, id]);
        res.status(200).json(result.rows[0]);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;
    case 'DELETE':
      try {
        const { id } = req.body;
        await pool.query('DELETE FROM users WHERE id = $1', [id]);
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
