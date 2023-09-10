import prisma from "@/app/libs/prismadb";

export default async function getListings() {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(), // is not a date that we should passing to the client component --> create a new type in index.tx
    }));

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
