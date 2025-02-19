import pool from '../../../utils/db';

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Fetches all users from the database.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: John Doe
 *                   email:
 *                     type: string
 *                     example: john@example.com
 *   post:
 *     summary: Create a new user
 *     description: Adds a new user to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jane Doe
 *               email:
 *                 type: string
 *                 example: jane@example.com
 *     responses:
 *       201:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 2
 *                 name:
 *                   type: string
 *                   example: Jane Doe
 *                 email:
 *                   type: string
 *                   example: jane@example.com
 *   put:
 *     summary: Update an existing user
 *     description: Modifies user details in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: Updated Name
 *               email:
 *                 type: string
 *                 example: updated@example.com
 *     responses:
 *       200:
 *         description: User updated successfully.
 *   delete:
 *     summary: Delete a user
 *     description: Removes a user from the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       204:
 *         description: User deleted successfully.
 */

export default async function handler (req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const result = await pool.query('SELECT * FROM "User"');
        res.status(200).json(result.rows);
      } catch (error) {
        console.error('Error during GET request:', error); // Log the error details
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;
    case 'POST':
      try {
        const { name, email } = req.body;
        const result = await pool.query('INSERT INTO "User" (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
        res.status(201).json(result.rows[0]);
      } catch (error) {
        console.error('Error during POST request:', error); // Log the error details
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;
    case 'PUT':
      try {
        const { id, name, email } = req.body;
        const result = await pool.query('UPDATE "User" SET name = $1, email = $2 WHERE id = $3 RETURNING *', [name, email, id]);
        res.status(200).json(result.rows[0]);
      } catch (error) {
        console.error('Error during PUT request:', error); // Log the error details
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;
    case 'DELETE':
      try {
        const { id } = req.body;
        await pool.query('DELETE FROM "User" WHERE id = $1', [id]);
        res.status(204).end();
      } catch (error) {
        console.error('Error during DELETE request:', error); // Log the error details
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}