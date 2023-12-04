// utils.ts 파일에서 필요한 함수들을 임포트합니다.
import dbConnect from '@/util/db';
import { createResponse, handleErrorResponse } from '@/util/utils';
import { RowDataPacket } from 'mysql2/promise';

interface Payload {
  login_id: string;
  login_pw: string;
}

export async function POST(request: Request): Promise<Response> {
  const req: Payload = await request.json();
  
  try {
    const db = await dbConnect();
    const [chkRow]: [RowDataPacket[], any] = await db.query(
      "SELECT COUNT(*) AS cnt FROM kmc_login WHERE login_id = ?",
      [req.login_id]
    );

    if (chkRow[0].cnt === 0) {
      return createResponse("회원이 존재하지 않습니다.", 404, null);
    }

    const [rows]: [RowDataPacket[], any] = await db.query(
        "SELECT * FROM kmc_login WHERE login_id = ? AND login_pw = ?",
        [req.login_id, req.login_pw]
    );
    console.log(rows);

    return createResponse("Data retrieved successfully", 200, chkRow);
  } catch (error) {
    return handleErrorResponse(error);
  }
}
