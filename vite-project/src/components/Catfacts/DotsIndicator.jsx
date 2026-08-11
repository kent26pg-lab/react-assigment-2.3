import styles from "./catFacts.module.css";

function DotsIndicator({ count, currentIndex }) {
  return (
    <div className={styles.dots}>
      {Array.from({ length: count }).map((_, index) => (
        <span
          key={index}
          className={`${styles.dot} ${
            index === currentIndex ? styles.dotActive : ""
          }`}
        />
      ))}
    </div>
  );
}

export default DotsIndicator;