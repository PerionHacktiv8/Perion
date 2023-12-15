import { Users } from '@/db/models/user';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export default function Home() {
  const upload = async (data: FormData) => {
    'use server';
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      throw new Error('No file');
    }

    await Users.extractPDF(file);
    // await Users.upPDF(file);
  };

  return (
    <main className='flex min-h-screen flex-col gap-4 p-10'>
      <h1>test pdf upload</h1>
      <form className='flex flex-col gap-2 w-fit' action={upload}>
        <input type='file' accept='application/pdf' name='file' />
        <button className='w-fit' type='submit'>
          submit
        </button>
      </form>
    </main>
  );
}
