import React from "react";
import { Link } from "react-router-dom";
import css from "./Card.module.css";

const Card = ({
  id,
  title,
  imageUrl,
  profilePhotoUrl,
  authorName,
  date,
  someText,
}) => {
  return (
    <div className={css.card}>
      <Link to={`/blog/${id}`} className={css.txtDecoration}>
        <img src={imageUrl} alt={title} className={css.image} />
      </Link>
      <Link to={`/blog/${id}`} className={css.txtDecoration}>
        <h2 className={css.title}>{title}</h2>
      </Link>
      <div className={css.authorInfo}>
        <img
          src={profilePhotoUrl}
          alt={authorName}
          className={css.profilePhoto}
        />
        <div className={css.authorDetails}>
          <p className={css.authorName}>{authorName}</p>
          <p className={css.date}>{date}</p>
        </div>
      </div>
      <p className={css.someText}>{someText}</p>
      <Link to={`/blog/${id}`} className={css.button}>
        Read More
      </Link>
    </div>
  );
};

export default Card;
