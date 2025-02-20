import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../../utils/swaggerConfig';

const handler = (req, res) => {
  if (req.method === 'GET') {
    swaggerUi.setup(swaggerSpec)(req, res);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;