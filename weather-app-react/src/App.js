import "./App.css";
import Search from "./components/search/search";

function App() { 
  const handleOnSearchChange = (searchData) => {
    console.log("Search data:", searchData);
  };

  return (
    <div className="app">
      <Search onSearchChange={handleOnSearchChange} />
    </div>
  );
}

export default App;
