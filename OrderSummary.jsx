import React from 'react';


const OrderSummary = ({ matchedStores = {}, cart = {}, onConfirm }) => {
  const flatItems = [];

  Object.entries(matchedStores).forEach(([store, items]) => {
    items.forEach(({ item, qty }) => {
      flatItems.push({ item, qty, store });
    });
  });

  const itemPrices = {
    Milk: 25,
    Bread: 20,
    Eggs: 60,
    Rice: 45,
    Butter: 50,
  };

  const getPrice = (item) => itemPrices[item] || 0;

  const totalPrice = flatItems.reduce((sum, i) => {
    return sum + getPrice(i.item) * i.qty;
  }, 0);

  return (
    <div className="order-wrapper">
      <div className="order-card slide-in">
        <h2>🧾 Final Order Summary</h2>

        {Object.keys(matchedStores).length === 0 ? (
          <p className="no-match">⚠️ No matched stores available. Please go back and try again.</p>
        ) : (
          <>
            {Object.entries(matchedStores).map(([storeId, items], idx) => (
              <div key={idx} className="store-block">
                <h4>🏬 {storeId}</h4>
                <ul>
                  {items.map(({ item, qty }, i) => (
                    <li key={i}>
                      {item} × {qty} @ ₹{getPrice(item)} = ₹{getPrice(item) * qty}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="summary-box">
              <p>🛍️ Total Items: {flatItems.reduce((sum, i) => sum + i.qty, 0)}</p>
              <p>💰 Total Price: ₹{totalPrice}</p>
            </div>

            <button onClick={onConfirm} className="confirm-btn">
              ✅ Confirm Order & Proceed
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;


