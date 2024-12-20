// 'use client';

// import { getCardsFromUsersDeck } from '@/app/lib/actions';
// import { deleteDataByKeyword } from '@/app/lib/actions';
// import { useState } from 'react';

// export default function DataCard() {

//   const [data, setData] = useState({});

//     function fetchData() {
//     const data = getCardsFromUsersDeck("alex", "french");
//     setData(data);  }

//   function handleDeleteByKeyword() {
//     deleteDataByKeyword('hello');
    
//   }

//   const stringData = JSON.stringify(data);

//   return (
//     <div>
//       <button onClick={fetchData}>Fetch Data</button>
//       <p>{stringData}</p>
//       <button onClick={handleDeleteByKeyword}>Delete all words with keyword 'laussanna'</button>

//     </div>
//   );
// }