import Header from "@/components/Header";
import Icon from "@/components/Icon";
import Layout from "@/components/Layout";

function App() {
  return (
    <Layout>
      <Header />
      <div className="size-20 bg-black text-white">something</div>
      <Icon type="flag" />
    </Layout>
  );
}

export default App;
