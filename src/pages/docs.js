'use client'; // This is crucial!

import { useEffect, useState } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const Docs = () => {
  const [spec, setSpec] = useState(null);

  useEffect(() => {
    fetch('/api/swagger.json')
      .then(res => res.json())
      .then(data => setSpec(data))
      .catch(error => {
        console.error("Error fetching Swagger spec:", error);
        // Handle error, e.g., display an error message
        setSpec(null); // or some default spec if you have one
      });
  }, []);

  if (!spec) {
    return <div>Loading Swagger UI...</div>; // Improved loading message
  }

  return <SwaggerUI spec={spec} />;
};

export default Docs;