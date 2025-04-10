export function NewsFeed() {
  const newsItems = [
    {
      id: 1,
      title: "Summer Special Package Announced",
      date: "April 5, 2025",
      excerpt:
        "Enjoy our special summer package including spa treatments and exclusive dining experiences.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "New Executive Chef Joins Our Team",
      date: "March 28, 2025",
      excerpt:
        "We're excited to welcome Chef Michael Chen to lead our culinary team with his innovative approach to modern cuisine.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "Ballroom Renovation Complete",
      date: "March 15, 2025",
      excerpt:
        "Our Grand Ballroom renovation is now complete, featuring state-of-the-art technology and elegant new design.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      title: "Upcoming Cultural Events",
      date: "March 10, 2025",
      excerpt:
        "Join us for a series of cultural events showcasing traditional Mongolian arts and performances.",
      image: "/placeholder.svg?height=200&width=300",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Latest News</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {newsItems.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg overflow-hidden flex flex-col">
            <img
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {item.date}
              </p>
              <p className="mt-2 flex-1">{item.excerpt}</p>
              <button className="mt-4 text-yellow-500 hover:text-yellow-600 font-medium">
                Read More →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
