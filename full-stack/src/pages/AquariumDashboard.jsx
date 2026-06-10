import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFiltratieUnits } from "../api/filtratie_unit/api.filtratie_unit.ts";
import { useAuth } from "../context/auth";
import { getStatus } from "../components/status.ts";
import { UNIT_STATUS } from "../types/types.enums.ts";
import StatCard from "../components/dashboard/StatCard";
import UnitCard from "../components/dashboard/UnitCard";
import LogModal from "../components/dashboard/LogModal";
import UnitDetailModal from "../components/dashboard/UnitDetailModal";
import PhChart from "../components/dashboard/PhChart";
import "../css/dashboard.css";

// ── Main dashboard ─────────────────────────────────────────────────────────

export default function AquariumDashboard() {
  const navigate = useNavigate();
  const [user, setuser] = useState(null);
  const { auth } = useAuth();

  // Helper function to get unit status using status.ts
  const getUnitStatus = (unit) => {
    if (!unit.latestWaarde) {
      return "Malfunction";
    }

    const waarde = unit.latestWaarde;
    const range = Array.isArray(unit.waarden_range) 
      ? unit.waarden_range[0] 
      : unit.waarden_range;

    if (!range) {
      return "Malfunction";
    }

    const status = getStatus(
      waarde.ph,
      waarde.temperatuur,
      waarde.water_level,
      waarde.zoutgehalte,
      waarde.microbiologie,
      range
    );

    // Map enum values to display labels
    switch (status) {
      case UNIT_STATUS.ACTIEF:
        return "Active";
      case UNIT_STATUS.ONDERHOUD_NODIG:
        return "Maintenance";
      case UNIT_STATUS.STORING:
        return "Malfunction";
      default:
        return "Malfunction";
    }
  };

  const [units, setUnits] = useState([]);
  const [stats, setStats] = useState([
    { label: "Units total", value: 0, icon: "🔁" },
    { label: "Active", value: 0, icon: "⚡" },
    { label: "Need attention", value: 0, icon: "⚠️" },
    { label: "Logs today", value: 0, icon: "📋" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);

  // Fetch units on mount
  useEffect(() => {
    const fetchData = async () => {
      const data = await getFiltratieUnits();
      setUnits(data || []);
      setuser(auth?.user);
    };
    fetchData();
  }, [auth]); // Refetch if auth changes (e.g. user logs in/out)

  // Update stats when units change
  useEffect(() => {
    const activeCount = units.filter(
      (u) => getUnitStatus(u) === "Active",
    ).length;
    const needAttentionCount = units.filter((u) => {
      const status = getUnitStatus(u);
      return status === "Maintenance" || status === "Malfunction";
    }).length;
    const logsToday = units.filter((u) => {
      if (!u.latestWaarde?.gemeten_op) return false;
      const logDate = new Date(u.latestWaarde.gemeten_op).toDateString();
      const today = new Date().toDateString();
      return logDate === today;
    }).length;

    setStats([
      { label: "Units total", value: units.length, icon: "🔁" },
      { label: "Active", value: activeCount, icon: "⚡" },
      { label: "Need attention", value: needAttentionCount, icon: "⚠️" },
      { label: "Logs today", value: logsToday, icon: "📋" },
    ]);
  }, [units]);

  return (
    <>
      <div className="dash-root">
        {/* ── Top bar ── */}
        <div className="topbar">
          <div className="greeting">
            <h1>Welcome, {user?.naam}</h1>
            <p>Here's the state of the park's life support today.</p>
          </div>
          <button className="btn-log" onClick={() => setShowModal(true)}>
            + Log entry
          </button>
        </div>

        {/* ── Stats ── */}
        <div className="stats-row">
          {stats.map((s) => (
            <StatCard
              key={s.label}
              icon={s.icon}
              value={s.value}
              label={s.label}
            />
          ))}
        </div>

        <div className="xl:col-span-2">
          <PhChart />
        </div>

        {/* ── Units ── */}
        <div className="section-header">
          <h2>Filtration units</h2>
        </div>

        <div className="units-grid">
          {units.map((unit) => (
            <UnitCard
              key={unit.id}
              unit={{ ...unit, status: getUnitStatus(unit) }}
              onClick={(u) => setSelectedUnit(u)}
            />
          ))}
        </div>
      </div>

      {/* ── Log modal ── */}
      {showModal && (
        <LogModal
          units={units}
          onClose={() => setShowModal(false)}
          onSave={null /* Implement log saving logic here */}
        />
      )}

      {/* ── Unit detail modal ── */}
      <UnitDetailModal
        unit={selectedUnit}
        onClose={() => setSelectedUnit(null)}
        onViewDetails={(unit) => navigate(`/units/${unit.id}`)}
      />
    </>
  );
}
