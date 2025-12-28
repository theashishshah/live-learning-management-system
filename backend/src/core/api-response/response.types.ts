export interface Meta {
    requestId: string;
    timestamp: string;
}

export interface ApiError {
    code: number;
    message: string;
    details?: unknown;
}

export type ApiResponse<T> =
    | {
          success: true;
          data: T | null;
          meta: Meta;
      }
    | {
          success: false;
          error: ApiError;
          meta: Meta;
      };
