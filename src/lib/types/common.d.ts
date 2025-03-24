declare type SearchParams = string | string[] | undefined;

declare type RouteProps = {
  params: { locale: Locale };
  searchParams: SearchParams;
};

declare type LayoutProps = {
  children: React.ReactNode;
} & Pick<RouteProps, 'params'>;
declare type Layout = {
  children: React.ReactNode;
};
