const API_BASE = "https://e7e0a73930fd.ngrok-free.app";

function getToken() {
  return "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMCwiZXhwIjoxNzY0OTI2MDU2fQ.kaQM8oYZALFoyyi5xn1uBWxMc-VUpxcjOViBxWJjl9M";
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
      Accept: "application/json",
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
