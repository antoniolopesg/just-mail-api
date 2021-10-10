import request from 'supertest';
import database from '../../../database';
import app from '../../../src/app';

describe('POST /api/users/signup', () => {
  afterAll(async () => {
    await database.truncate();
    await database.close();
  });

  beforeAll(async () => {
    await database.sync({ force: true });
  });

  beforeEach(async () => {
    await database.truncate();
  });

  it('should be able to signup if send correct body payload', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send({
        user: {
          email: 'mail@justmail.com',
          password: 'strong-password',
          firstName: 'valid firstName',
          lastName: 'valid lastName',
          passwordConfirmation: 'strong-password'
        }
      });

    expect(response.statusCode).toBe(201);
  });

  it('should returns 422 if no email is provided', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send({
        user: {
          password: 'strong-password',
          firstName: 'valid firstName',
          lastName: 'valid lastName',
          passwordConfirmation: 'strong-password'
        }
      });

    expect(response.statusCode).toBe(422);
  });

  it('should returns 422 if email is not a valid email', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send({
        user: {
          email: 'mailcu.com',
          password: 'strong-password',
          firstName: 'valid firstName',
          lastName: 'valid lastName',
          passwordConfirmation: 'strong-password'
        }
      });

    expect(response.statusCode).toBe(422);
    expect(response.body).toEqual({
      errors: {
        email: ['email is not valid', 'email must use justmail.com domain']
      }
    });
  });

  it('should returns 422 if email is provided but no use correct domain', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send({
        user: {
          email: 'mail@anotherdomain.com',
          password: 'strong-password',
          firstName: 'valid firstName',
          lastName: 'valid lastName',
          passwordConfirmation: 'strong-password'
        }
      });

    expect(response.statusCode).toBe(422);
    expect(response.body).toEqual({
      errors: {
        email: ['email must use justmail.com domain']
      }
    });
  });

  it('should returns 422 if email already in use', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        user: {
          email: 'mail@justmail.com',
          password: 'strong-password',
          firstName: 'valid firstName',
          lastName: 'valid lastName',
          passwordConfirmation: 'strong-password'
        }
      });

    const response = await request(app)
      .post('/api/users/signup')
      .send({
        user: {
          email: 'mail@justmail.com',
          password: 'strong-password',
          firstName: 'valid firstName',
          lastName: 'valid lastName',
          passwordConfirmation: 'strong-password'
        }
      });

    expect(response.statusCode).toBe(422);
    expect(response.body).toEqual({
      errors: {
        email: ['email already in use']
      }
    });
  });

  it('should returns 422 if no firstName is provided', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send({
        user: {
          email: 'mail@justmail.com',
          password: 'strong-password',
          lastName: 'valid lastName',
          passwordConfirmation: 'strong-password'
        }
      });

    expect(response.statusCode).toBe(422);
    expect(response.body).toEqual({
      errors: {
        firstName: ['firstName is required']
      }
    });
  });

  it('should returns 422 if firstName is not at least 3 characters', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send({
        user: {
          email: 'mail@justmail.com',
          password: 'strong-password',
          firstName: '',
          lastName: 'valid lastName',
          passwordConfirmation: 'strong-password'
        }
      });

    expect(response.statusCode).toBe(422);
    expect(response.body).toEqual({
      errors: {
        firstName: ['firstName must contain at least 3 characters']
      }
    });
  });

  it('should returns 422 if no lastName is provided', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send({
        user: {
          email: 'mail@justmail.com',
          firstName: 'valid firstName',
          password: 'strong-password',
          passwordConfirmation: 'strong-password'
        }
      });

    expect(response.statusCode).toBe(422);
    expect(response.body).toEqual({
      errors: {
        lastName: ['lastName is required']
      }
    });
  });

  it('should returns 422 if lastName is not at least 3 characters', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send({
        user: {
          email: 'mail@justmail.com',
          password: 'strong-password',
          firstName: 'valid firstName',
          lastName: '',
          passwordConfirmation: 'strong-password'
        }
      });

    expect(response.statusCode).toBe(422);
    expect(response.body).toEqual({
      errors: {
        lastName: ['lastName must contain at least 3 characters']
      }
    });
  });

  it('should returns 422 if password and passwordConfirmation is not the same', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send({
        user: {
          email: 'mail@anotherdomain.com',
          firstName: 'valid firstName',
          lastName: 'valid lastName',
          passwordConfirmation: 'strong-password'
        }
      });

    expect(response.statusCode).toBe(422);
    expect(response.body).toEqual({
      errors: {
        passwordConfirmation: [
          'password and passwordConfirmation must be the same'
        ]
      }
    });
  });

  it('should returns 422 if password is not provided', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send({
        user: {
          email: 'mail@justmail.com',
          firstName: 'valid firstName',
          lastName: 'valid lastName'
        }
      });

    expect(response.statusCode).toBe(422);
    expect(response.body).toEqual({
      errors: {
        password: ['password is required']
      }
    });
  });

  it('should returns 422 if password is not at least 8 characters', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send({
        user: {
          email: 'mail@justmail.com',
          password: 'invalid',
          firstName: 'valid firstName',
          lastName: 'valid lastName',
          passwordConfirmation: 'invalid'
        }
      });

    expect(response.statusCode).toBe(422);
    expect(response.body).toEqual({
      errors: {
        password: ['password must contain at least 8 characters']
      }
    });
  });

  it('should returns 422 if password is not provided', async () => {
    const response = await request(app).post('/api/users/signup').send();

    expect(response.statusCode).toBe(422);
    expect(response.body).toEqual({
      errors: {
        email: ['email is required'],
        firstName: ['firstName is required'],
        lastName: ['lastName is required'],
        password: ['password is required']
      }
    });
  });
});
