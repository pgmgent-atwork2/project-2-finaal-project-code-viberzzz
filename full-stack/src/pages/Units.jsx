import { useAuth } from "../context/auth/index.jsx";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFiltratieUnits } from "../api/filtratie_unit/api.filtratie_unit.ts";
import UnitCard from "../components/unit/UnitCard";

const Home = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [setuser] = useState(null);
  const [filtratieUnits, setFiltratieUnits] = useState([]);

  const fetchFiltratieUnits = async () => {
    try {
      const data = await getFiltratieUnits();
      setFiltratieUnits(data || []);
      console.log("Fetched filtratie units homepage:", data);
    } catch (error) {
      console.error("Error fetching filtratie units:", error);
    }
  };

  useEffect(() => {
    fetchFiltratieUnits();
    setuser(auth?.user);
  }, [auth, setuser]);

  const getUnitStatus = (unit) => {
    if (!unit.latestWaarde) return "inactive";

    const latest = unit.latestWaarde;
    const range = Array.isArray(unit.waarden_range)
      ? unit.waarden_range[0]
      : unit.waarden_range;

    if (!range) return "active";

    // Check if any parameter is out of range
    const isOutOfRange =
      (latest.ph && (latest.ph < range.ph_min || latest.ph > range.ph_max)) ||
      (latest.temperatuur &&
        (latest.temperatuur < range.temperatuur_min ||
          latest.temperatuur > range.temperatuur_max)) ||
      (latest.water_level &&
        (latest.water_level < range.water_level_min ||
          latest.water_level > range.water_level_max)) ||
      (latest.zoutgehalte &&
        (latest.zoutgehalte < range.zoutgehalte_min ||
          latest.zoutgehalte > range.zoutgehalte_max));

    return isOutOfRange ? "warning" : "active";
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Filtratie Units</h1>
      {auth?.user && (
        <p style={{ color: "#64748b", marginBottom: "30px" }}>
          Logged in as: {auth.user.email}
        </p>
      )}

      <div className="units-grid">
        {filtratieUnits && filtratieUnits.length > 0 ? (
          filtratieUnits.map((unit) => (
            <UnitCard
              key={unit.id}
              unit={{ ...unit, status: getUnitStatus(unit) }}
              onClick={(u) => navigate(`/units/${u.id}`)}
            />
          ))
        ) : (
          <p>No filtratie units available</p>
        )}
      </div>
    </div>
  );
};

export default Home;
