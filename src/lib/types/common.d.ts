declare type SearchParams = { [key: string]: string | string[] | undefined };

declare type RouteProps = {
  params: { locale: Locale; subject: string };
  searchParams: SearchParams;
};

declare type LayoutProps = {
  children: React.ReactNode;
} & Pick<RouteProps, "params">;
