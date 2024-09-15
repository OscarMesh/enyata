import { NextRequest, NextResponse } from "next/server";
import clientPromise, { dbName, document_names } from "../mongodb";
import { Scanned_docs } from "../model.dto";
import { ObjectId } from "mongodb";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json(
      { error: "Error: No signed in user" },
      { status: 401 }
    );
  }

  const param = req.nextUrl.searchParams;

  const client = await clientPromise;
  const db = client.db(dbName);

  try {
    const id = param.get("id");

    if (!id) {
      return NextResponse.json(
        {
          message: "Id is required",
        },
        {
          status: 400,
        }
      );
    }

    const doc = await db
      .collection<Scanned_docs>(document_names.scanned_docs)
      .findOne({ _id: new ObjectId(id), user_id: userId });

    return NextResponse.json({
      status: true,
      data: doc,
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

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const deletedDoc = await db
      .collection(document_names.scanned_docs)
      .deleteOne({
        _id: new ObjectId(id as string),
        user_id: userId,
      });

    return NextResponse.json({
      message: `doc deleted`,
      status: deletedDoc.acknowledged,
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

export async function PATCH(req: NextRequest) {
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

    const { id, ...rest } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const updated = await db.collection(document_names.scanned_docs).updateOne(
      {
        _id: new ObjectId(id), // Convert string id to ObjectId
        user_id: userId,
      },
      {
        $set: rest, // Use $set operator to update fields
      }
    );

    return NextResponse.json({
      message: "Doc updated",
      status: updated.acknowledged,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
