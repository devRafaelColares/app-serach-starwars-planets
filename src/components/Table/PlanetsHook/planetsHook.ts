import { useState, useEffect } from 'react';

interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  films: string[];
  created: string;
  edited: string;
  url: string;
  [key: string]: string | string[];
}

interface PlanetsHookResponse {
  planets: Planet[];
  loading: boolean;
  error: string | null;
}

const usePlanetsHook = (): PlanetsHookResponse => {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/planets');
        const { results } = await response.json();

        const filteredData = results
          .map(({ residents, ...filteredPlanet }: Planet) => filteredPlanet);

        setPlanets(filteredData);
        setLoading(false);
      } catch (catchedError: any) {
        setError(catchedError.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { planets, loading, error };
};

export default usePlanetsHook;
