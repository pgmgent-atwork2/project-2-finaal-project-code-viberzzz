import { useAuth } from "../context/auth/index.jsx";
import { useState, useEffect } from "react";
import { getFiltratieUnits } from "../api/filtratie_unit/api.filtratie_unit.ts";

const Home = () => {
  const [user, setuser] = useState(null);
  const { auth } = useAuth();
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
  }, [auth]);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Welcome to Dashboard</h1>
      {auth && (
        <div>
          <p>Logged in as: {auth.user.email}</p>
          <p>User ID: {auth.user.id}</p>
        </div>
      )}
      <div>
        <h2>Filtratie Units</h2>
        {filtratieUnits && filtratieUnits.length > 0 ? (
          <ul>
            {filtratieUnits.map((unit) => (
              <li key={unit.id}>
                <strong>{unit.naam}</strong> - {unit.locatie} ({unit.status})
                {unit.waarden_range && (
                  <div
                    style={{
                      marginLeft: "20px",
                      marginTop: "10px",
                      fontSize: "14px",
                    }}
                  >
                    <p>
                      <strong>Waarden Range:</strong>
                    </p>
                    <ul>
                      <li>
                        pH: {unit.waarden_range.ph_min} -{" "}
                        {unit.waarden_range.ph_max}
                      </li>
                      <li>
                        Temperatuur: {unit.waarden_range.temperatuur_min}°C -{" "}
                        {unit.waarden_range.temperatuur_max}°C
                      </li>
                      <li>
                        Water Level: {unit.waarden_range.water_level_min} -{" "}
                        {unit.waarden_range.water_level_max}
                      </li>
                      <li>
                        Zoutgehalte: {unit.waarden_range.zoutgehalte_min} -{" "}
                        {unit.waarden_range.zoutgehalte_max}
                      </li>
                      <li>
                        Microbiologie Max:{" "}
                        {unit.waarden_range.microbiologie_max}
                      </li>
                    </ul>
                  </div>
                )}
                {unit.latestWaarde && (
                  <div
                    style={{
                      marginLeft: "20px",
                      marginTop: "10px",
                      fontSize: "14px",
                    }}
                  >
                    <p>
                      <strong>Laatste Waarde:</strong>
                    </p>
                    <ul>
                      <li>pH: {unit.latestWaarde.ph}</li>
                      <li>Temperatuur: {unit.latestWaarde.temperatuur}°C</li>
                      <li>Water Level: {unit.latestWaarde.water_level}</li>
                      <li>Zoutgehalte: {unit.latestWaarde.zoutgehalte}</li>
                      <li>
                        Microbiologie Max: {unit.latestWaarde.microbiologie}
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No filtratie units found</p>
        )}
      </div>
    </div>
  );
};

export default Home;
