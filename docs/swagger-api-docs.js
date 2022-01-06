/**
 *  @swagger
 *  /mutant:
 *  post:
 *    description: validates a DNA string chain for mutation in the DNA
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: request
 *        description: >
 *          dna element:
 *           * `*` - Only allowed characters such as A, T, C, G
 *           * `*` - Not allowed special characters or numbers inside the array
 *           * `*` - Only allowed array of Size NxN, meaning equal numbers of elements as in the DNA string of each element
 *        schema:
 *          type: object
 *          properties:
 *            dna:
 *             type: array
 *             items:
 *               type: string
 *          example:
 *            dna :["ATGCGA","CAGTGC","TTATAT","AGAAGG","CACCTA","TCACTG"]
 *    responses:
 *      200:
 *        description: ADN chains matches a mutant
 *        examples:
 *          application/json: 
 *              {"response": {
 *                 "status": 200,
 *                 "message": "OK"
 *              }}
 *      403:
 *        description: ADN chains matches a human
 *        examples:
 *          application/json: 
 *              {"response": {
 *                 "status": 403,
 *                 "message": "Forbidden"
 *              }}
 *      500:
 *        description: Error in backend, saveStats
 *        examples:
 *          application/json: 
 *              {"error": {
 *                  "status": 500,
 *                  "message": "Error in saveStats"
 *              }}
 *      503:
 *        description: Error in database at store procedure SP_INSERT_DNA
 *        examples:
 *          application/json: 
 *            {"error": {
 *               "message": "Unexpected error in insertDna ",
 *               "status": 503
 *            }}
 */


/**
 *  @swagger
 *  /stats:
 *  get:
 *    description: Returns stats for the current DNA chains stored in the database
 *    responses:
 *      200:
 *        description: Success
 *        examples:
 *          application/json: 
 *              {
 *                 "count_mutant_dna": "100.00",
 *                 "count_human_dna": "0.00",
 *                 "ratio": "1.00"
 *              }
 *      500:
 *        description: Error in backend, getDNAStats
 *        examples:
 *          application/json: 
 *              {"error": {
 *                  "status": 500,
 *                  "message": "Error in getDNAStats"
 *              }}
 *      503:
 *        description: Error in database function FN_GET_STATS()
 *        examples:
 *          application/json: 
 *              {"error": {
 *                  "status": 503,
 *                  "message": "Unexpected error in getStats"
 *              }}
 * 
 */