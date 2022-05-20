import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const userAskingForList = this.usersRepository.findById(user_id);
    if (!userAskingForList || !userAskingForList.admin) {
      throw new Error(
        "Listing of users forbidden because client user could not be found or is not admin."
      );
    }
    return this.usersRepository.list();
  }
}

export { ListAllUsersUseCase };
