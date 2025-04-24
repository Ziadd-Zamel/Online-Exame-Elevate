import Providers from "@/components/providers";

export default function LocaleLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {/* Main */}
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
