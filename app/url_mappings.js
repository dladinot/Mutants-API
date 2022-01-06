const app = require('../controllers/appController').app;
const mutantController = require('../controllers/MutantServiceController');

app.post(
    '/mutant',
    mutantController.validateDNA
);

app.get(
    '/stats',
    mutantController.getStats
);

//Health check
app.get('/ping', async (req, res) => { return res.status(200).json({ response: "Pong" }) })

module.exports = app