import { ContentLayout } from "@/components/panel/content-layout";
import { Button } from "@/components/ui/button";
import Image from "next/image";
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
