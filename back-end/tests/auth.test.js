import request from 'supertest';
import app from '../app.js';
import { auth } from '../config/firebase.js';

describe('Authentication Routes', () => {
  // Test for successful authentication
  it('should authenticate the user and return a token', async () => {
    const userCredentials = {
      email: 'user@example.com',
      password: 'password123'
    };

    const response = await request(app)
      .post('/auth')
      .send(userCredentials)
      .expect(200);

    expect(response.body.message).toBe('Authentication successful');
    expect(response.body.token).toBeDefined();
    expect(response.body.user).toHaveProperty('uid');
    expect(response.body.user).toHaveProperty('email', userCredentials.email);
  });

  // Test for missing email
  it('should return a 400 error when email is missing', async () => {
    const response = await request(app)
      .post('/auth')
      .send({ password: 'password123' })
      .expect(400);

    expect(response.body.error).toBe('Invalid payload');
    expect(response.body.message).toBe('Email and password are required.');
  });

  // Test for missing password
  it('should return a 400 error when password is missing', async () => {
    const response = await request(app)
      .post('/auth')
      .send({ email: 'user@example.com' })
      .expect(400);

    expect(response.body.error).toBe('Invalid payload');
    expect(response.body.message).toBe('Email and password are required.');
  });

  // Test for invalid credentials
  it('should return a 400 error for invalid credentials', async () => {
    const response = await request(app)
      .post('/auth')
      .send({ email: 'user@example.com', password: 'wrongpassword' })
      .expect(400);

    expect(response.body.error).toBe('Authentication failed');
    expect(response.body.message).toBe('Invalid payload.');
  });

  // Test for server error
  it('should return a 500 error for internal server issues', async () => {
    // Simulate server error
    jest.spyOn(auth, 'signInWithEmailAndPassword').mockRejectedValueOnce(new Error('Firebase error'));
    
    const response = await request(app)
      .post('/auth')
      .send({ email: 'user@example.com', password: 'password123' })
      .expect(500);

    expect(response.body.error).toBe('Something went wrong');
    expect(response.body.message).toBe('An unknown error occurred during authentication.');
  });
});

