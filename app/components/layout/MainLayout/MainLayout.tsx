export default function MainLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="w-full flex justify-center">
    <div className="w-full flex gap-4 max-w-[1920px] lg:mx-auto">
      {children}
    </div>
  </div>;
}