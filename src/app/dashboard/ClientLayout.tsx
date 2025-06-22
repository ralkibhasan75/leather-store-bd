// src/app/dashboard/ClientLayout.tsx
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white min-h-screen">
      <div className="border-b px-6 py-4 text-xl font-serif font-semibold">
        Client Dashboard
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}
