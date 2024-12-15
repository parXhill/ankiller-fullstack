'use server'

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


  async function main() {
    // Create a new record
    const newData = await prisma.ankillerTestData.create({
      data: {
        keyword: "laussanna",
        aigenerated: true,
      },
    });
    console.log("Inserted Data:", newData);
  
    // Fetch all records
    const testData = await prisma.ankillerTestData.findMany();
    console.log("All Data:", testData);
  }

  main()

  export async function addItem() {
    try {
      // Insert a new item with the keyword 'lemon'
      const newItem = await prisma.ankillerTestData.create({
        data: {
          keyword: 'lemon',
          aigenerated: false
        },
      });
      
      console.log('Item successfully added:', newItem);
      return newItem; // You can return the item if needed
    } catch (error) {
      console.error('Error inserting item:', error);
      throw new Error('Failed to insert item');
    }
  }

  