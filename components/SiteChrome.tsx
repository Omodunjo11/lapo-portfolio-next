"use client";

import { usePathname } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hide = pathname?.startsWith("/war-room");

  if (hide) {
    return <>{children}</>;
  }

  return (
    <>
      <Nav />
      <main id="main-content" style={{ paddingTop: 57 }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
