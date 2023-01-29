import Layout, { FlexSpacer } from "../components/Layout";

const IndexPage = () => (
  <Layout>
    <div className="h-full flex flex-col gap-4 items-center">
      <FlexSpacer className="max-h-48 min-h-[100px]" />
      <h1 className="text-8xl my-6">Support</h1>
    </div>
  </Layout>
);

export default IndexPage;
