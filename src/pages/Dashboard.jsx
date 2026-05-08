import { useState } from 'react';
import DashboardCards from '../components/DashboardCards';
import UserTable from '../components/UserTable';
import UserModal from '../components/UserModal';

export default function Dashboard({ search }) {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <>
      <DashboardCards />
      <UserTable search={search} onRowClick={setSelectedUser} />
      <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
    </>
  );
}