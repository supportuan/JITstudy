import { Navbar } from "./components/Navbar";
import { ScrollVideo } from "./components/ScrollVideo";
import { SectionOne } from "./components/SectionOne";
import { SectionTwo } from "./components/SectionTwo";

function App() {
  return (
    <div className="relative">
      <ScrollVideo />
      <Navbar />
      <main>
        <SectionOne />
        <SectionTwo />
      </main>
    </div>
  );
}

export default App;
