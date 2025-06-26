export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex-center min-h-screen w-full max-w-md mx-auto px-5 ">
      {children}
    </main>
  );
}
