import { viewAllEstablishments } from './controllers/reports_controller.js';

const setUpRoutes = (app) => {
  app.get('/', (req, res) => { res.send("API Main Page") });

  app.get('/estabs', viewAllEstablishments);
};

export default setUpRoutes;
