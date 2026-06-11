import "../../css/RoleBadge.css";

export default function RoleBadge({ role }) {
  return <span className={`role-badge ${role.toLowerCase()}`}>{role}</span>;
}
