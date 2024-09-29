const firestoreMock = {
  collection: jest.fn().mockReturnThis(),
  add: jest.fn(),
  doc: jest.fn().mockReturnThis(),
  get: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  orderBy: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  data: jest.fn(),
};

const getFirestore = jest.fn(() => firestoreMock);

const initializeApp = jest.fn();

module.exports = {
  initializeApp,
  getFirestore,
};
