import "../../css/UserCard.css";

import RoleBadge from "./RoleBadge";

export default function UserCard({ user }) {
  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <article className="user-card">
      <div className="user-avatar">{initials.slice(0, 2)}</div>

      <div className="user-info">
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>

      <RoleBadge role={user.role} />
    </article>
  );
}
