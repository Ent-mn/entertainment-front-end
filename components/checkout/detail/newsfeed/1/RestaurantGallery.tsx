import { RestaurantCard } from "./RestaurantCard";

export default function RestaurantGallery() {
  const restaurants = [
    {
      title: "Bourique Bond - Restaurant",
      description:
        "Куэ за тэгээд ийм сайхан хотын төвд, ийм сайхан зуны гадаа ийм сайхан вино уугаад сүүх",
      date: "2025.10.05",
      time: "21:30",
      image:
        "https://www.travelandleisure.com/thmb/y89tkStO6XR422tnf3AvBKxQ6W4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/TAL-romantic-dining-table-RMANTCRESTRNT0225-2af03e348fcd4698898f3d69f6cdd240.jpg",
    },
    {
      title: "Bourique Bond - Restaurant",
      description:
        "Куэ за тэгээд ийм сайхан хотын төвд, ийм сайхан зуны гадаа ийм сайхан вино уугаад сүүх",
      date: "2025.10.05",
      time: "21:30",
      image:
        "https://www.travelandleisure.com/thmb/y89tkStO6XR422tnf3AvBKxQ6W4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/TAL-romantic-dining-table-RMANTCRESTRNT0225-2af03e348fcd4698898f3d69f6cdd240.jpg",
    },
    {
      title: "Bourique Bond - Restaurant",
      description:
        "Куэ за тэгээд ийм сайхан хотын төвд, ийм сайхан зуны гадаа ийм сайхан вино уугаад сүүх",
      date: "2025.10.05",
      time: "21:30",
      image:
        "https://www.travelandleisure.com/thmb/y89tkStO6XR422tnf3AvBKxQ6W4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/TAL-romantic-dining-table-RMANTCRESTRNT0225-2af03e348fcd4698898f3d69f6cdd240.jpg",
    },
  ];

  return (
    <div className="container mx-auto py-8 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Featured Restaurants
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant, index) => (
          <RestaurantCard key={index} {...restaurant} />
        ))}
      </div>
    </div>
  );
}
