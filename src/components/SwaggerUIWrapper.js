// components/SwaggerUIWrapper.js (Client Component)
'use client';

import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUIWrapper = ({ spec }) => {
  return <SwaggerUI spec={spec} />;
};

export default SwaggerUIWrapper;

