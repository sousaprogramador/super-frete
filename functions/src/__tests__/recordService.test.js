const admin = require('firebase-admin');
const recordService = require('../services/recordService');

jest.mock('firebase-admin', () => {
  const mAdmin = {
    initializeApp: jest.fn(),
    firestore: jest.fn().mockReturnValue({
      collection: jest.fn().mockReturnValue({
        add: jest.fn().mockResolvedValue({
          id: '12345', // Simulando o ID do documento recém-criado
        }),
        orderBy: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({
            get: jest.fn().mockResolvedValue({
              empty: true,
              docs: [],
            }),
          }),
        }),
        doc: jest.fn().mockReturnValue({
          get: jest.fn().mockResolvedValue({
            exists: true,
            id: '12345',
            data: jest.fn().mockReturnValue({
              increment_id: 1,
              name: 'Test Record',
            }),
          }),
          update: jest.fn().mockImplementation(async (updateData) => {
            return Promise.resolve();
          }),
          delete: jest.fn().mockResolvedValue(),
        }),
      }),
    }),
  };
  return mAdmin;
});

describe('Record Service Functions', () => {
  it('should create a record', async () => {
    const name = 'Test Record';
    const createdRecord = await recordService.createRecord(name);

    expect(createdRecord).toEqual({
      id: '12345',
      name: 'Test Record',
      increment_id: 1,
    });
  });

  it('should get a record', async () => {
    const recordId = '12345';
    const record = await recordService.getRecord(recordId);

    expect(record).toEqual({
      id: '12345',
      name: 'Test Record',
      increment_id: 1,
    });
  });

  it('should update a record', async () => {
    admin.firestore().collection('records').doc('12345').get = jest
      .fn()
      .mockResolvedValueOnce({
        exists: true,
        id: '12345',
        data: jest.fn().mockReturnValue({
          increment_id: 1,
          name: 'Updated Record', // Novo nome após a atualização
        }),
      });

    const updatedRecord = await recordService.updateRecord(
      '12345',
      'Updated Record'
    );
    expect(updatedRecord).toEqual({
      id: '12345',
      name: 'Updated Record',
      increment_id: 1,
    });
  });
});
