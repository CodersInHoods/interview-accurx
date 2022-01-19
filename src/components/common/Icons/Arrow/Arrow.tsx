import styles from "./Arrow.module.scss";
import { IArrow } from "./types";

export const Arrow: React.FC<IArrow> = ({ direction = "down" }) => {
  return <i className={`${styles.arrow} ${styles[direction]}`}></i>;
};
