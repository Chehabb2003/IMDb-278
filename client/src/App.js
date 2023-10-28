import { useState, useEffect } from "react";

const App = () => {
  const [backendData, setbackEndData] = useState({});

  useEffect(() => {
    fetch('/api')
      .then(res => res.json())
      .then((data) => {
        setbackEndData(data);
      })
  }, [])


  return (
    <div>
      {(typeof backendData.users === 'undefined') ? (
        <p>loading...</p>
      ) : (
        backendData.users.map((user, i) => (
          <p key={i}>{user}</p>
        ))
      )
      }
    </div>
  );
}

export default App;