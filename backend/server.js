import express from 'express';
import cors from 'cors';
import setUpRoutes from './routes.js'; // Adjust the path if necessary

const app = express();
const port = 4000;

app.use(cors()); // Enable CORS for all routes

// Set up routes
setUpRoutes(app);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
