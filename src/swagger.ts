// swagger.ts
export default {
  openapi: "3.0.0",
  info: {
    title: "API Manajemen Barang",
    version: "1.0.0",
    description: "API untuk mengelola data barang",
  },
  paths: {
    "/items": {
      get: {
        summary: "Get all items",
        responses: {
          200: {
            description: "List of all items",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                      },
                      name: {
                        type: "string",
                      },
                      description: {
                        type: "string",
                      },
                      price: {
                        type: "number",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Create new item",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    description: "Nama item baru",
                  },
                  description: {
                    type: "string",
                    description: "Deskripsi item",
                  },
                  price: {
                    type: "number",
                    description: "Harga item",
                  },
                },
                required: ["name"],
              },
            },
          },
        },
        responses: {
          201: {
            description: "Item created",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                    },
                    item: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                        },
                        name: {
                          type: "string",
                        },
                        description: {
                          type: "string",
                        },
                        price: {
                          type: "number",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/items/{id}": {
      get: {
        summary: "Get item by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
            description: "ID dari item yang dicari",
          },
        ],
        responses: {
          200: {
            description: "Item found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                    },
                    name: {
                      type: "string",
                    },
                    description: {
                      type: "string",
                    },
                    price: {
                      type: "number",
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Item not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
      },
      put: {
        summary: "Update item by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
            description: "ID dari item yang akan diupdate",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    description: "Nama baru untuk item",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Item updated",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
      },
      delete: {
        summary: "Delete item by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
            description: "ID dari item yang akan dihapus",
          },
        ],
        responses: {
          200: {
            description: "Item deleted",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
