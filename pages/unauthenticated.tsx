import Layout from "@/components/Layout";
import Link from "next/link";

const Unauthenticated = () => {
  return (
    <Layout title="authenticated page" className="text-center justify-center">
      <h1 className="text-lg">You should login to view requested page</h1>
      <Link href="/" className="btn__secondary mx-auto">
        Login
      </Link>
    </Layout>
  );
};

export default Unauthenticated;
