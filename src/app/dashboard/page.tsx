'use client';

import { useSelector, useDispatch } from 'react-redux';
import { logout, RootState } from '../../lib/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import DataTable from '../../components/DataTable';
import ChartComponent from '../../components/ChartComponent';

export default function Dashboard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-5 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="p-2 bg-red-700 rounded hover:bg-red-600 text-white font-semibold"
        >
          Logout
        </button>
      </header>
      <main className="p-6">
        <h2 className="text-xl font-bold mb-6">Welcome, {user?.firstName} {user?.lastName || 'Guest'}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <DataTable />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <ChartComponent />
          </div>
        </div>
      </main>
    </div>
  );
}