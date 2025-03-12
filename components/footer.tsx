import Link from "next/link";

const footerColumns = [
  {
    title: "Topic",
    links: [
      { title: "Page", href: "#" },
      { title: "Page", href: "#" },
      { title: "Page", href: "#" },
    ],
  },
  {
    title: "Topic",
    links: [
      { title: "Page", href: "#" },
      { title: "Page", href: "#" },
      { title: "Page", href: "#" },
    ],
  },
  {
    title: "Topic",
    links: [
      { title: "Page", href: "#" },
      { title: "Page", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="w-full">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="text-xl font-semibold">
              entertainment.mn
            </Link>
          </div>
          {footerColumns.map((column, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-lg font-medium">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gradient-to-r from-[#FF7324] via-[#FF4E93] to-[#B84EFF] py-4">
        <div className="container mx-auto px-4">
          <p className="text-white text-center">
            2024 All rights reserved Entertainment.mn
          </p>
        </div>
      </div>
    </footer>
  );
}
