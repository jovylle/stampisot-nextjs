
// pages/docs.js
'use client';

import { useEffect, useState } from 'react';
import SwaggerUIWrapper from '../../components/SwaggerUIWrapper';

const Docs = () => {
  const [spec, setSpec] = useState(null);

  useEffect(() => {
    fetch('/swagger.json') // Fetch directly from public
      .then(res => res.json())
      .then(data => setSpec(data))
      .catch(error => console.error("Error fetching Swagger spec:", error));
  }, []);

  if (!spec) {
    return <div>Loading Swagger UI...</div>;
  }

  return <SwaggerUIWrapper spec={spec} />; // Use the wrapper component
};

export default Docs;