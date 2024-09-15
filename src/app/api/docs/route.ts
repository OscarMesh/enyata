import { NextRequest, NextResponse } from "next/server";
import clientPromise, { dbName, document_names } from "../mongodb";
import { Scanned_docs } from "../model.dto";
import { auth } from "@clerk/nextjs/server";
import { SortDirection, ObjectId } from "mongodb";

export async function GET(req: NextRequest, res: NextResponse) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json(
      { error: "Error: No signed in user" },
      { status: 401 }
    );
  }

  const client = await clientPromise;
  const db = client.db(dbName);

  try {
    const options = {
      sort: { created_at: -1 as SortDirection },
    };

    const docs = await db
      .collection<Scanned_docs>(document_names.scanned_docs)
      .find({ user_id: userId }, options)
      .toArray();

    return NextResponse.json({
      status: true,
      data: docs,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error,
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Error: No signed in user" },
        { status: 401 }
      );
    }

    const client = await clientPromise;
    const db = client.db(dbName);

    const { docs }: { docs: Scanned_docs[] } = await req.json();

    if (!Array.isArray(docs)) {
      return NextResponse.json(
        { error: "Docs Must be an array" },
        { status: 400 }
      );
    }

    const options = { ordered: true };

    let docs_re: Scanned_docs[] = [];

    for (let d of docs) {
      const findDoc = await db
        .collection(document_names.scanned_docs)
        .findOne({ transaction_id: d.transaction_id });

      if (findDoc) {
        return NextResponse.json(
          { error: "Duplicate transaction id" },
          { status: 400 }
        );
      }

      const scanned_d = {
        ...d,
        date: new Date(d["date"]),
        user_id: userId,
        created_at: new Date(),
      };

      docs_re.push(scanned_d);
    }

    const result =
      docs_re.length > 0 &&
      (await db
        .collection(document_names.scanned_docs)
        .insertMany(docs_re, options));

    if (!result) {
      throw new Error("insertion failed");
    }

    return NextResponse.json({
      result,
      status: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json(
      { error: "Error: No signed in user" },
      { status: 401 }
    );
  }
  try {
    const client = await clientPromise;
    const db = client.db(dbName);

    const { ids } = await req.json();

    if (!Array.isArray(ids)) {
      return NextResponse.json(
        { error: "Docs Must be an array" },
        { status: 400 }
      );
    }

    if (ids.length < 1) {
      return NextResponse.json({ error: "ids are required" }, { status: 400 });
    }

    for (let id of ids) {
      await db.collection(document_names.scanned_docs).deleteOne({
        _id: new ObjectId(id as string),
        user_id: userId,
      });
    }

    return NextResponse.json({
      message: `docs deleted`,
      status: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error,
      },
      { status: 500 }
    );
  }
}
