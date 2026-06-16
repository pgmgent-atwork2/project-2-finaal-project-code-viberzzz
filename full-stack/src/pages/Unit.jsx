import { useAuth } from "../context/auth";
import { useState, useEffect } from "react";
import { getFiltratieUnits } from "../api/filtratie_unit/api.filtratie_unit.ts";
import AquariumCard from "../components/unit/AquariumCard";

const Home = () => {
  const [setuser] = useState(null);
  const { auth } = useAuth();
  const [setFiltratieUnits] = useState([]);

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
    setuser(auth?.user);
  }, [auth?.user, setFiltratieUnits, setuser]);

  return (
    <>
      <div className="dash-root">
        <AquariumCard></AquariumCard>
      </div>
    </>
  );
};

export default Home;
