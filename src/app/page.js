// src/app/page.js
import UserList from '../components/UserList';

export default function Home () {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* ... existing code ... */}
        <a href="/api/swagger" className="text-blue-600 underline">API Documentation (api/swagger)</a>
        <a href="/redoc" className="text-blue-600 underline">API Documentation (redoc)</a>
        <UserList />
        {/* ... existing code ... */}
      </main>
      {/* ... existing code ... */}
    </div>
  );
}