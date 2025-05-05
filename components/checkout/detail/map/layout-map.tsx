"use client";

export function LayoutMap() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Layout Map</h2>
      <div className="border rounded-lg p-6">
        <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg font-medium mb-2">Hotel Layout Map</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Interactive map coming soon
            </p>
            <div className="mt-4">
              <img
                src="/placeholder.svg?height=400&width=800"
                alt="Hotel Layout Map"
                className="max-w-full h-auto mx-auto"
              />
            </div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-bold mb-4">Floor Directory</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Ground Floor:</span>
                <span>Lobby, Reception, Café</span>
              </li>
              <li className="flex justify-between">
                <span>1st Floor:</span>
                <span>Restaurants, Bars</span>
              </li>
              <li className="flex justify-between">
                <span>2nd Floor:</span>
                <span>Grand Ballroom, Meeting Rooms</span>
              </li>
              <li className="flex justify-between">
                <span>3rd Floor:</span>
                <span>Spa, Fitness Center, Pool</span>
              </li>
              <li className="flex justify-between">
                <span>4th-15th Floors:</span>
                <span>Guest Rooms and Suites</span>
              </li>
              <li className="flex justify-between">
                <span>16th-18th Floors:</span>
                <span>Executive Suites</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Facilities</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-red-500"></span>
                <span>Emergency Exits</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-blue-500"></span>
                <span>Elevators</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-green-500"></span>
                <span>Restrooms</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-yellow-500"></span>
                <span>Restaurants</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-purple-500"></span>
                <span>Meeting Rooms</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-orange-500"></span>
                <span>Recreational Areas</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
