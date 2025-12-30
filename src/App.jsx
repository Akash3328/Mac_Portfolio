import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { Navbar, Welcome, Dock ,Home,ScreenGuard} from "#components";
import { Terminal, Safari,Resume, Finder, Text, Image , Contact, Photos } from "#windows";
gsap.registerPlugin(Draggable);


const App = () => {
  
  return (
    <ScreenGuard>
    <main>
      <Navbar />
    <Welcome/>
      <Dock />
      <Home/>

      <Terminal />
      <Safari />
      <Resume />
      <Finder />  
      <Text/>
      <Image/>    
      <Contact/>
      <Photos/>
    </main>
    </ScreenGuard>
  );
};

export default App;
