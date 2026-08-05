import { useState, useEffect } from "react";
import styles from "./CatFacts.module.css";

function CatFacts() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [facts, setFacts] = useState(null);

  const fetchFacts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://catfact.ninja/fact", {});

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
      {error ? (
        <p className={styles.error}>Error: {error}</p>
      ) : (
        <div className={styles.fact}>
          {loading ? (
            <div className={styles.loading}></div>
          ) : (
            <p>{facts.fact}</p>
          )}
        </div>
      )}

      <img
        src="Garfield.png"
        alt="Picture of a cat"
        className={styles.img}
        onClick={fetchFacts}
      />
    </div>
  );
}

export default CatFacts;
