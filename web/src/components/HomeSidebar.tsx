import { useEffect } from "react";
import { resolution } from "../utils/layout";
import { useLayoutStore } from "../store/module";
import ShortcutList from "./ShortcutList";
import TagList from "./TagList";
import SearchBar from "./SearchBar";
import UsageHeatMap from "./UsageHeatMap";

const HomeSidebar = () => {
  const layoutStore = useLayoutStore();
  const showHomeSidebar = layoutStore.state.showHomeSidebar;

  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth < resolution.md) {
        layoutStore.setHomeSidebarStatus(false);
      } else {
        layoutStore.setHomeSidebarStatus(true);
      }
    };
    window.addEventListener("resize", handleWindowResize);
    handleWindowResize();
  }, []);

  return (
    <div
      className={`fixed md:sticky top-0 left-0 w-full md:w-56 h-full flex-shrink-0 pointer-events-none md:pointer-events-auto z-10 ${
        showHomeSidebar && "pointer-events-auto"
      }`}
    >
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black opacity-0 pointer-events-none transition-opacity duration-300 md:!hidden ${
          showHomeSidebar && "opacity-60 pointer-events-auto"
        }`}
        onClick={() => layoutStore.setHomeSidebarStatus(false)}
      ></div>
      <aside
        className={`absolute md:relative top-0 right-0 w-56 pr-2 md:w-full h-full max-h-screen overflow-auto hide-scrollbar flex flex-col justify-start items-start py-4 z-30 bg-white dark:bg-zinc-800 md:bg-transparent md:shadow-none transition-all duration-300 translate-x-full md:translate-x-0 ${
          showHomeSidebar && "!translate-x-0 shadow-2xl"
        }`}
      >
        <div className="px-4 pr-8 mb-4 w-full">
          <SearchBar />
        </div>
        <UsageHeatMap />
        <ShortcutList />
        <TagList />
      </aside>
    </div>
  );
};

export default HomeSidebar;
