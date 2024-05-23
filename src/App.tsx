import "./App.css";
import ControlContent from "./components/ControlContent";
import DataContent from "./components/DataContent";
import DemoContent from "./components/DemoContent";
import FooterContent from "./components/FooterContent";
import Header from "./components/Header";
import Headline from "./components/Headline";
import MidContent from "./components/MidContent";

function App() {
  return (
    <div className="bg-white">
      <Header />
      <Headline />
      <MidContent />
      <DemoContent />
      <DataContent />
      <ControlContent />
      <FooterContent />
    </div>
  );
}

export default App;
