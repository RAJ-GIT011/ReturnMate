import React, { useEffect, useState } from 'react';

// Mock kirana stores
const mockKiranaStores = [
  {
    id: 'Kirana A',
    pincode: '110001',
    inventory: {
      Bread: 5,
      Butter: 3,
    },
  },
  {
    id: 'Kirana B',
    pincode: '110001',
    inventory: {
      Butter: 2,
      Milk: 1,
    },
  },
  {
    id: 'Kirana C',
    pincode: '110001',
    inventory: {
      Bread: 1,
    },
  },
];

const FallbackItemMatcher = ({ missingItems, userPin, onMatchFound }) => {
  const [matches, setMatches] = useState({});

  useEffect(() => {
    const nearby = mockKiranaStores.filter(store => store.pincode === userPin);
    const fallbackMap = {};
    const usedStores = new Set();

    missingItems.forEach(({ item, qty }) => {
      for (let store of nearby) {
        const stock = store.inventory[item];
        if (stock && stock >= qty) {
          if (!fallbackMap[store.id]) fallbackMap[store.id] = [];
          fallbackMap[store.id].push({ item, qty });
          usedStores.add(store.id);
          break;
        }
      }
    });

    setMatches(fallbackMap);
  }, [missingItems, userPin]);

  return (
    <div style={styles.container}>
      <h2>🛍️ Fallback Kirana Matching</h2>
      {Object.keys(matches).length === 0 ? (
        <p>❌ No kirana matches found nearby for the missing items.</p>
      ) : (
        <>
          <p>✅ Matched missing items with nearby kirana stores:</p>
          <ul>
            {Object.entries(matches).map(([store, items]) => (
              <li key={store}>
                <strong>{store}</strong>
                <ul>
                  {items.map(({ item, qty }, i) => (
                    <li key={i}>{item} × {qty}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <button onClick={() => onMatchFound(matches)} style={styles.button}>
            🚀 Proceed with Rider Pickup Plan
          </button>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
    margin: '30px auto',
    padding: '20px',
    backgroundColor: '#fefefe',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.05)',
    fontFamily: 'sans-serif',
  },
  button: {
    marginTop: '20px',
    padding: '10px 16px',
    backgroundColor: '#2980b9',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default FallbackItemMatcher;
