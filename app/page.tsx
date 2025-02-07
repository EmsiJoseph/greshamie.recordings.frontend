import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div >
      Home
      
      <Button>
        <Link href="/login">Click me</Link>
      </Button>
    </div>
  );
}
