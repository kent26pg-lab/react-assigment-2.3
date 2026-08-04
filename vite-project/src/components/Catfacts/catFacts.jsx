import { useState, useEffect } from "react";

function CatFacts() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [facts, setFacts] = useState(null);

  const fetchFacts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://catfact.ninja/fact", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Noe gikk galt med forespørselen");
      }

      const data = await response.json();
      setFacts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacts();
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && <p>{facts.fact}</p>}
      <button onClick={fetchFacts}>Get new fact</button>
    </div>
  );
}

export default CatFacts;