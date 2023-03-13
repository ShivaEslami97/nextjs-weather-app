export interface FormData {
  enteredEmail?: string;
  enteredPassword?: string;
  enteredConfirmPassword?: string;
}
// export type User = {
//   id: number;
//   email?: string;
//   password: string;
// };

export type User = {
  enteredEmail?: string;
  enteredPassword?: string;
};

export type RegisterResponse = {
  message: string;
};

export type Password = {
  enteredPassword: string;
  userPassword: string;
};
