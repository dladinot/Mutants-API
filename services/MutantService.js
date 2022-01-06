const DnaStorageDto = require('../domain/dnaStorage_dto');
const services = {
    validateDNAString: async function (dnaString) {
        let isHuman =true;
        let response;

        if(validateString(dnaString)){
            const dnaMatrix = getDnaMatrix(dnaString)
            const dnaTestResult = isMutant(dnaMatrix);
            if(dnaTestResult){
                isHuman = false;
                response = { response: { status: 200, message: "OK" } } 
            }
            else{
                response = { error: { status: 403, message: "Forbidden" } }                
            }
            const saveResponse = await saveStats(dnaString,isHuman);
            if (saveResponse?.error){
                return saveResponse;
            }else{
                return response;
            }

        }
        else{
            return { error: { status: 400, message: "Bad Request" } }
        }
    },
    getDNAStats: async function () {
        const dnaStorageDto = new DnaStorageDto();
        try {
            const response = await dnaStorageDto.getStats();
            if (response?.error){
                return response;
            }
            else{
                const humanStats = response.filter(result => result.dnatype == 1);
                const mutantStats = response.filter(result => result.dnatype == 2);
                console.log(humanStats[0].percentage);
                console.log(mutantStats[0].percentage);
                return { count_mutant_dna: (mutantStats[0].percentage*100.00).toFixed(2),  
                         count_human_dna: (humanStats[0].percentage*100.00).toFixed(2), 
                         ratio: (mutantStats[0].percentage).toFixed(2)
                }
            }            

        } catch (error) {
            console.log(error)
            return { error: { status: 500, message: "Error in getDNAStats" } }
        }    
    
    }    

}

module.exports = services;

//function that validates de input of the service 
function validateString(arrayOfStrings) {
    const matrixSize = arrayOfStrings.length
    let validation;
    let arrayOfStringSize = []
    let averageOfStrings;
    for (let dnaString of arrayOfStrings) {
        if (new RegExp("^[ATGC\ATGC]+$").test(dnaString.toUpperCase())) {
            validation = true;
            arrayOfStringSize.push(dnaString.length)
        } else {
            validation = false;
            break;
        }
        
    }
    averageOfStrings = eval(arrayOfStringSize.join('+'))/arrayOfStringSize.length;

    if (averageOfStrings !== matrixSize){
        validation = false;
    }

    return validation;
    
}

//function that returns a DNA matrix based on an array of strings
function getDnaMatrix(arrayOfStrings) {

    let dnaMatrix = []
    for (let dnaString of arrayOfStrings) {
        dnaMatrix.push(dnaString.split(""));
    }
    return dnaMatrix;

}

//function to verify if a DNA chain of protein is mutant or not, traversing the array from 
//left to right, top to bottom, right to left, top left to right bottom and top right to left bottom
//only one ocurrence of the DNA variation is enough to validate if it's a mutant
function isMutant(dnaMatrix) {
    let dnaMutation=false;
    for (let i = 0; i < dnaMatrix.length; i++) {
        for (let j = 0; j < dnaMatrix[0].length; j++) {
            
            if((j+3) < dnaMatrix[0].length){
                if(checkDnaVariation(dnaMatrix[i][j]+dnaMatrix[i][j+1]+dnaMatrix[i][j+2]+dnaMatrix[i][j+3])){
                    dnaMutation = true;
                }
            }

            if((i+3) < dnaMatrix.length){
                if(checkDnaVariation(dnaMatrix[i][j]+dnaMatrix[i+1][j]+dnaMatrix[i+2][j]+dnaMatrix[i+3][j])){
                    dnaMutation = true;
                }
            }

            if( (i+3) < dnaMatrix.length && (j+3) < dnaMatrix[0].length) {
                if(checkDnaVariation(dnaMatrix[i][j]+dnaMatrix[i+1][j+1]+dnaMatrix[i+2][j+2]+dnaMatrix[i+3][j+3])){
                    dnaMutation = true;
                }
            }
            
            if( (j-3) >= 0 &&  i+3 <  dnaMatrix.length) {
                if(checkDnaVariation(dnaMatrix[i][j]+dnaMatrix[i+1][j-1]+dnaMatrix[i+2][j-2]+dnaMatrix[i+3][j-3])){
                    dnaMutation = true;
                }
            }
            
            if(dnaMutation){
                break;
            }
            
        }

        if(dnaMutation){
            break;
        }
        
    }
    return dnaMutation;
}

//function that checks if a protein chain is a mutation based on repeated characters
function checkDnaVariation(protein) {
    protein=protein.toUpperCase();
    return protein.split('').every(char => char === protein[0]);
}

// function that saves the DNA analyzed
async function saveStats(dnaString,isHuman) {
    const dnaStorageDto = new DnaStorageDto();
    let dnaType;

    if(isHuman){
        dnaType = 1;
    }
    else{
        dnaType = 2;
    }

    try {
        const response = await dnaStorageDto.insertDna(dnaString.join(''),dnaType);

        if (response?.error){
            return response;
        }

    } catch (error) {
        console.log(error)
        return { error: { status: 500, message: "Error in saveStats" } }
    }    

}

