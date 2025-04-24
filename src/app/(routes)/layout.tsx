import Providers from "@/components/providers";

export default function LocaleLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <title>Elevate</title>
      </head>
      <body>
        <Providers>
          {/* Main */}
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
