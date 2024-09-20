import Sidebar from "@/components/Sidebar";
import { useEffect } from "react";

const SuggestionsPage = () => {
  useEffect(() => {
    document.title = "ACE | Suggestions"
  }, [])
  return (
    <>
      <Sidebar />
    </>
  );
}

export default SuggestionsPage;
