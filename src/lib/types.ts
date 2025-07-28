export type ApiResponse<T> = {
  data?: T;
  message?: string;
  status?: "success" | "error";
};
