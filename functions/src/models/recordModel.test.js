const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');
const RecordModel = require('../models/recordModel');

jest.mock('firebase-admin/firestore', () => {
  const mockCollection = jest.fn();
  const mockDb = {
    collection: mockCollection,
  };
  return {
    getFirestore: jest.fn(() => mockDb),
  };
});

describe('RecordModel', () => {
  let db;

  beforeAll(() => {
    db = getFirestore();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('addRecord', () => {
    it('should add a record to the collection', async () => {
      const mockData = { name: 'Test Record' };
      const mockAdd = jest.fn().mockResolvedValue({ id: '12345' });
      db.collection.mockReturnValue({ add: mockAdd });

      const result = await RecordModel.addRecord(mockData);

      expect(db.collection).toHaveBeenCalledWith('test_collection');
      expect(mockAdd).toHaveBeenCalledWith(mockData);
      expect(result).toEqual({ id: '12345' });
    });
  });

  describe('getRecordById', () => {
    it('should return a record by ID', async () => {
      const mockId = '12345';
      const mockData = { name: 'Test Record' };
      const mockGet = jest.fn().mockResolvedValue({
        exists: true,
        id: mockId,
        data: () => mockData,
      });
      db.collection.mockReturnValue({ doc: jest.fn(() => ({ get: mockGet })) });

      const result = await RecordModel.getRecordById(mockId);

      expect(db.collection).toHaveBeenCalledWith('test_collection');
      expect(mockGet).toHaveBeenCalled();
      expect(result).toEqual({ id: mockId, ...mockData });
    });

    it('should return null if record does not exist', async () => {
      const mockId = 'unknown';
      const mockGet = jest.fn().mockResolvedValue({ exists: false });
      db.collection.mockReturnValue({ doc: jest.fn(() => ({ get: mockGet })) });

      const result = await RecordModel.getRecordById(mockId);

      expect(result).toBeNull();
    });
  });

  describe('updateRecord', () => {
    it('should update a record by ID', async () => {
      const mockId = '12345';
      const mockData = { name: 'Updated Record' };
      const mockUpdate = jest.fn();
      db.collection.mockReturnValue({
        doc: jest.fn(() => ({ update: mockUpdate })),
      });

      await RecordModel.updateRecord(mockId, mockData);

      expect(db.collection).toHaveBeenCalledWith('test_collection');
      expect(mockUpdate).toHaveBeenCalledWith(mockData);
    });
  });

  describe('deleteRecord', () => {
    it('should delete a record by ID', async () => {
      const mockId = '12345';
      const mockDelete = jest.fn();
      db.collection.mockReturnValue({
        doc: jest.fn(() => ({ delete: mockDelete })),
      });

      await RecordModel.deleteRecord(mockId);

      expect(db.collection).toHaveBeenCalledWith('test_collection');
      expect(mockDelete).toHaveBeenCalled();
    });
  });

  describe('getLastIncrementId', () => {
    it('should return the last increment ID', async () => {
      const mockSnapshot = {
        empty: false,
        docs: [{ data: () => ({ increment_id: 5 }) }],
      };
      const mockGet = jest.fn().mockResolvedValue(mockSnapshot);
      db.collection.mockReturnValue({
        orderBy: jest.fn(() => ({ limit: jest.fn(() => ({ get: mockGet })) })),
      });

      const result = await RecordModel.getLastIncrementId();

      expect(result).toBe(5);
    });

    it('should return 0 if there are no records', async () => {
      const mockSnapshot = { empty: true };
      const mockGet = jest.fn().mockResolvedValue(mockSnapshot);
      db.collection.mockReturnValue({
        orderBy: jest.fn(() => ({ limit: jest.fn(() => ({ get: mockGet })) })),
      });

      const result = await RecordModel.getLastIncrementId();

      expect(result).toBe(0);
    });
  });
});
