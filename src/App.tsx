import Header from "@/components/Header";
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
      </Layout>
    </Provider>
  );
}

export default App;
