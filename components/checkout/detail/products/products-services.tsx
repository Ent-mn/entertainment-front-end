export function ProductsServices() {
  const services = [
    {
      id: 1,
      title: "Luxury Accommodations",
      description:
        "Experience our premium rooms and suites with panoramic city views and modern amenities.",
      icon: "🏨",
    },
    {
      id: 2,
      title: "Fine Dining",
      description:
        "Indulge in international and local cuisine at our award-winning restaurants.",
      icon: "🍽️",
    },
    {
      id: 3,
      title: "Spa & Wellness",
      description:
        "Rejuvenate your body and mind with our comprehensive spa treatments and wellness programs.",
      icon: "💆",
    },
    {
      id: 4,
      title: "Conference Facilities",
      description:
        "Host your events in our state-of-the-art meeting rooms and grand ballroom.",
      icon: "🏢",
    },
    {
      id: 5,
      title: "Wedding Services",
      description:
        "Create unforgettable memories with our comprehensive wedding planning services.",
      icon: "💍",
    },
    {
      id: 6,
      title: "Fitness Center",
      description:
        "Stay active in our fully-equipped fitness center with personal training options.",
      icon: "🏋️",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Products & Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">{service.icon}</div>
            <h3 className="text-xl font-bold mb-2">{service.title}</h3>
            <p>{service.description}</p>
            <button className="mt-4 text-yellow-500 hover:text-yellow-600 font-medium">
              Learn More →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
