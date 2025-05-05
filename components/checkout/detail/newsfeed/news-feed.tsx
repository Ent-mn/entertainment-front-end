"use client";

import DetailNewsFeed1 from "./1/1";
import { RestaurantCard } from "./1/RestaurantCard";
import NewsFeed2 from "./2/NewsFeed2";

export function NewsFeed() {
  return (
    <div className="">
      {/* <RestaurantCard
        title={""}
        description={""}
        date={""}
        time={""}
        image={""}
      /> */}
      <DetailNewsFeed1 />
      <NewsFeed2 />
    </div>
  );
}
