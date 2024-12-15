import type { AnkillerTestData } from '@prisma/client'; // Import the type from Prisma
import { addItem } from '@/app/lib/prisma-test'; // Import the function to add an item
import { getFullDatabase as getFullDatabaseAction } from './lib/actions';
import { AnyARecord } from 'dns';
import DataCard from './DataCard';
import AppCard from './lib/AppCard';

export default function Home() {
  // Use Prisma-generated type for state


  return (
    <div>
<DataCard/>
<AppCard/>
 </div>
  );
}