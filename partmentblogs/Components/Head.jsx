import css from "./Head.module.css";

export default function Head() {
  return (
    <div className={css.head}>
      <h1>Partment Blogs</h1>
      <p>
        A series of light reads with updates on the most recent trends in Real
        Estate and home co-ownership.
      </p>
    </div>
  );
}
