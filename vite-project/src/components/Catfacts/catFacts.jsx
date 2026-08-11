import { useState, useEffect, useCallback } from "react";
import styles from "./catFacts.module.css";
import CatImage from "./CatImage";
import FactDisplay from "./FactDisplay";
import DotsIndicator from "./DotsIndicator";

function CatFacts() {
  const [started, setStarted] = useState(false);
  const [isAsking, setIsAsking] = useState(false);
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
      setIsAsking(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFacts();
  }, [fetchFacts]);

  const handleImageClick = useCallback(() => {
    if (!started) {
      setStarted(true);
      return;
    }

    if (loading) return;

    if (isAsking) {
      fetchFacts();
      return;
    }

    const isLastFact = currentIndex === facts.length - 1;
    if (isLastFact) {
      setIsAsking(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [started, loading, isAsking, currentIndex, facts, fetchFacts]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && !e.repeat) {
        handleImageClick();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleImageClick]);

  return (
    <div className={styles.container}>
      <CatImage onClick={handleImageClick} />

      <div className={styles.factWrapper}>
        <FactDisplay
          started={started}
          loading={loading}
          error={error}
          isAsking={isAsking}
          fact={facts[currentIndex]?.fact}
        />

        {started && !loading && !error && !isAsking && (
          <DotsIndicator count={facts.length} currentIndex={currentIndex} />
        )}
      </div>
    </div>
  );
}

export default CatFacts;