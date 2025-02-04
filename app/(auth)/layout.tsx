export default function NoPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="fixed inset-0 z-50 flex justify-center">
        {children}
      </div>
    </>
  );
}
