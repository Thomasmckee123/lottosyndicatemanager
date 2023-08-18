import React, { useEffect, useState } from 'react';
import { fetchGamesByTypeID } from '../../../services/games';
import { getTicketsByGameId } from '../../../services/ticket';


const RegularNumbers: any = ({ gameId}: any) => {
    const [data, setData] = useState<any[]>([]);

useEffect(()=>{
    console.log("GAME ID",gameId)
getTicketsByGameId(Number(gameId)).then((response: any)=>setData(Array(response)));
console.log("RESPONSE", data)

}, [gameId])
  return (
    <div>
      <h1>Game Numbers</h1>
      <ul>
        {data.map((item: any) => (
          <li key={item?.ticketCost}>{item?.TicketCode}</li>
        ))}
      </ul>
    </div>
  );
}

export default RegularNumbers;
