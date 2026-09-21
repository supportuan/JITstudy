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
        <div aria-hidden className="h-[80vh]" />
        <SectionTwo />
      </main>
    </div>
  );
}

export default App;
