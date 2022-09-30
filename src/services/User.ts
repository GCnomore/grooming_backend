import Logging from "../library/Logging";
import User, { IUser, IUserModel } from "../model/User";

export async function create(user: IUser) {
  try {
    await User.create(user);
  } catch (error) {
    Logging.error(`create error: ${error}`);
    return null;
  }
}

export async function findByEmail(email: string): Promise<IUserModel | null> {
  try {
    return await User.findOne({ email });
  } catch (error) {
    Logging.error(`findByEmail error: ${error}`);
    return null;
  }
}

export async function findById(_id: string): Promise<IUserModel | null> {
  try {
    return await User.findOne({ _id });
  } catch (error) {
    Logging.error(`findById error: ${error}`);
    return null;
  }
}

export async function update(
  user: IUserModel,
  updatedUser: IUser
): Promise<IUserModel | Error> {
  try {
    user.set(updatedUser);
    return await user.save();
  } catch (error) {
    Logging.error(`update error: ${error}`);
    return new Error(`${error}`);
  }
}

export async function deleteById(_id: string) {
  return User.findByIdAndDelete({ _id });
}
