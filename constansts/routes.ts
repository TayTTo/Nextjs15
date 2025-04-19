const ROUTES = {
	HOME: "/",
	SIGN_IN: "/sign-in",
	SIGN_UP: "/sign-up",
  QUESTION: (id: string) => `/question/${id}`,
  ASK_QUESTION: "/ask-question",
	PROFILE: (id: number) => `/profile/${id}`,
	TAGS: (id: string) => `/tags/${id}`,
};

export default ROUTES;
