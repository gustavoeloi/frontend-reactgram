export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmpassword: string;
  _id?: string;
}

export interface LoginData {
  email: string;
  password: string;
  _id?: string;
}
