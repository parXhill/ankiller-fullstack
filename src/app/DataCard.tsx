'use client';

import { getCardsFromUsersDeck } from '@/app/lib/actions';
import { deleteDataByKeyword } from '@/app/lib/actions';
import { useState } from 'react';

export default function DataCard() {

  const [data, setData] = useState({});

  async function fetchData() {
    const data = await getCardsFromUsersDeck("alex", "french");
    console.log('data in client', data); // Use the fetched data here
    setData(data);  }

  async function handleDeleteByKeyword() {
    deleteDataByKeyword('lemon');
  }

  const stringData = JSON.stringify(data);

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      <p>{stringData}</p>
      <button onClick={handleDeleteByKeyword}>Delete all words with keyword 'laussanna'</button>

    </div>
  );
}