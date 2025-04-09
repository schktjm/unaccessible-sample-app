import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center  p-10">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">
        アクセシブルじゃないアプリケーション
      </h1>

      <ul>
        <li>
          <Link href="/bad-calender" className="text-blue-600 underline">
            カレンダーを開く
          </Link>
        </li>
      </ul>
    </div>
  );
}
