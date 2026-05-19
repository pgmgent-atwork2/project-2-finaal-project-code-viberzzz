import { useState, useEffect } from "react";
import { getFiltratieUnits } from "../api/filtratie_unit/api.filtratie_unit.ts";
import { useAuth } from "../context/auth";
import StatCard from "../components/dashboard/StatCard";
import StatusBadge from "../components/dashboard/StatusBadge";
import UnitCard from "../components/dashboard/UnitCard";
import LogModal from "../components/dashboard/LogModal";
import "../css/dashboard.css";


// ── Main dashboard ─────────────────────────────────────────────────────────

export default function AquariumDashboard() {
  const [user, setuser] = useState(null);
  const { auth } = useAuth();

  const [units, setUnits] = useState([]);
  const [stats, setStats] = useState([
    { label: "Units total",     value: 0, icon: "🔁" },
    { label: "Active",          value: 0, icon: "⚡" },
    { label: "Need attention",  value: 0, icon: "⚠️" },
    { label: "Logs today",      value: 0, icon: "📋" },
  ]);
  const [showModal,   setShowModal]   = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);

  // Fetch units on mount
  useEffect(() => {
    const fetchData = async () => {
      const data = await getFiltratieUnits();
      setUnits(data || []);
      setuser(auth.user);
    };
    fetchData();
  }, []);

  // Calculate status and stats
  const getUnitStatus = (unit) => {
    let status = "Active";
    
    if (!unit.latestWaarde) {
      status = "Malfunction";
    } else if (unit.waarden_range) {
      const waarde = unit.latestWaarde;
      const range = Array.isArray(unit.waarden_range) ? unit.waarden_range[0] : unit.waarden_range;
      
      if (range) {
        const isInRange = 
          (!waarde.ph || (waarde.ph >= range.ph_min && waarde.ph <= range.ph_max)) &&
          (!waarde.temperatuur || (waarde.temperatuur >= range.temperatuur_min && waarde.temperatuur <= range.temperatuur_max)) &&
          (!waarde.water_level || (waarde.water_level >= range.water_level_min && waarde.water_level <= range.water_level_max)) &&
          (!waarde.zoutgehalte || (waarde.zoutgehalte >= range.zoutgehalte_min && waarde.zoutgehalte <= range.zoutgehalte_max)) &&
          (!waarde.microbiologie || (waarde.microbiologie <= range.microbiologie_max));
        
        if (!isInRange) {
          status = "Maintenance";
        }
      }
    }
    
    return status;
  };

  // Update stats when units change
  useEffect(() => {
    const activeCount = units.filter(u => getUnitStatus(u) === "Active").length;
    const needAttentionCount = units.filter(u => {
      const status = getUnitStatus(u);
      return status === "Maintenance" || status === "Malfunction";
    }).length;
    const logsToday = units.filter(u => {
      if (!u.latestWaarde?.gemeten_op) return false;
      const logDate = new Date(u.latestWaarde.gemeten_op).toDateString();
      const today = new Date().toDateString();
      return logDate === today;
    }).length;

    setStats([
      { label: "Units total",     value: units.length, icon: "🔁" },
      { label: "Active",          value: activeCount, icon: "⚡" },
      { label: "Need attention",  value: needAttentionCount, icon: "⚠️" },
      { label: "Logs today",      value: logsToday, icon: "📋" },
    ]);
  }, [units]);


  // Helper function to check if a value is in range
  const isValueInRange = (value, min, max) => {
    if (value === null || value === undefined) return true;
    return value >= min && value <= max;
  };

  // Helper function to check if a value exceeds max
  const isValueExceedsMax = (value, max) => {
    if (value === null || value === undefined) return false;
    return value > max;
  };

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
          {stats.map(s => (
            <StatCard key={s.label} icon={s.icon} value={s.value} label={s.label} />
          ))}
        </div>

        {/* ── Units ── */}
        <div className="section-header">
          <h2>Filtration units</h2>
        </div>

        <div className="units-grid">
          {units.map(unit => (
            <UnitCard
              key={unit.id}
              unit={{ ...unit, status: getUnitStatus(unit) }}
              onClick={u => setSelectedUnit(u)}
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

      {/* ── Unit detail panel (optional future use) ── */}
      {selectedUnit && (
        <div className="modal-overlay" onClick={() => setSelectedUnit(null)}>
          <div className="modal">
            <h3>{selectedUnit.naam}</h3>
            <p>{selectedUnit.locatie}</p>
            <StatusBadge status={selectedUnit.status} />
            <p style={{ marginTop: 14 }}>Last inspection: {selectedUnit.latestWaarde?.gemeten_op ? new Date(selectedUnit.latestWaarde.gemeten_op).toLocaleString('nl-NL', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }) : 'N/A'}</p>
            
            {selectedUnit.waarden_range && (
              <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid #e2e8f0' }}>
                <h4 style={{ marginBottom: 12 }}>Water Parameters</h4>
                <div style={{ fontSize: '13px', lineHeight: '1.8' }}>
                  {(() => {
                    const range = Array.isArray(selectedUnit.waarden_range) ? selectedUnit.waarden_range[0] : selectedUnit.waarden_range;
                    const waarde = selectedUnit.latestWaarde;
                    
                    const phOutOfRange = waarde?.ph && !isValueInRange(waarde.ph, range.ph_min, range.ph_max);
                    const tempOutOfRange = waarde?.temperatuur && !isValueInRange(waarde.temperatuur, range.temperatuur_min, range.temperatuur_max);
                    const waterLevelOutOfRange = waarde?.water_level && !isValueInRange(waarde.water_level, range.water_level_min, range.water_level_max);
                    const zoutOutOfRange = waarde?.zoutgehalte && !isValueInRange(waarde.zoutgehalte, range.zoutgehalte_min, range.zoutgehalte_max);
                    const microOutOfRange = isValueExceedsMax(waarde?.microbiologie, range.microbiologie_max);
                    
                    const getRowStyle = (outOfRange, hasValue) => {
                      if (!hasValue) return { padding: '8px 12px', borderRadius: '6px', marginBottom: '8px' };
                      if (outOfRange) return { padding: '8px 12px', borderRadius: '6px', marginBottom: '8px', background: '#fef3c7', color: '#d97706' };
                      return { padding: '8px 12px', borderRadius: '6px', marginBottom: '8px', background: '#dcfce7', color: '#16a34a' };
                    };
                    
                    return (
                      <>
                        <div style={getRowStyle(phOutOfRange, waarde?.ph !== null && waarde?.ph !== undefined)}>
                          <strong>pH:</strong> {range.ph_min} - {range.ph_max} (Current: {waarde?.ph ?? 'N/A'})
                        </div>
                        <div style={getRowStyle(tempOutOfRange, waarde?.temperatuur !== null && waarde?.temperatuur !== undefined)}>
                          <strong>Temperatuur:</strong> {range.temperatuur_min}°C - {range.temperatuur_max}°C (Current: {waarde?.temperatuur ?? 'N/A'}°C)
                        </div>
                        <div style={getRowStyle(waterLevelOutOfRange, waarde?.water_level !== null && waarde?.water_level !== undefined)}>
                          <strong>Water Level:</strong> {range.water_level_min} - {range.water_level_max} (Current: {waarde?.water_level ?? 'N/A'})
                        </div>
                        <div style={getRowStyle(zoutOutOfRange, waarde?.zoutgehalte !== null && waarde?.zoutgehalte !== undefined)}>
                          <strong>Zoutgehalte:</strong> {range.zoutgehalte_min} - {range.zoutgehalte_max} (Current: {waarde?.zoutgehalte ?? 'N/A'})
                        </div>
                        <div style={getRowStyle(microOutOfRange, waarde?.microbiologie !== null && waarde?.microbiologie !== undefined)}>
                          <strong>Microbiologie Max:</strong> {range.microbiologie_max} (Current: {waarde?.microbiologie ?? 'N/A'})
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            )}
            
            <div className="modal-actions" style={{ marginTop: 20 }}>
              <button className="btn-cancel" onClick={() => setSelectedUnit(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
