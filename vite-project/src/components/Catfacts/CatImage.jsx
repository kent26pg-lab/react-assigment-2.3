import styles from "./catFacts.module.css";

function CatImage({ onClick }) {
  return (
    <img
      src="Garfield.png"
      alt="Picture of a cat"
      className={styles.img}
      onClick={onClick}
    />
  );
}

export default CatImage;