import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch requests
    const requests = await prisma.request.findMany({
      orderBy: { requestDate: "desc" },
    });

    // Fetch metrics (counts for each status)
    const counts = await prisma.request.groupBy({
      by: ["status"],
      _count: { id: true },
    });

    const metrics = {
      Expired: 0,
      Accepted: 0,
      OnProgress: 0,
      Closed: 0,
    };

    counts.forEach((count) => {
      if (metrics.hasOwnProperty(count.status)) {
        metrics[count.status] = count._count.id;
      }
    });

    return NextResponse.json({ requests, metrics });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      {
        requests: [],
        metrics: { Expired: 75, Accepted: 75, OnProgress: 75, Closed: 50 },
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}