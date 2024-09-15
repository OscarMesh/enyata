import { Banner } from "@/components/banner";
import { Header } from "@/components/header";

type props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: props) => {
  return (
    <>
      <Banner
        label="Scanopp is a cutting-edge SaaS platform powered by GPT image-to-text
            technology. It allows you to seamlessly scan and process financial
            documents, extracting and managing transaction data with ease.
            Whether you're dealing with receipts, invoices, or bank statements,
            Scanopp provides a quick and accurate way to handle your financial
            records. Simplify your financial management and stay organized with
            Scanopp."
      />
      <Header />
      <main className="px-3 lg:px-14 h-full">{children}</main>
    </>
  );
};

export default DashboardLayout;
