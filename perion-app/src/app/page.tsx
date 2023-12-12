import { writeFile } from "fs/promises";
import { join } from "path";

export default function Home() {
  // const upload = async (data: FormData) => {
  //   'use server';
  //   const file: File | null = data.get('file') as unknown as File;

  //   if (!file) {
  //     throw new Error('No file');
  //   }

  //   const bytes = await file.arrayBuffer();
  //   const buffer = Buffer.from(bytes);

  //   // const path = join('/', 'D:/Hacktiv8/P3/testing"', file.name);
  //   // await writeFile(path, buffer);

  //   console.log(`open ${buffer} to see the uploaded file`);

  //   return { success: true };
  // };

  const xendit = async () => {
    "use server";
    const response = await fetch("http://localhost:3000/api/paymentXendit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify("test"),
    });
    const data = await response.json();
    console.log(data, 34);
  };

  return (
    <main className="flex min-h-screen flex-col gap-4 p-10">
      <h1>test xendit</h1>
      <form className="flex flex-col gap-2 w-fit" action={xendit}>
        <button className="w-fit border" type="submit">
          submit
        </button>
      </form>
    </main>
  );
}
