"use client";

export function AboutUs() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">About Us</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src="/placeholder.svg?height=400&width=600"
            alt="Shangri-La Ulaanbaatar"
            className="rounded-lg w-full h-auto"
          />
        </div>
        <div className="space-y-4">
          <p className="text-lg">
            Shangri-La Ulaanbaatar is Mongolia's premier luxury hotel, offering
            world-class hospitality in the heart of the capital city.
          </p>
          <p>
            Since opening our doors in 2015, we have been committed to providing
            exceptional service and creating memorable experiences for our
            guests from around the world.
          </p>
          <p>
            Our hotel features 290 elegantly appointed rooms and suites,
            multiple dining venues, comprehensive business facilities, and a
            range of leisure amenities including a spa, fitness center, and
            indoor pool.
          </p>
          <p>
            At Shangri-La Ulaanbaatar, we blend international luxury standards
            with authentic Mongolian hospitality to create a unique and
            welcoming environment for all our guests.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Our Team</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            {
              name: "Sarah Johnson",
              title: "General Manager",
              image: "/placeholder.svg?height=200&width=200",
            },
            {
              name: "Michael Chen",
              title: "Executive Chef",
              image: "/placeholder.svg?height=200&width=200",
            },
            {
              name: "Batbayar Tserenpil",
              title: "Director of Operations",
              image: "/placeholder.svg?height=200&width=200",
            },
            {
              name: "Elena Petrova",
              title: "Director of Sales",
              image: "/placeholder.svg?height=200&width=200",
            },
          ].map((person, index) => (
            <div key={index} className="text-center">
              <img
                src={person.image || "/placeholder.svg"}
                alt={person.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h4 className="font-bold">{person.name}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {person.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold mb-2">Address</h4>
            <p>19 Olympic Street, Sukhbaatar District</p>
            <p>Ulaanbaatar 14241, Mongolia</p>

            <h4 className="font-bold mt-4 mb-2">Phone</h4>
            <p>+976 7702 9999</p>

            <h4 className="font-bold mt-4 mb-2">Email</h4>
            <p>info.slub@shangri-la.com</p>
          </div>
          <div className="border rounded-lg overflow-hidden">
            <div className="aspect-video bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
              <p className="text-center text-gray-500 dark:text-gray-400">
                Map location
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
