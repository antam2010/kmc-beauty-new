import Link from "next/link";

export default function Home() {
  return (
    <main className="flex justify-center items-center h-screen bg-gray-100">
      <Link
        href={{
          pathname: "/login",
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        로그인
      </Link>
    </main>
  );
}
