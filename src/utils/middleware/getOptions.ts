const getOptions = (method: string): RequestInit => {
  const headers = new Headers();
  if (method === "POST" || method === "PUT") {
    headers.set("Content-type", "application/json");
  }
  headers.set("Accept", "text/plain");

  const options = {
    mode: "cors",
    method: method,
    headers,
  } as RequestInit;

  return options;
};

export default getOptions;
