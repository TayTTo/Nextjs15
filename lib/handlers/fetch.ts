interface FetchOptions extends RequestInit {
	timeout?: number;
}

const fetchHandler = async <T>(
	url: string,
	options: FetchOptions = {},
): Promise<T> => {
	const {
		timeout = 5000,
		headers: customHeaders = {},
		...restOptions
	} = options;
  const controller = new AbortController();
  const timeoutID = setTimeout(() => controller.abort(), timeout);

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  }

  const headers: HeadersInit = {
    ...defaultHeaders,
    ...customHeaders,
  };
  const config: RequestInit = {
    ...restOptions,
    headers: headers,
    signal: controller.signal,
  };

  try {
    const response = await fetch(url, config);
    clearTimeout(timeoutID);
    return response.json()
  }
  catch (error) {
    throw new Error("Fetch Error")
  }
};

export default fetchHandler;
