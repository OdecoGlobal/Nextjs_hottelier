import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex h-screen flex-col">
      <Header />
      <main className="wrapper flex-1">{children}</main>
      <Footer />
    </section>
  );
}
