import React from "react";
import logo from "../../assets/logo.svg";
import styles from "./loader.module.css";

const Loader: React.FC = () => {
  const [state, setState] = React.useState(styles.root);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setState(styles.disable);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [state]);
  return (
    <div className={state}>
      <img src={logo} className={styles.logo} alt="logo" />
    </div>
  );
};

export default Loader;
