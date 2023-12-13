import { writeFile } from "fs/promises";
import Link from "next/link";
import { join } from "path";
import { CreateInvoiceRequest } from "xendit-node/invoice/models";

const xendit = async () => {
  "use server";
  const response = await fetch("http://localhost:3000/api/invoiceXendit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId: 100 as number }),
  });
  const data = await response.json();
  return data;
};
const Home = async () => {
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

  let invoicePayment = await xendit();
  // console.log(invoicePayment.data.invoiceUrl, 37);

  return (
    <main className="flex min-h-screen flex-col gap-4 p-10">
      <h1>test xendit</h1>
      <form className="flex flex-col gap-2 w-fit" action={xendit}>
        <Link
          href={invoicePayment.data.invoiceUrl}
          className="w-fit border"
          type="submit"
        >
          submit
        </Link>
      </form>
    </main>
  );
};
export default Home;
