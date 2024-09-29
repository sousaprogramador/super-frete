const request = require('supertest');
const express = require('express');
const recordController = require('../controllers/recordController');
const recordService = require('../services/recordService');
const inputValidator = require('../validators/inputValidator');

jest.mock('../services/recordService');
jest.mock('../validators/inputValidator');

const app = express();
app.use(express.json());
app.post('/records', recordController.createRecord);
app.get('/records/:id', recordController.getRecord);
app.put('/records/:id', recordController.updateRecord);
app.delete('/records/:id', recordController.deleteRecord);

describe('Record Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('POST /records', () => {
    it('should create a new record', async () => {
      const name = 'Test Record';
      const mockResponse = { id: '12345', name, increment_id: 1 };

      recordService.createRecord.mockResolvedValue(mockResponse);
      inputValidator.validate.mockReturnValue(true);

      const response = await request(app).post('/records').send({ name });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        message: 'Registro criado com sucesso.',
        ...mockResponse,
      });
    });

    it('should return an error if name is invalid', async () => {
      const name = '';

      inputValidator.validate.mockReturnValue(false);

      const response = await request(app).post('/records').send({ name });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: 'Nome é obrigatório' });
    });
  });

  describe('GET /records/:id', () => {
    it('should return a record by id', async () => {
      const id = '12345';
      const mockRecord = { id, name: 'Test Record', increment_id: 1 };

      recordService.getRecord.mockResolvedValue(mockRecord);

      const response = await request(app).get(`/records/${id}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockRecord);
    });

    it('should return 404 if record not found', async () => {
      const id = 'unknown';

      recordService.getRecord.mockResolvedValue(null);

      const response = await request(app).get(`/records/${id}`);

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Registro não encontrado' });
    });
  });

  describe('PUT /records/:id', () => {
    it('should update a record', async () => {
      const id = '12345';
      const name = 'Updated Record';

      inputValidator.validate.mockReturnValue(true);
      recordService.updateRecord.mockResolvedValue();

      const response = await request(app).put(`/records/${id}`).send({ name });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: 'Registro atualizado com sucesso.',
      });
    });

    it('should return an error if name is invalid', async () => {
      const id = '12345';
      const response = await request(app)
        .put(`/records/${id}`)
        .send({ name: '' });

      inputValidator.validate.mockReturnValue(false);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: 'Nome é obrigatório' });
    });
  });

  describe('DELETE /records/:id', () => {
    it('should delete a record', async () => {
      const id = '12345';

      recordService.deleteRecord.mockResolvedValue();

      const response = await request(app).delete(`/records/${id}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: 'Registro deletado com sucesso.',
      });
    });
  });
});
