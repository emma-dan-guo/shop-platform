// This file is used to interact with business logic
// such as orders in the database.
import { prisma } from '../db'

export const getMaxOrderId = async () => {
    try {
        // equal to SELECT id FROM tbl ORDER BY id DESC LIMIT 1; 
        // DB can rewrite it internally.
        const maxAge = await prisma.salesOrder.findMany({
          select: {
            id: true,
          },
          orderBy: {
            id: 'desc',
          },
          take: 1, // Take only the first result
        });
    
        return maxAge[0].id; // Return the maximum id
      } catch (error) {
        console.error('Error retrieving max id:', error);
        throw error;
      }
}

// Help us to determine whether new order is placed
let maxOrderId: any = undefined;
export const hasNewOrder = (async function () {
    // Since we employ an auto-increase primary key of order table,
    // we could determine if the key has increased by trick.
    const currentOrderId = await getMaxOrderId();
    const placed = currentOrderId > maxOrderId;
    console.log('LOG: [service:business] currentOrderId, maxOrderId', currentOrderId, maxOrderId, placed);
    maxOrderId = currentOrderId;
    return placed;
});

