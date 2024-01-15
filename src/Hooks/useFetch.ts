import { useEffect, useState } from 'react';

const useFetch = (url: string) => {
  const [data, setData] = useState<null | any[]>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const { results } = await response.json();
        setData(results);
      } catch (catchedError: any) {
        setError(catchedError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
