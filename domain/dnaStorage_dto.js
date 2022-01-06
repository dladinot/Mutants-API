const dnaStorageDao = require('./dnaStorage_dao.js');

class DnaStorageDto {
    constructor() {
        //this is intentional
    }
}

DnaStorageDto.prototype.insertDna = dnaStorageDao.insertDna;
DnaStorageDto.prototype.getStats = dnaStorageDao.getStats;

module.exports = DnaStorageDto;