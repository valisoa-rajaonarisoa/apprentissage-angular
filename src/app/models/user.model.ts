export type UserLoginType = {
  password: string;
  email: string;
};

export type UserRegisterType = {
  username: string;
  password: string;
  email: string;
};

export class UserProfile {
  sub!: string;
  roles!: string[];
  email!: string;
  username!: string;
}
