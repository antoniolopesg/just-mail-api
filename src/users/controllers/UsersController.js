export class UsersController {
  constructor(signupService) {
    this.signupService = signupService;
  }

  async store(request, response) {
    const {
      user: { firstName, email, lastName, password, passwordConfirmation }
    } = request.body;

    await this.signupService.signup({
      firstName,
      lastName,
      email,
      password,
      passwordConfirmation
    });

    return response.status(201).json({ jwt: 'some jwt token' });
  }
}
