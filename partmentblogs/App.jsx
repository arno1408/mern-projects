import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Head from "./Components/Head";
import Card from "./Components/Card";
import Blog from "./Components/Blog";

const initialCards = [
  {
    id: 0,
    title: "Partment Resale Marketplace: Explained",
    imageUrl:
      "https://blog.partment.co/hubfs/Partment%20x%20Greca%20blogpost-2.png",
    profilePhotoUrl:
      "https://blog.partment.co/hs-fs/hubfs/aliaa_B%26W.png?width=50&name=aliaa_B%26W.png",
    authorName: "Aliaa El Alaily",
    date: "Mar 28, 2024 4:51:59 PM",
    someText: "",
  },
  {
    id: 1,
    title: "Partment Expands to Greece - Europe's Mediterranean Paradise!",
    imageUrl:
      "https://blog.partment.co/hubfs/Partment%20x%20Greca%20blogpost.png",
    profilePhotoUrl:
      "https://blog.partment.co/hs-fs/hubfs/aliaa_B%26W.png?width=50&name=aliaa_B%26W.png",
    authorName: "Aliaa El Alaily",
    date: "Dec 4, 2023 2:49:51 PM",
    someText:
      "Partment is excited to announce its expansion to Greece through a partnership with Greca Homes. Part...",
  },
  {
    id: 2,
    title: "Partment | Subsbase - Customer Experience & Payments Made Easier",
    imageUrl: "https://blog.partment.co/hubfs/Untitled%20design-11.png",
    profilePhotoUrl:
      "https://blog.partment.co/hs-fs/hubfs/aliaa_B%26W.png?width=50&name=aliaa_B%26W.png",
    authorName: "Aliaa El Alaily",
    date: "Nov 27, 2023 10:15:24 AM",
    someText:
      "We are thrilled to share the exciting news of our partnership with Subsbase, a leading provider of s...",
  },
  {
    id: 3,
    title: "How to Calculate ROI and Get the Best Returns",
    imageUrl:
      "https://blog.partment.co/hubfs/Screenshot%202023-08-21%20at%206.42.44%20PM.png",
    profilePhotoUrl:
      "https://blog.partment.co/hs-fs/hubfs/Untitled%20design%20(8).png?width=50&name=Untitled%20design%20(8).png",
    authorName: "Sarah Hegazy",
    date: "Aug 20, 2023 4:39:01 PM",
    someText:
      "Want to know how much can you earn from co-owning a vacation home? Use this calculator to find out!",
  },
  {
    id: 4,
    title: "The 5 Elements Of A Great Vacation Home",
    imageUrl: "https://blog.partment.co/hubfs/1.png",
    profilePhotoUrl:
      "https://blog.partment.co/hs-fs/hubfs/aliaa_B%26W.png?width=50&name=aliaa_B%26W.png",
    authorName: "Aliaa El Alaily",
    date: "Jul 12, 2023 12:49:58 PM",
    someText:
      "Whether you're looking to buy a vacation home for personal use or as an investment property, there a...",
  },
  {
    id: 5,
    title:
      "Partment Expands Into Egypt's North Coast, With Luxurious Serviced Apartments",
    imageUrl: "https://blog.partment.co/hubfs/sahel.jpg",
    profilePhotoUrl:
      "https://blog.partment.co/hs-fs/hubfs/Untitled%20design%20(8).png?width=50&name=Untitled%20design%20(8).png",
    authorName: "Sarah Hegazy",
    date: "May 28, 2023 3:26:24 PM",
    someText:
      "Partment is excited to announce its expansion into Egypt's North Coast, Sahel. With fully serviced a...",
  },
  {
    id: 6,
    title: "What Makes a Partment Home?",
    imageUrl: "https://blog.partment.co/hubfs/Property%20blogpost.png",
    profilePhotoUrl:
      "https://blog.partment.co/hs-fs/hubfs/aliaa_B%26W.png?width=50&name=aliaa_B%26W.png",
    authorName: "Aliaa El Alaily",
    date: "Apr 30, 2023 10:19:15 AM",
    someText:
      "The beautiful homes you see on our listings are hand-picked by us, as Partment always strives to pre...",
  },
  {
    id: 7,
    title: "Property Management: Everything You Need To Know",
    imageUrl: "https://blog.partment.co/hubfs/living%201_.jpg",
    profilePhotoUrl:
      "https://blog.partment.co/hs-fs/hubfs/aliaa_B%26W.png?width=50&name=aliaa_B%26W.png",
    authorName: "Aliaa El Alaily",
    date: "Mar 28, 2023 12:05:07 PM",
    someText:
      "What’s the first thing you do as soon as you arrive at your vacation home? Clean, take out the furni...",
  },
  {
    id: 8,
    title:
      "Partment | Efreshli - vacation home ownership and furnishing made easy",
    imageUrl:
      "https://blog.partment.co/hubfs/And%20If%20you%20are%20currently%20looking%20to%20renovate%20your%20home%2c%20enjoy%2020%25%20off%20the%20top-notch%20design%20services%20at%20Efreshli%20using%20the%20promo%20code%20PARTMENT20.%20The%20Efreshli%20expert%20team%20is%20ready%20to%20bring%20your%20design%20vision%20to%20life.%20.png",
    profilePhotoUrl:
      "https://blog.partment.co/hs-fs/hubfs/Untitled%20design%20(8).png?width=50&name=Untitled%20design%20(8).png",
    authorName: "Sarah Hegazy",
    date: "Mar 13, 2023 12:15:00 PM",
    someText:
      "We are thrilled to announce that Partment and Efreshli are partnering up - two companies revolutioni...",
  },
  {
    id: 9,
    title: "Scheduling Time in a Co-Owned Second Home: What to Expect",
    imageUrl: "https://blog.partment.co/hubfs/Blog_post_scheduling-3.png",
    profilePhotoUrl:
      "https://blog.partment.co/hs-fs/hubfs/aliaa_B%26W.png?width=50&name=aliaa_B%26W.png",
    authorName: "Aliaa El Alaily",
    date: "Feb 22, 2023 8:53:15 AM",
    someText:
      "Booking your days in a co-owned second-home might seem complicated, but our Smart Booking System tec...",
  },
];

function App() {
  const [cards] = useState(initialCards);

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Head />
                <div className="app">
                  <div className="card-grid">
                    {cards.map((card) => (
                      <Card
                        key={card.id}
                        id={card.id}
                        title={card.title}
                        imageUrl={card.imageUrl}
                        profilePhotoUrl={card.profilePhotoUrl}
                        authorName={card.authorName}
                        date={card.date}
                        someText={card.someText}
                      />
                    ))}
                  </div>
                </div>
              </>
            }
          />
          <Route path="/blog/:id" element={<Blog cards={cards} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
