import Header from "@/components/Header";
import Icon from "@/components/Icon";
import Layout from "@/components/Layout";
import MineBody from "@/components/MineBody";

function App() {
  return (
    <Layout>
      <Header />
      <MineBody />
      <Icon type="flag" />
    </Layout>
  );
}

export default App;
