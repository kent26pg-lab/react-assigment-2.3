import { useState, useEffect } from "react";
import styles from "./CatFacts.module.css";

function CatFacts() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [facts, setFacts] = useState({ fact: "Trykk på meg for katte fakta" });
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    if (clickCount === 0) return;
    console.log(clickCount)

    const fetchFacts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("https://catfact.ninja/fact");

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

    fetchFacts();
  }, [clickCount]);

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
        onClick={() => setClickCount((prev) => prev + 1)}
      />
    </div>
  );
}

export default CatFacts;