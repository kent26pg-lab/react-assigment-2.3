import { useState, useEffect, useCallback } from "react";
import styles from "./catFacts.module.css";

function CatFacts() {
  const [phase, setPhase] = useState("idle"); // "idle" | "showing" | "asking"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [facts, setFacts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchFacts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const randomPage = Math.floor(Math.random() * 50) + 1;
      const response = await fetch(
        `https://catfact.ninja/facts?limit=5&page=${randomPage}`,
        { cache: "no-store" }
      );

      if (!response.ok) {
        throw new Error("Noe gikk galt med forespørselen");
      }

      const data = await response.json();
      setFacts(data.data);
      setCurrentIndex(0);
      setPhase("showing");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleImageClick = useCallback(() => {
    if (loading) return;

    if (phase === "idle") {
      fetchFacts();
      return;
    }

    if (phase === "asking") {
      fetchFacts();
      return;
    }

    const isLastFact = currentIndex === facts.length - 1;
    if (isLastFact) {
      setPhase("asking");
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [loading, phase, currentIndex, facts, fetchFacts]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        handleImageClick();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleImageClick]);

  return (
    <div className={styles.container}>
      <img
        src="Garfield.png"
        alt="Picture of a cat"
        className={styles.img}
        onClick={handleImageClick}
      />

      <div className={styles.factWrapper}>
        <div className={styles.fact}>
          {loading && <p className={styles.loading}></p>}
          {error && <p className={styles.error}>Error: {error}</p>}

          {!loading && !error && phase === "idle" && (
            <p>Click on me for 5 cat facts!</p>
          )}

          {!loading && !error && phase === "showing" && (
            <p>{facts[currentIndex]?.fact}</p>
          )}

          {!loading && !error && phase === "asking" && (
            <p>Want 5 more? Click for more!</p>
          )}
        </div>

        {!loading && !error && phase === "showing" && (
          <div className={styles.dots}>
            {facts.map((_, index) => (
              <span
                key={index}
                className={`${styles.dot} ${
                  index === currentIndex ? styles.dotActive : ""
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CatFacts;