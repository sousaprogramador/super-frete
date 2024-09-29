const recordModel = require('../models/recordModel');
const inputValidator = require('../validators/inputValidator');
const RecordService = require('../services/recordService');

jest.mock('../models/recordModel');
jest.mock('../validators/inputValidator');

describe('RecordService', () => {
  describe('createRecord', () => {
    it('should create a new record and return it', async () => {
      const name = 'Test Record';
      const incrementId = 1;
      const writeResult = { id: '12345' };

      inputValidator.validate.mockReturnValue(true);
      recordModel.getLastIncrementId.mockResolvedValue(incrementId);
      recordModel.addRecord.mockResolvedValue(writeResult);

      const result = await RecordService.createRecord(name);

      expect(inputValidator.validate).toHaveBeenCalledWith(name);
      expect(recordModel.getLastIncrementId).toHaveBeenCalled();
      expect(recordModel.addRecord).toHaveBeenCalledWith({
        name,
        increment_id: incrementId + 1,
      });
      expect(result).toEqual({
        id: writeResult.id,
        name,
        increment_id: incrementId + 1,
      });
    });

    it('should throw an error if name is invalid', async () => {
      const name = '';
      inputValidator.validate.mockReturnValue(false);

      await expect(RecordService.createRecord(name)).rejects.toThrow(
        'Nome é obrigatório'
      );
    });
  });

  describe('getRecord', () => {
    it('should return a record by id', async () => {
      const id = '12345';
      const expectedRecord = { id, name: 'Test Record', increment_id: 1 };

      recordModel.getRecordById.mockResolvedValue(expectedRecord);

      const result = await RecordService.getRecord(id);

      expect(recordModel.getRecordById).toHaveBeenCalledWith(id);
      expect(result).toEqual(expectedRecord);
    });
  });

  describe('updateRecord', () => {
    it('should update a record name', async () => {
      const id = '12345';
      const name = 'Updated Record';

      inputValidator.validate.mockReturnValue(true);

      await RecordService.updateRecord(id, name);

      expect(inputValidator.validate).toHaveBeenCalledWith(name);
      expect(recordModel.updateRecord).toHaveBeenCalledWith(id, { name });
    });

    it('should throw an error if name is invalid', async () => {
      const id = '12345';
      const name = '';

      inputValidator.validate.mockReturnValue(false);

      await expect(RecordService.updateRecord(id, name)).rejects.toThrow(
        'Nome é obrigatório'
      );
    });
  });

  describe('deleteRecord', () => {
    it('should delete a record by id', async () => {
      const id = '12345';

      await RecordService.deleteRecord(id);

      expect(recordModel.deleteRecord).toHaveBeenCalledWith(id);
    });
  });
});
