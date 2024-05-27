import { useState, useEffect } from "react";
import "./App.css";


function App({ url }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [scrollPercentage, setScrollPercentage] = useState(0);

  async function fetchData(getUrl) {
    try {
      setLoading(true);
      const response = await fetch(getUrl);
      const data = await response.json();
      if (data && data.products && data.products.length > 0) {
        setData(data.products);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }
  }
  useEffect(() => {
    fetchData(url);
  }, [url]);

  function handleScrollPercentage() {
    console.log(
      document.body.scrollTop,
      document.documentElement.scrollTop,
      document.documentElement.scrollHeight,
      document.documentElement.clientHeight
    );
    const howMuchScrolled =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    setScrollPercentage((howMuchScrolled / height) * 100);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScrollPercentage);
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  console.log(data, scrollPercentage);

  if (errorMessage) {
    return <div>Error ! {errorMessage}</div>
  };

  if (loading) {
    return <div>Loading data, please wait!</div>
  }

  return (
    <>
      <div>
        <div className="top-container">
          <h1>Custom Scroll Indicator</h1>
          <div className="scroll-container">
            <div
              style={{ width: `${scrollPercentage}%` }}
              className="current-progress-bar"
            ></div>
          </div>
        </div>

        <div className="data-container">
          {data && data.length > 0
            ? data.map((dataItem) => <p>{dataItem.title}</p>)
            : null}
        </div>
      </div>
    </>
  );
}

export default App;
