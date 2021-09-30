import { models } from 'database';
const { User } = models;

class UserController {
  async store(request, response) {
    try {
      const { email, password, firstName, lastName } = request.body;
      const user = await User.create({
        email,
        password,
        firstName,
        lastName
      });
      return response.status(201).json(user);
    } catch (err) {
      return response.status(400).json({ error: err });
    }
  }
}

export default UserController;
