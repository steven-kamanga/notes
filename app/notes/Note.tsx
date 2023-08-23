import Link from "next/link";

export default function Note({ note }: any) {
  const { id, title, content, created_at } = note || {};
  return (
    <main>
      <div className="bg-gray-50">
        <div className="justify-center bg-yellow-300 p-5 m-2 shadow-md font-semibold">
          <Link href={`/notes/${id}`}>
            <div className="space-y-2">
              <h1 className="text-xl">{title}</h1>
              <h3 className="text-sm">{content}</h3>
              <p className=" text-[10px]">{created_at}</p>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
