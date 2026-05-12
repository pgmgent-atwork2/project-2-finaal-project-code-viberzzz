import { useAuth } from '../context/auth';
import { useState, useEffect } from 'react';
import { getFiltratieUnits  } from '../api/filtratie_unit/api.filtratie_unit';

const Home = () => {
  const { auth } = useAuth();
  const [filtratieUnits, setFiltratieUnits] = useState([]);

  const fetchFiltratieUnits = async () => {
    try {
      const data = await getFiltratieUnits();
      setFiltratieUnits(data);
    } catch (error) {
      console.error('Error fetching filtratie units:', error);
    }
  };

  useEffect(() => {
    fetchFiltratieUnits();
  }, []);

  return (
    <div style={{ padding: '40px' }}>
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
