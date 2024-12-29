// app/hello/page.tsx
"use client";

import { useRouter } from 'next/navigation';
import { useUserStore } from '../../store/useUserStore';

export default function HelloPage() {
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);
  const router = useRouter();

  const handleLogout = () => {
    clearUser();
    router.push('/auth/login');
  };

  return (
      <div>
        <h1>Welcome, {user?.fullName}!</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
  );
}