

interface ContentLayoutProps {
  children: React.ReactNode;
}

export function ContentLayout({children}: ContentLayoutProps) {
  return (
    <div>
      <div className="container px-4 sm:px-8">{children}</div>
    </div>
  );
}
