export default function MainLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={'w-full flex gap-4'}>
    {children}
  </div>;
}