import "../css/Admin.css";
import UserCard from "../components/Admin/UserCard";

const users = [
  {
    id: 1,
    name: "LeBron James",
    email: "Kingjames@seapark.be",
    role: "Admin",
  },
  {
    id: 2,
    name: "Micheal Jordan",
    email: "Jordan@seapark.be",
    role: "Technician",
  },
  {
    id: 3,
    name: "Kyrie Irving",
    email: "kai@seapark.be",
    role: "Advisor",
  },

  {
    id: 4,
    name: "Gilbert Arenas",
    email: "gilbert@seapark.be",
    role: "Advisor",
  },

  {
    id: 5,
    name: "Kevin Durant",
    email: "Moneysniper@seapark.be",
    role: "Technician",
  },
];

function Admin() {
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
