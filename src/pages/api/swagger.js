import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../../utils/swagger';

export default function handler (req, res) {
  if (req.method === 'GET') {
    swaggerUi.serve(req, res, () => {
      swaggerUi.setup(swaggerSpec)(req, res);
    });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};