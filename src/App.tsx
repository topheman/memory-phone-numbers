import { useState } from "react";

import { ContactList } from "./components/ContactList";
import { PlayScreen } from "./components/PlayScreen";
import { SplashScreen } from "./components/SplashScreen";
import { useContacts } from "./hooks/useContacts";
import type { Screen } from "./types/contact";

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("splash");
  const { contacts } = useContacts();

  return (
    <div className="min-h-screen min-w-[320px] bg-gray-900 text-white">
      {currentScreen === "splash" && (
        <SplashScreen
          onNavigate={setCurrentScreen}
          hasContacts={contacts.length > 0}
        />
      )}
      {currentScreen === "contacts" && (
        <ContactList onNavigate={setCurrentScreen} />
      )}
      {currentScreen === "play" && <PlayScreen onNavigate={setCurrentScreen} />}
    </div>
  );
}

export default App;
