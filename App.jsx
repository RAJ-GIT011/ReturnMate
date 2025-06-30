import React, { useState } from 'react';
import DarkStoreSummary from './components/DarkStoreSummary';
import FallbackItemMatcher from './components/FallbackItemMatcher';
import MapRouteSimulator from "./components/MapRouteSimulator";
import FinalOrderSummary from './components/FinalOrderSummary';

const App = () => {
  // Simulated cart from user
  const userOrder = {
    Milk: 2,
    Bread: 1,
    Eggs: 1,
    Butter: 1
  };

  // Simulated dark store inventory
  const darkStoreInventory = {
    Milk: 2,
    Eggs: 1,
    // Bread and Butter are missing here
  };

  const [stage, setStage] = useState('darkSummary');
  const [missingItems, setMissingItems] = useState([]);
  const [fulfilledItems, setFulfilledItems] = useState([]);
  const [fallbackMatches, setFallbackMatches] = useState({});

  const handleFallbackProceed = (fallbackMap) => {
    setFallbackMatches(fallbackMap);
    setStage('riderRoute');
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      {stage === 'darkSummary' && (
        <DarkStoreSummary
          fullCart={userOrder}
          inventory={darkStoreInventory}
          onProceed={(missing, fulfilled) => {
            setMissingItems(missing);
            setFulfilledItems(fulfilled);
            setStage('fallbackMatch');
          }}
        />
      )}

      {stage === 'fallbackMatch' && (
        <FallbackItemMatcher
          missingItems={missingItems}
          userPin="110001"
          onMatchFound={handleFallbackProceed}
        />
      )}

     {stage === 'riderRoute' && (
  <MapRouteSimulator
    fallbackMatches={fallbackMatches}
    onComplete={() => setStage('finalSummary')}
  />
)}



      {stage === 'finalSummary' && (
        <FinalOrderSummary
          fulfilledItems={fulfilledItems}
          fallbackMatches={fallbackMatches}
          onDone={() => alert('✅ Order completed!')}
        />
      )}
    </div>
  );
};

export default App;
