import { models } from 'database';

class UserController {
  async index(request, response) {
    const users = await models.User.findAll();
    return response.status(200).json(users);
  }
}

export default UserController;
