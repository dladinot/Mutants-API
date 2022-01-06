const mutantService = require('../services/MutantService.js');
const controller = {
    validateDNA: async (req, res) => {         
        const dnaString =req.body.dna;
        const response = await mutantService.validateDNAString(dnaString);

        if (response?.error) {
            return res.status(response.error.status).json(response);
        }
        return res.json(response)

    },
    getStats: async (req, res) => {         
        const response = await mutantService.getDNAStats();

        if (response?.error) {
            return res.status(response.error.status).json(response);
        }
        return res.json(response)    
    }

};

module.exports = controller;