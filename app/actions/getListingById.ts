import { Listing } from "@prisma/client";
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

// call this function in the page.tsx of listingsID/[listingId]
export default async function getListingById(params: IParams) {
  const { listingId } = params;

  try {
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });

    if (!listing) {
      return null;
    }

    return {
      ...listing,
      createdAt: listing.createdAt.toString(),
      user: {
        ...listing.user,
        createAt: listing.user.createAt.toString(),
        updateAt: listing.user.updateAt.toString(),
        emailVerified: listing.user.emailVerified?.toString() || null,
      },
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
