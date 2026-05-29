import { useAuth } from "../context/auth/index.jsx";
import { useState, useEffect } from "react";
import { getFiltratieUnits } from "../api/filtratie_unit/api.filtratie_unit.ts";

const Home = () => {
  const { auth } = useAuth();
  const [filtratieUnits, setFiltratieUnits] = useState([]);

  const fetchFiltratieUnits = async () => {
    try {
      const data = await getFiltratieUnits();
      setFiltratieUnits(data);
    } catch (error) {
      console.error("Error fetching filtration units:", error);
    }
  };

  useEffect(() => {
    fetchFiltratieUnits();
  }, [auth]);

  return (
    <div style={{ padding: "40px" }}>
      <h1>filtration Units</h1>
      <form>
        <input type="text" placeholder="Search filtratie units..." />
      </form>
      <div>
        <h2>Filtratie Units</h2>
        {filtratieUnits && filtratieUnits.length > 0 ? (
          <ul>
            {filtratieUnits.map((unit) => (
              <li key={unit.id}>{unit.naam}</li>
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
