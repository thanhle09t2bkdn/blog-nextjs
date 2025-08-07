import Footer from "@/components/organisms/footer/Footer";
import Header from "@/components/organisms/header/Header";

export default async function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  // const { data } = await httpRequest.get(ApiUrl.RANDOM_PRODUCTS);
  // const products = (data?.result || []) as IProduct[];

  return (
    <div className="homepage bg-blue">
      <Header />
        <div className="content-wrap">
            {children}
        </div>
      <Footer isNoLine={false} />
    </div>
  );
}
