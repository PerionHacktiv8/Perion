import { writeFile } from 'fs/promises';
import { join } from 'path';

export default function Home() {
  const upload = async (data: FormData) => {
    'use server';
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      throw new Error('No file');
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // const path = join('/', 'D:/Hacktiv8/P3/testing"', file.name);
    // await writeFile(path, buffer);

    console.log(`open ${buffer} to see the uploaded file`);

    return { success: true };
  };
  return (
    <main className='flex min-h-screen flex-col gap-4 p-10'>
      <h1>test pdf upload</h1>
      <form className='flex flex-col gap-2 w-fit' action={upload}>
        <input type='file' name='file' />
        <button className='w-fit' type='submit'>
          submit
        </button>
      </form>
    </main>
  );
}
