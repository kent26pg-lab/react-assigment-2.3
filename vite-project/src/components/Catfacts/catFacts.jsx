import { useState, useEffect } from "react";

function CatFacts() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [facts, setFacts] = useState([]);

  useEffect(() => {
    const fetchFacts = async () => {
      try {
        const response = await fetch("https://catfact.ninja/facts?limit=5");

        if (!response.ok) {
          throw new Error("Noe gikk galt med forespørselen");
        }

        const data = await response.json();
        setFacts(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFacts();
  }, []);

  return <div>{}</div>;
}

export default CatFacts;
