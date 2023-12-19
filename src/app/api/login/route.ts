// utils.ts 파일에서 필요한 함수들을 임포트합니다.
import dbConnect from '@/util/db';
import { createResponse, handleErrorResponse } from '@/util/utils';
import { RowDataPacket } from 'mysql2/promise';
import { verifyPassword } from '@/util/bcrpt';

interface Payload {
  login_id: string;
  login_pw: string;
}

export async function POST(request: Request): Promise<Response> {
  const result: any = {}
  const req: Payload = await request.json();
  try {

    const db = await dbConnect();
    const [info]: [RowDataPacket[], any] = await db.query("SELECT login_idx, login_id, login_pw, login_token FROM kmc_login WHERE login_id = ?", [req.login_id]);
    if (info.length === 0) {
      throw ({ message: "아이디가 존재하지 않습니다.", status: 400 });
    }

    const isPwdMath = await verifyPassword(req.login_pw, info[0].login_pw)
    if (isPwdMath !== true) {
      throw ({ message: "비밀번호가 일치하지 않습니다", status: 400 });
    }

    result.info = info[0]

    return createResponse({ data: result });

  } catch (error) {
    return handleErrorResponse(error);
  }
}
