import { useEffect, useState } from 'react';

const usePlanetDataOptions = (url: string) => {
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const { results } = await response.json();

        const keys = Object.keys(results[0]);

        const filteredKeys = keys.filter((key) => ['population', 'orbital_period',
          'diameter', 'rotation_period', 'surface_water'].includes(key));

        setOptions(filteredKeys);
      } catch (catchedError: any) {
        setError(catchedError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { options, loading, error };
};

export default usePlanetDataOptions;
