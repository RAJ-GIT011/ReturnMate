import React, { useEffect, useState } from 'react';

// Mock kirana store inventory data
const mockStores = [
  {
    id: 'Store A',
    pincode: '110001',
    inventory: {
      Milk: 10,
      Eggs: 5,
      Rice: 3,
    },
  },
  {
    id: 'Store B',
    pincode: '110001',
    inventory: {
      Bread: 4,
      Butter: 6,
      Milk: 2,
    },
  },
  {
    id: 'Store C',
    pincode: '110001',
    inventory: {
      Eggs: 2,
      Bread: 1,
      Rice: 4,
    },
  },
];

const StoreMatcher = ({ cart, pin, onContinue }) => {
  const [matchedStores, setMatchedStores] = useState({});
  const [itemMatchStats, setItemMatchStats] = useState([]);
  const [noStoresNearby, setNoStoresNearby] = useState(false);

  useEffect(() => {
    matchItemsToStores();
  }, [cart, pin]);

  const matchItemsToStores = () => {
    const nearbyStores = mockStores.filter(store => store.pincode === pin);
    const result = {};
    const stats = [];

    if (nearbyStores.length === 0) {
      setNoStoresNearby(true);
      setItemMatchStats([]);
      setMatchedStores({});
      return;
    } else {
      setNoStoresNearby(false);
    }

    Object.entries(cart).forEach(([item, qty]) => {
      let matchedIn = 0;

      for (const store of nearbyStores) {
        const availableQty = store.inventory[item];
        if (availableQty && availableQty >= qty) {
          matchedIn++;
          if (!result[store.id]) result[store.id] = [];
          result[store.id].push({ item, qty });
          break; // assign to first matching store only
        }
      }

      stats.push({
        item,
        qty,
        foundIn: matchedIn,
        totalStores: nearbyStores.length
      });
    });

    setMatchedStores(result);
    setItemMatchStats(stats);
  };

  return (
    <div style={styles.container}>
      <h2>🏬 Store Matching Result</h2>

      {noStoresNearby ? (
        <p style={{ color: 'red' }}>⚠️ No kirana stores found near PIN: {pin}</p>
      ) : Object.keys(matchedStores).length > 0 ? (
        Object.entries(matchedStores).map(([storeId, items]) => (
          <div key={storeId} style={styles.storeBox}>
            <h4>{storeId}</h4>
            <ul>
              {items.map(({ item, qty }, index) => (
                <li key={index}>
                  {item} × {qty}
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>🔍 Matching stores found, but items may not be available in full quantity.</p>
      )}

      {!noStoresNearby && (
        <div style={styles.statsBox}>
          <h4>📊 Match Stats:</h4>
          <ul>
            {itemMatchStats.map(({ item, foundIn, totalStores }, i) => (
              <li key={i}>
                {item} ➜ Found in {foundIn}/{totalStores} nearby stores
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={() => onContinue(matchedStores)}
        style={styles.button}
        disabled={noStoresNearby}
      >
        🚚 Confirm & Simulate Rider Route
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '500px',
    margin: '0 auto',
    fontFamily: 'sans-serif',
  },
  storeBox: {
    backgroundColor: '#f1f1f1',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '8px',
  },
  statsBox: {
    backgroundColor: '#e6f7ff',
    padding: '10px',
    marginTop: '15px',
    borderRadius: '8px',
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#2c3e50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};

export default StoreMatcher;
