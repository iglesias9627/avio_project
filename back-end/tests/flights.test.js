import request from 'supertest';
import app from '../app';

describe('Flights Routes', () => {
  // Test for getting all flights
  it('should return a list of flights', async () => {
    const response = await request(app)
      .get('/flights')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // Test for creating a new flight (POST /flights)
  it('should create a new flight', async () => {
    const newFlight = {
      flightNumber: 'ABC123',
      departure: 'New York',
      arrival: 'London',
      date: '2025-02-20T10:00:00Z',
    };

    const response = await request(app)
      .post('/flights')
      .send(newFlight)
      .expect(201);

    expect(response.body).toHaveProperty('flightNumber', newFlight.flightNumber);
    expect(response.body).toHaveProperty('departure', newFlight.departure);
    expect(response.body).toHaveProperty('arrival', newFlight.arrival);
  });

  // Test for missing flight data
  it('should return a 400 error if flight data is missing', async () => {
    const response = await request(app)
      .post('/flights')
      .send({})
      .expect(400);

    expect(response.body.error).toBe('Invalid data');
    expect(response.body.message).toBe('Missing required flight data.');
  });

  // Test for getting a specific flight by ID (GET /flights/:id)
  it('should return a specific flight by ID', async () => {
    const flightId = 1;
    const response = await request(app)
      .get(`/flights/${flightId}`)
      .expect(200);

    expect(response.body).toHaveProperty('id', flightId);
  });

  // Test for flight not found (GET /flights/:id)
  it('should return a 404 error if flight is not found', async () => {
    const flightId = 999;  // Assuming this flight does not exist
    const response = await request(app)
      .get(`/flights/${flightId}`)
      .expect(404);

    expect(response.body.error).toBe('Flight not found');
  });
});
