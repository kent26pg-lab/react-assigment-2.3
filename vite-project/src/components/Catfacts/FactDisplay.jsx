import styles from "./catFacts.module.css";

function FactDisplay({ started, loading, error, isAsking, fact }) {
  return (
    <div className={styles.fact}>
      {!started && <p>Click on me or hit Enter for 5 cat facts!</p>}

      {started && loading && <p className={styles.loading}></p>}
      {started && !loading && error && (
        <p className={styles.error}>Error: {error}</p>
      )}

      {started && !loading && !error && !isAsking && <p>{fact}</p>}

      {started && !loading && !error && isAsking && (
        <p>Want 5 more? Click on me or hit Enter!</p>
      )}
    </div>
  );
}

export default FactDisplay;