const ROUTES = {
	HOME: "/",
	SIGN_IN: "/sign-in",
	SIGN_UP: "/sign-up",
  QUESTION: (id: string) => `/question/${id}`,
  ASK_QUESTION: "/ask-question",
	PROFILE: (id: number) => `/profile/${id}`,
	TAGS: (id: string) => `/tags/${id}`,
  SIGN_IN_WITH_OAUTH: "signin-with-oauth",
};

export default ROUTES;
