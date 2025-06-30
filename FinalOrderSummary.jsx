import React from 'react';

const itemPrices = {
  Milk: 25,
  Bread: 20,
  Eggs: 60,
  Butter: 50,
};

const FinalOrderSummary = ({ fulfilledItems, fallbackMatches, onDone }) => {
  const totalItems = [...fulfilledItems];
  Object.values(fallbackMatches).forEach(items => {
    totalItems.push(...items);
  });

  const totalPrice = totalItems.reduce((sum, { item, qty }) => {
    return sum + (itemPrices[item] || 0) * qty;
  }, 0);

  return (
    <div style={styles.container}>
      <h2>🧾 Final Merged Order Summary</h2>

      <div style={styles.box}>
        <h4>From Dark Store:</h4>
        <ul>
          {fulfilledItems.map(({ item, qty }, i) => (
            <li key={i}>
              {item} × {qty} @ ₹{itemPrices[item] || '-'} = ₹
              {(itemPrices[item] || 0) * qty}
            </li>
          ))}
        </ul>
      </div>

      <div style={styles.box}>
        <h4>From Kirana Stores:</h4>
        {Object.entries(fallbackMatches).map(([store, items], i) => (
          <div key={i}>
            <strong>{store}</strong>
            <ul>
              {items.map(({ item, qty }, j) => (
                <li key={j}>
                  {item} × {qty} @ ₹{itemPrices[item] || '-'} = ₹
                  {(itemPrices[item] || 0) * qty}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={styles.summary}>
        <p>🛍️ Total Items: {totalItems.reduce((sum, i) => sum + i.qty, 0)}</p>
        <p>💰 Total Price: ₹{totalPrice}</p>
      </div>

      <button onClick={onDone} style={styles.button}>
        ✅ Done
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '520px',
    margin: '30px auto',
    padding: '20px',
    fontFamily: 'sans-serif',
    backgroundColor: '#fcfcfc',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  box: {
    marginBottom: '20px',
    backgroundColor: '#f4f6f7',
    padding: '10px',
    borderRadius: '8px',
  },
  summary: {
    backgroundColor: '#eafaf1',
    padding: '10px',
    borderRadius: '8px',
    marginTop: '20px',
    fontWeight: 'bold',
  },
  button: {
    marginTop: '20px',
    padding: '12px 18px',
    backgroundColor: '#34495e',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default FinalOrderSummary;
