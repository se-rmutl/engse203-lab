import React, { useState, memo, useCallback } from 'react';
import { LabTopic } from '../LabTopic';

const HeavyCalculationComponent = memo(function HeavyCalculationComponent({ onCalculate }) {
  console.log('HeavyCalculationComponent is rendering!');
  return <button onClick={onCalculate} className="bg-purple-500 text-white p-2 rounded hover:bg-purple-600 transition">Perform Heavy Calculation</button>;
});

export function PerformanceTopic() {
  const [count, setCount] = useState(0);

  const performCalculation = useCallback(() => {
    console.log("Performing calculation...");
  }, []);

  return (
    <LabTopic title="หัวข้อที่ 5: Performance Optimization">
      <p className="mb-2">เปิด Console (F12) เพื่อดู Log การ Render</p>
      <div className="mb-4">
        <h3 className="text-lg">Unrelated Counter: {count}</h3>
        <button onClick={() => setCount(c => c + 1)} className="bg-gray-200 p-2 rounded hover:bg-gray-300 transition">Increment</button>
      </div>
      <hr className="my-4" />
      <HeavyCalculationComponent onCalculate={performCalculation} />
      <div className="mt-4 p-3 bg-amber-100 border-l-4 border-amber-500 rounded-r-lg text-sm">
        <b>โจทย์:</b> ทำให้ <code>HeavyCalculationComponent</code> ไม่ re-render ทุกครั้งที่กดปุ่ม "Increment"
      </div>
    </LabTopic>
  );
}
