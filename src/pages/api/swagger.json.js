const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'User API',
    version: '1.0',
    description: 'API documentation for user management',
  },
  paths: {
    '/api/users': {
      get: {
        summary: 'Get all users',
        responses: {
          '200': {
            description: 'Successful operation',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer'
                      },
                      name: { type: 'string'
                      },
                      email: { type: 'string'
                      },
                    },
                  },
                },
              },
            },
          },
          '500': {
            description: 'Internal Server Error',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: { type: 'string'
                    }
                  }
                }
              }
            }
          },
        },
      },
      post: {
        summary: 'Create a new user',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string'
                  },
                  email: { type: 'string'
                  },
                },
                required: ['name', 'email'
                ],
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'User created successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer'
                    },
                    name: { type: 'string'
                    },
                    email: { type: 'string'
                    },
                  },
                },
              },
            },
          },
          '500': {
            description: 'Internal Server Error',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: { type: 'string'
                    }
                  }
                }
              }
            }
          },
        },
      },
      put: {
        summary: 'Update an existing user',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: { type: 'integer'
                  },
                  name: { type: 'string'
                  },
                  email: { type: 'string'
                  },
                },
                required: ['id', 'name', 'email'
                ],
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'User updated successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer'
                    },
                    name: { type: 'string'
                    },
                    email: { type: 'string'
                    },
                  },
                },
              },
            },
          },
          '500': {
            description: 'Internal Server Error',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: { type: 'string'
                    }
                  }
                }
              }
            }
          },
        },
      },
      delete: {
        summary: 'Delete a user',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: { type: 'integer'
                  },
                },
                required: ['id'
                ],
              },
            },
          },
        },
        responses: {
          '204': {
            description: 'User deleted successfully',
          },
          '500': {
            description: 'Internal Server Error',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: { type: 'string'
                    }
                  }
                }
              }
            }
          },
        },
      },
    },
  },
};

export default async function handler(req, res) {
  res.status(200).json(swaggerDocument);
}