import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig
} from 'axios';

export class HttpError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

/** @deprecated Use HttpError */
export const FetchError = HttpError;

type ApiErrorBody = {
  error?: string;
};

function toHttpError(error: AxiosError<ApiErrorBody>): HttpError {
  const status = error.response?.status ?? 0;
  const message =
    error.response?.data?.error ??
    error.message ??
    `Request failed with status ${status}`;
  return new HttpError(message, status);
}

function createApiClient(): AxiosInstance {
  const client = axios.create({
    baseURL: '',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    timeout: 30_000
  });

  client.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ApiErrorBody>) => {
      throw toHttpError(error);
    }
  );

  return client;
}

export const apiClient = createApiClient();

export async function apiGet<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  const { data } = await apiClient.get<T>(url, config);
  return data;
}

export async function apiPost<T>(
  url: string,
  body?: unknown,
  config?: AxiosRequestConfig
): Promise<T> {
  const { data } = await apiClient.post<T>(url, body, config);
  return data;
}

export async function apiPut<T>(
  url: string,
  body?: unknown,
  config?: AxiosRequestConfig
): Promise<T> {
  const { data } = await apiClient.put<T>(url, body, config);
  return data;
}
