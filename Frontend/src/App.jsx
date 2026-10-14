import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Map from "./Pages/Map";
import ServicesPage from "./Pages/ServicesPage";
import AboutPage from "./Pages/AboutPage";
import LoadingPage from "./Pages/LoadingPage";
function App() {
const [isLoading, setIsLoading] = useState(() => {
  return !sessionStorage.getItem("bhuvanLoadingShown");
});

useEffect(() => {
  if (!isLoading) return;

  sessionStorage.setItem("bhuvanLoadingShown", "true");

  const timer = setTimeout(() => {
    setIsLoading(false);
  }, 5000);

  return () => clearTimeout(timer);
}, [isLoading]);

if (isLoading) {
  return <LoadingPage />;
}
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/map" element={<Map />} />
      <Route path="/service" element={<ServicesPage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
}

export default App;
