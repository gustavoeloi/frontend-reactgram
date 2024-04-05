export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmpassword: string;
  token?: string | null;
  _id?: string;
}

export interface LoginData {
  email: string;
  password: string;
  _id?: string;
}

export interface User {
  name: string;
  bio: string;
  email: string;
  profileImage: string;
  _id: string;
  updatedAt?: Date;
  createdAt?: Date;
}
