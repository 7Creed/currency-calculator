import { useEffect, useState } from "react";

function App() {
  const [amount, setAmount] = useState(0);
  const [fromCur, setFromCur] = useState("EUR");
  const [toCur, setToCur] = useState("USD");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      async function convert() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
          );
          const data = await res.json();
          // console.log(data.rates.USD);
          setConverted(data.rates[toCur]);
          setIsLoading(false);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (toCur === fromCur) return setConverted(amount);
      convert();
    },
    [amount, toCur, fromCur]
  );

  // function handleInputChange(e) {
  //   // console.log(e, e.target.value);
  //   setAmount(() => e.target.value);
  // }

  return (
    <>
      <h1>Currency Calculator</h1>
      <div>
        <input
          type="text"
          value={amount}
          // onChange={(e) => handleInputChange(e)}
          onChange={(e) => setAmount(Number(e.target.value))}
          // disabled={isLoading}
        />
        <select
          value={fromCur}
          onChange={(e) => setFromCur(e.target.value)}
          // disabled={isLoading}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <select
          value={toCur}
          onChange={(e) => setToCur(e.target.value)}
          // disabled={isLoading}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <p>
          OUTPUT: {converted} {toCur}
        </p>
      </div>
    </>
  );
}

export default App;
