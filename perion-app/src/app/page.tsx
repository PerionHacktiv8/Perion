import Link from "next/link";

const postXendit = async () => {
  "use server";
  const response = await fetch("http://localhost:3000/api/invoiceXendit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId: 1000 as number }),
  });
  console.log(response);

  if (!response.ok) {
    throw new Error("Paid first");
  }
  const data = await response.json();

  return data;
};

const Home = async () => {
  let invoicePayment = await postXendit();
  console.log(invoicePayment);

  return (
    <main className="flex min-h-screen flex-col gap-4 p-10">
      <h1>test xendit</h1>
      <form className="flex flex-col gap-2 w-fit" action={postXendit}>
        <Link
          href={invoicePayment.data?.invoiceUrl ?? ""}
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
