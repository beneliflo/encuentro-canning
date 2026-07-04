import GenzEmubaPixel from './GenzEmubaPixel';

export default function GenzLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GenzEmubaPixel />
      {children}
    </>
  );
}
