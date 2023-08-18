import React from 'react';

interface Props {
  numbers: number[];
}

const RegularNumbers: React.FC<Props> = ({ numbers }) => {
  return (
    <div>
      <h1>Game Numbers</h1>
      <ul>
        {numbers.map((num) => (
          <li key={num}>{num}</li>
        ))}
      </ul>
    </div>
  );
}

export default RegularNumbers;
