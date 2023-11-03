import  moment  from 'moment';
import prisma from "@/libs/prismadb";

export default async function getGraphData() {
    try {
        //get the start and end date for the data range
        const startDate = moment().subtract(6, "days").startOf("day");
        const endDate = moment().endOf("day");
        //Query the database to get order data grouped by createdDate
        const result = await prisma.order.groupBy({
            by: ["createDate"],
            where: {
                createDate: {
                    gte: startDate.toISOString(),
                    lte: endDate.toISOString(),
                },
                status: "complete",
            },
            _sum: {
                amount: true,
            },
        });

// Initialize an object to aggregate the data by day
   const aggregatedData: {
     [day: string]: {day: string; date: string; totalAmount: number};
   } = {};

   //create a clone of the start date to iterate over each day
   const currentDate = startDate.clone();

   //iterate over each day in the date range
   while(currentDate <= endDate){

    //format the day as a string(eg "Monday")
    const day = currentDate.format("dddd");
    console.log("day<<<", day, currentDate);

    //Initialize the aggregate data for the day, date and total
    aggregatedData[day] = {
        day,
        date: currentDate.format("YYYY-MM-DD"),
        totalAmount: 0,
    };

    //Move to the next day
    currentDate.add(1, "day");
   }

   // Calculate the total amount for each day by summing the order amounts
   result.forEach((entry) => {
     const day = moment(entry.createDate).format("dddd");
     const amount = entry._sum.amount || 0;
     aggregatedData[day].totalAmount += amount;
   });

   //Convert the aggregatedData object to an array and sort it by date
   const formattedData = Object.values(aggregatedData).sort((a, b) => 
    moment(a.date).diff(moment(b.date))
   );
   
   //Return the formatted data
   return formattedData;
    } catch (error: any) {
        throw new Error(error);
    }
}