import Link from 'next/link';
import UserList from '../components/UserList';

export default function Home () {
  return (
    <div className="text-center">
      <main className="">
        {/* ... existing code ... */}
        <Link href="/api/swagger" className="text-blue-600 underline">
          API Documentation (docs)
        </Link>
        <UserList />
        {/* ... existing code ... */}
      </main>
      {/* ... existing code ... */}
    </div>
  );
}