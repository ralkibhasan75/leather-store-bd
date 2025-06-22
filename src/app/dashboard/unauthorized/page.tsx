export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 text-center">
      <div>
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          403 - Access Denied
        </h1>
        <p className="text-gray-600">
          You do not have permission to view this page.
        </p>
      </div>
    </div>
  );
}
