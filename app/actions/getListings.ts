import prisma from "@/app/libs/prismadb";

export interface IListingParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
  // everything optional cause we don't have to select any category in ListingCard component
}

export default async function getListings(params: IListingParams) {
  try {
    const {
      userId,
      guestCount,
      roomCount,
      bathroomCount,
      startDate,
      endDate,
      locationValue,
      category,
    } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    if (roomCount) {
      query.roomCount = {
        gte: +roomCount, // cast string to number
      };
    }

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount, // cast string to number
      };
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount, // cast string to number
      };
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    if (startDate && endDate) {
      // write a filter that actually finds all of this listing inside this dateRage
      // but i use query.not to reverse that logic
      query.NOT = {
        reservation: {
          some: {
            OR: [
              // use combination to ensure filter all kinds of conflicts reservations
              // if having a single day in the reservation date range i gonna filter out
              // that listing cause we can't create a full booking on that
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
    }

    const listings = await prisma.listing.findMany({
      where: query,
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
