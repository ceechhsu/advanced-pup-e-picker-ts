import { CreateDogForm } from "./Components/CreateDogForm";
import { Dogs } from "./Components/Dogs";
import { Section } from "./Components/Section";
import { DogsProvider, useDogs } from "./providers/DogsProvider";

export function App() {
  const { activeTab } = useDogs();
  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <Section label={"Dogs: "}>
        {activeTab === "create-dog-form" ? <CreateDogForm /> : <Dogs />}
      </Section>
    </div>
  );
}
