import React from 'react';
import './DarkStoreSummary.css'; // External CSS for styling

const DarkStoreSummary = ({ fullCart, inventory, onProceed }) => {
  const availableItems = [];
  const missingItems = [];

  Object.entries(fullCart).forEach(([item, qty]) => {
    if (inventory[item] && inventory[item] >= qty) {
      availableItems.push({ item, qty });
    } else {
      missingItems.push({ item, qty });
    }
  });

  return (
    <div className="darkstore-wrapper">
      <div className="darkstore-card slide-in">
        <h2>🏬 Dark Store Fulfillment Summary</h2>

        <div className="block available-block">
          <h4>✅ Available from Dark Store:</h4>
          {availableItems.length === 0 ? (
            <p className="subtle">None</p>
          ) : (
            <ul>
              {availableItems.map(({ item, qty }, i) => (
                <li key={i}>{item} × {qty}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="block missing-block">
          <h4>❌ Missing / Poor Quality Items:</h4>
          {missingItems.length === 0 ? (
            <p className="subtle">None</p>
          ) : (
            <ul>
              {missingItems.map(({ item, qty }, i) => (
                <li key={i}>{item} × {qty}</li>
              ))}
            </ul>
          )}
        </div>

        {missingItems.length > 0 ? (
          <button
            className="action-btn"
            onClick={() => onProceed(missingItems, availableItems)}
          >
            ⚡ Use Kirana Fallback for Missing Items
          </button>
        ) : (
          <p className="complete-msg">🎉 All items available! Normal delivery can proceed.</p>
        )}
      </div>
    </div>
  );
};

export default DarkStoreSummary;
