import Footer from "@/components/organisms/footer/Footer";
import Header from "@/components/organisms/header/Header";

export default async function Home() {
  // const { data } = await httpRequest.get(ApiUrl.RANDOM_PRODUCTS);
  // const products = (data?.result || []) as IProduct[];

  return (
    <div className="homepage bg-blue">
      <Header />
        <h1>Home page</h1>
      <Footer isNoLine={false} />
    </div>
  );
}
