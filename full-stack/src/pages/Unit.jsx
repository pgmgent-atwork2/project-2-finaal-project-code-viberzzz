import { useAuth } from "../context/auth";
import { useState, useEffect } from "react";
import { getFiltratieUnits } from "../api/filtratie_unit/api.filtratie_unit.ts";
import AquariumCard from "../components/unit/AquariumCard";

const Home = () => {
  const [user, setUser] = useState(null);
  const { auth } = useAuth();
  const [filtratieUnits, setFiltratieUnits] = useState([]);

  useEffect(() => {
    const fetchFiltratieUnits = async () => {
      try {
        const data = await getFiltratieUnits();
        setFiltratieUnits(data);
      } catch (error) {
        console.error("Error fetching filtratie units:", error);
      }
    };

    fetchFiltratieUnits();
    setUser(auth?.user);
  }, [auth?.user, setFiltratieUnits, setUser]);

  return (
    <>
      <div className="dash-root">
        <AquariumCard></AquariumCard>
      </div>
    </>
  );
};

export default Home;
