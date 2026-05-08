import { useState } from 'react';
import UserTable from '../components/UserTable';
import UserModal from '../components/UserModal';

export default function Users({ search }) {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <>
      <UserTable search={search} onRowClick={setSelectedUser} />
      <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
    </>
  );
}