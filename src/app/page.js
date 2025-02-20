import Link from 'next/link';

export default function Home () {
  return (
    <div className="text-center">
      <main className="my-10">
        {/* ... existing code ... */}
        <Link href="/docs" className="text-blue-600 underline font-bold text-2xl">
          API Documentation (/docs)
        </Link>
        {/* ... existing code ... */}
      </main>
      {/* ... existing code ... */}
    </div>
  );
}