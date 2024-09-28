const recordModel = require('../models/recordModel');
const inputValidator = require('../validators/inputValidator');

class RecordService {
  async createRecord(name) {
    if (!inputValidator.validate(name)) {
      throw new Error('Nome é obrigatório');
    }

    const incrementId = (await recordModel.getLastIncrementId()) + 1;
    const newRecord = { name, increment_id: incrementId };
    const writeResult = await recordModel.addRecord(newRecord);

    return { id: writeResult.id, ...newRecord };
  }

  async getRecord(id) {
    return await recordModel.getRecordById(id);
  }

  async updateRecord(id, name) {
    if (!inputValidator.validate(name)) {
      throw new Error('Nome é obrigatório');
    }
    await recordModel.updateRecord(id, { name });
  }

  async deleteRecord(id) {
    await recordModel.deleteRecord(id);
  }
}

module.exports = new RecordService();
