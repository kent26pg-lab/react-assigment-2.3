import { useState, useEffect } from "react";
import styles from "./CatFacts.module.css"

function CatFacts() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [facts, setFacts] = useState(null);

  const fetchFacts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://catfact.ninja/fact", {
    
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
    <div className={styles.container}>
    {loading && <p>Loading... </p> }
    {error && <p className={styles.error}>Error: {error}</p>}
    {!loading && !error && <p className={styles.fact}>{facts.fact}</p>}
    <img src="Garfield.png" alt="Picture of a cat" className={styles.img} onClick={fetchFacts}/>
  </div>
  );
}

export default CatFacts;