import axios from 'axios';

const BASE_URL = `${process.env.EXPO_PUBLIC_API_URL}/user`;

export class UserService {
  async updateUser(payload: any) {
    const url = `${BASE_URL}/update`;
    const { data } = await axios.post(url, payload);
    return data;
  }
}

const userService = new UserService();
export default userService;
