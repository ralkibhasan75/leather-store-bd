export default function UnpaidNoticePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-center">
      <h1 className="text-4xl font-bold text-red-700 mb-4">
        Website Temporarily Suspended
      </h1>
      <p className="text-gray-700 max-w-xl">
        This website is currently unavailable due to unpaid project dues. Please
        contact the developer immediately to restore access.
      </p>
      <div className="mt-8">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} — Developer Notice Page
        </p>
      </div>
    </div>
  );
}
