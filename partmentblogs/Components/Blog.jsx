import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import css from "./Blog.module.css";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import Card from "./Card";

const Blog = ({ cards }) => {
  const { id } = useParams();
  const card = cards.find((card) => card.id === Number(id));

  const getRelatedArticles = (cards, currentCardId) => {
    const filteredCards = cards.filter((card) => card.id !== currentCardId);
    const shuffled = filteredCards.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  };

  const relatedArticles = getRelatedArticles(cards, card.id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className={css.blogWrapper}>
        <div className={css.blog}>
          <h2 className={css.title}>{card.title}</h2>
          <div className={css.author}>
            <img
              src={card.profilePhotoUrl}
              alt="Author"
              className={css.authorPhoto}
            />
            <div className={css.authorDetails}>
              <h3 className={css.authorName}>{card.authorName}</h3>
            </div>
          </div>
          <div className={css.icons}>
            <div className={css.spacer}>
              <FaFacebookF className={css.iconColor} />
            </div>
            <div className={css.upperSpacer}>
              <FaLinkedinIn className={css.iconColor} />
            </div>
          </div>
          <div className={css.content}>
            <img src={card.imageUrl} alt="Blog" className={css.image} />
            <div className={`${css.text} ${css.textContainer}`}>
              <p>
                At Partment, we're constantly striving to innovate and enhance
                your experience. Today, we're thrilled to unveil a game-changing
                feature that puts the power in your hands like never before: the{" "}
                <strong>Resale Marketplace.</strong> This revolutionary addition
                to our platform empowers you to take control of your investments
                in a way that's unprecedented.
              </p>
              <h3>Putting You in the Driver's Seat</h3>
              <p>
                Imagine having the freedom to set your own price and timing when
                selling your share in a property. With the Resale Marketplace,
                that vision becomes a reality. After you've passed the initial
                12-month holding period, you gain the autonomy to dictate the
                terms of your sale, ensuring a smooth and seamless process every
                step of the way.
              </p>
              {/* More text goes here */}
            </div>
            <div className={css.authorInfo}>
              <img
                src={card.profilePhotoUrl}
                alt="Author"
                className={css.bigAuthorPhoto}
              />
              <div className={css.bigAuthorDetails}>
                <h3 className={css.bigAuthorName}>{card.authorName}</h3>
                <p className={css.bigAuthorDesignation}>Author Designation</p>
              </div>
            </div>
          </div>

          <div className={css.relatedArticles}>
            <h1 className={css.relatedTitle}>Related Articles</h1>
          </div>
        </div>
      </div>
      <div className={css.cardGrid}>
        {relatedArticles.map((relatedCard) => (
          <Card
            key={relatedCard.id}
            id={relatedCard.id}
            title={relatedCard.title}
            imageUrl={relatedCard.imageUrl}
            profilePhotoUrl={relatedCard.profilePhotoUrl}
            authorName={relatedCard.authorName}
            date={relatedCard.date}
            someText={relatedCard.someText}
          />
        ))}
      </div>
    </>
  );
};

export default Blog;
