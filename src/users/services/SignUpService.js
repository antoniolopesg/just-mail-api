import { models } from 'database';

import { HttpException } from 'errors/HttpException';

const { User } = models;

export class SignUpService {
  async signup({ firstName, email, lastName, password, passwordConfirmation }) {
    if (password !== passwordConfirmation) {
      throw new HttpException(422, {
        errors: {
          passwordConfirmation: [
            'password and passwordConfirmation must be the same'
          ]
        }
      });
    }

    return await User.create({
      email,
      password,
      firstName,
      lastName
    });
  }
}
