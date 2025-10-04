import Router from "./Router";
import Navbar from "./components/Navbar/Navbar";
import { Layout } from "./components/Layout/Layout";

function App() {
  return (
    <>
      <Navbar />

      <Layout>
        <Router />
      </Layout>
    </>
  );
}

export default App;
