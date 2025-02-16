import Header from "@/components/Header";
import Icon from "@/components/Icon";
import Layout from "@/components/Layout";
import MineBody from "@/components/MineBody";
import { store } from "@/store/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Header />
        <MineBody />
        <Icon type="flag" />
      </Layout>
    </Provider>
  );
}

export default App;
