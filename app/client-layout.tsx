import { ThemeProvider } from "next-themes";

export default function ClientLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
  
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
    );
  }