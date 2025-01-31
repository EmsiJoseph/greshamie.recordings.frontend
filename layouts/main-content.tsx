export const MainContent = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="flex-1 px-4 py-6">
        {children}
      </div>
    )
  }