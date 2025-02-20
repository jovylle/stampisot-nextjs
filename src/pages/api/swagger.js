import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../../swaggerConfig';

const handler = async (req, res) => {
  await new Promise((resolve, reject) => {
    swaggerUi.setup(swaggerSpec)(req, res, (result) =>
      result instanceof Error ? reject(result) : resolve(result)
    );
  });
};

export default handler;