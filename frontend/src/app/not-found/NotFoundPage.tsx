import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <h2 className="text-4xl font-semibold">Page Not Found</h2>
        <p className="mt-3 text-2xl">
          The page you are looking for does not exist.
        </p>
        <div className="flex flex-wrap justify-center max-w-md mt-6 sm:w-full">
          <Link href="/">
            <a className="px-4 py-2 m-2 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700">
              Go to Home
            </a>
          </Link>
          <Link href="/contact">
            <a className="px-4 py-2 m-2 text-lg font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700">
              Contact Support
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
}