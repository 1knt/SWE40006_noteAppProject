const request = require('supertest');
const app = require('../server');

describe('Notes API', () => {
  let createdId;

  test('GET /health returns OK', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('OK');
  });

  test('POST /api/notes creates a note', async () => {
    const res = await request(app)
      .post('/api/notes')
      .send({ title: 'Test Note', body: 'This is a test' });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test Note');
    createdId = res.body.id;
  });

  test('GET /api/notes returns list', async () => {
    const res = await request(app).get('/api/notes');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('PUT /api/notes/:id updates a note', async () => {
    const res = await request(app)
      .put(`/api/notes/${createdId}`)
      .send({ title: 'Updated', body: 'Updated body' });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Updated');
  });

  test('DELETE /api/notes/:id deletes a note', async () => {
    const res = await request(app).delete(`/api/notes/${createdId}`);
    expect(res.statusCode).toBe(200);
  });

  test('POST /api/notes returns 400 if fields missing', async () => {
    const res = await request(app).post('/api/notes').send({ title: '' });
    expect(res.statusCode).toBe(400);
  });
});