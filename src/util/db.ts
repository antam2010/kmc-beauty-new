import mysql, { Pool } from 'mysql2/promise';

// 환경 변수를 검증하고 데이터베이스 연결 풀을 생성하는 함수
const createDatabasePool = (): Pool => {
  const {
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DB
  } = process.env;

  // 환경 변수 유효성 검사
  if (!MYSQL_HOST || !MYSQL_PORT || !MYSQL_USER || !MYSQL_PASSWORD || !MYSQL_DB) {
    throw new Error("환경 변수가 설정되지 않았습니다. MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB를 확인하세요.");
  }

  // 데이터베이스 연결 풀 생성
  const pool = mysql.createPool({
    host: MYSQL_HOST,
    port: Number(MYSQL_PORT),
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DB
  });

  return pool;
};

// 연결 풀을 전역 변수로 저장하여 재사용
let connection: Pool;

// 데이터베이스 연결을 설정하고 연결 풀을 반환하는 함수
export default async function dbConnect(): Promise<Pool> {
  if (!connection) {
    connection = createDatabasePool();
  }
  return connection;
}
