export type createAccountTypes = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type loginTypes = {
  email: string;
  password: string;
};

export type SignInResponse = {
  message: "Sign in successful.";
  token: string;
  user: {
    id: string;
    fullName: string;
    email: string;
  };
};
