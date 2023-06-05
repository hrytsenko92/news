import style from "./loading.module.scss";

export const Loading = () => {
  return (
    <div className={style.container}>
      <span className={style.title}>Loading data...</span>
      <span className={style.description}>Please wait</span>
    </div>
  );
};
