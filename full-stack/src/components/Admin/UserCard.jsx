import "../../css/UserCard.css";

import RoleBadge from "./RoleBadge";

export default function UserCard({ user }) {
  const initials = (user.naam || user.email)
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <article className="user-card">
      <div className="user-avatar">{initials.slice(0, 2)}</div>

      <div className="user-info">
        <h2>{user.naam || "Geen naam"}</h2>
        <p>{user.email}</p>
      </div>

      <RoleBadge role={user.rol} />
    </article>
  );
}
