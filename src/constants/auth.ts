const AUTH_FORM_PARAMS = {
  login: {
    title: "Welcome!",
    description: "Proceed with your preferred method to continue",
    link: "/signup",
    linkText: "Sign up",
    footer: {
      text: "Don't have an account?",
      link: "/signup",
      linkText: "Sign up",
    },
  },
  signup: {
    title: "Create an Account",
    description: "Enter your email and password to sign up",
    link: "/login",
    linkText: "Login",
    footer: {
      text: "Already have an account?",
      link: "/login",
      linkText: "Login",
    },
  },
  "forgot-password": {
    title: "Forgot Password?",
    description: "Enter your email to reset your password",
    link: "/login",
    linkText: "Login",
    footer: {
      text: "Remember your password?",
      link: "/login",
      linkText: "Login",
    },
  },
};

export { AUTH_FORM_PARAMS };
