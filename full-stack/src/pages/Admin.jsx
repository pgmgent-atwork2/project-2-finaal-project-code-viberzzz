import { useEffect, useState } from "react";
import "../css/Admin.css";
import UserCard from "../components/Admin/UserCard";
import { getGebruikers } from "../api/gebruiker/api.gebruiker.ts";
function Admin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getGebruikers();

      if (data) {
        setUsers(data);
      }
    };

    fetchUsers();
  }, []);

  console.log(users);
  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>Admin Panel</h1>
        <p>Manage users and system access</p>
      </header>

      <section className="users-list">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </section>
    </div>
  );
}

export default Admin;
