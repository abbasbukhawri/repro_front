const API_BASE = "https://0130b6a577ce.ngrok-free.app";

function getToken() {
  return "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMCwiZXhwIjoxNzY0NDA3NDA5fQ.RHLiFJyk8f1h0aCzLkFgNIkgDN8mHn5QsxI2L0_kyQc";
}

export async function getRequest<T>(path: string): Promise<T> {
  const token = getToken();

  const res = await fetch(`${API_BASE}${path}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `GET ${path} failed with ${res.status}`);
  }

  return res.status !== 204 ? res.json() : ({} as T);
}

export async function postRequest<T>(path: string, body?: unknown): Promise<T> {
  const token = getToken();

  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `POST ${path} failed with ${res.status}`);
  }

  return res.status !== 204 ? res.json() : ({} as T);
}


export async function patchRequest<T>(path: string, body?: unknown): Promise<T> {
  const token = getToken();

  const res = await fetch(`${API_BASE}${path}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `PATCH ${path} failed with ${res.status}`);
  }

  return res.status !== 204 ? res.json() : ({} as T);
}
