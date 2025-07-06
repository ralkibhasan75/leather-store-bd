import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
        <p className="mt-2 text-gray-700">
          You do not have permission to view this page.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
