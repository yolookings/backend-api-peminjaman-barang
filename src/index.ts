import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger";

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;

// Dummy data
const items = [
  {
    id: "1",
    name: "Laptop",
    description: "MacBook Pro 2023",
    price: 1999.99,
  },
  {
    id: "2",
    name: "Smartphone",
    description: "iPhone 15 Pro",
    price: 999.99,
  },
  {
    id: "3",
    name: "Headphones",
    description: "Sony WH-1000XM4",
    price: 349.99,
  },
];

// Middleware
app.use(express.json());

// Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.get("/items", (_req: Request, res: Response) => {
  res.json(items);
});

app.get("/items/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const item = items.find((item) => item.id === id);

  if (!item) {
    res.status(404).json({ message: "Item not found" });
    return;
  }

  res.json(item);
});

app.put("/items/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  const itemIndex = items.findIndex((item) => item.id === id);

  if (itemIndex === -1) {
    res.status(404).json({ message: "Item not found" });
    return;
  }

  items[itemIndex] = {
    ...items[itemIndex],
    name: name || items[itemIndex].name,
    description: description || items[itemIndex].description,
    price: price || items[itemIndex].price,
  };

  res.json(items[itemIndex]);
});

app.post("/items", (req: Request, res: Response) => {
  const { name, description, price } = req.body;
  const newItem = {
    id: Math.random().toString(36).substr(2, 9),
    name,
    description,
    price,
  };

  items.push(newItem);

  res.status(201).json({
    message: "Item created successfully",
    item: newItem,
  });
});

app.delete("/items/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const itemIndex = items.findIndex((item) => item.id === id);

  if (itemIndex === -1) {
    res.status(404).json({ message: "Item not found" });
    return;
  }

  items.splice(itemIndex, 1);
  res.json({ message: `Item with ID: ${id} has been deleted` });
});

// Start Server with Better Error Handling
const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Handling Error When Port is Already in Use
server.on("error", (error: any) => {
  if (error.code === "EADDRINUSE") {
    console.log(`Port ${port} is busy, trying ${port + 1}`);
    app.listen(port + 1, () => {
      console.log(`Server running at http://localhost:${port + 1}`);
    });
  } else {
    console.error("Error starting server:", error);
  }
});
