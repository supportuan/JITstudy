import { useState } from "react";
import { ContactModal } from "./components/ContactModal";
import { Navbar } from "./components/Navbar";
import { ScrollVideo } from "./components/ScrollVideo";
import { SectionOne } from "./components/SectionOne";
import { SectionTwo } from "./components/SectionTwo";

function App() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="relative">
      <ScrollVideo />
      <Navbar />
      <main>
        <SectionOne onContactClick={() => setContactOpen(true)} />
        <SectionTwo />
      </main>
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}

export default App;
