import { RowDataPacket } from "mysql2/promise";

interface Result {
  message: string;
  data?: RowDataPacket[] | null;
}

export function createResponse(message: string, status: number, data: RowDataPacket[] | null): Response {
  const result: Result = { message, data };
  return new Response(JSON.stringify(result), { status });
}

export function handleErrorResponse(error: any): Response {
  const status = error.status || 500;
  const message = error.message || "Internal Server Error";
  return createResponse(message, status, null);
}
