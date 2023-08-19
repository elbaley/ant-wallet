export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pt-7 pl-7 min-h-screen">
      <div className="logo flex items-center gap-1">
        <img
          className="h-9 aspect-square hover:opacity-80 "
          src="./antwallet_logo.png"
        />
        <h2>Ant Wallet</h2>
      </div>
      <div className="max-w-md mt-7">{children}</div>
    </div>
  );
}
