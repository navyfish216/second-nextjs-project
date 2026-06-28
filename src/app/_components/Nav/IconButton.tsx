import styles from "./style.module.css";

type Props = {
  onClickFunction: () => void;
  children: React.ReactNode;
};

export function IconButton({ onClickFunction, children }: Props) {
  const onClickOfIconButton = () => {
    console.log(`IconButton.onClickOfIconButton`);
    onClickFunction();
  };

  return (
    <button className={styles.button} onClick={onClickOfIconButton}>
      {children}
    </button>
  );
}
