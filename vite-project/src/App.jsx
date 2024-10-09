import React from 'react';
import Corousel from './Corousel';

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className=" mx-auto bg-white rounded-lg shadow-lg overflow-hidden my-20"> {/* Set a fixed height and width */}
        <Corousel />
      </div>
    </div>
  );
}

export default App;
