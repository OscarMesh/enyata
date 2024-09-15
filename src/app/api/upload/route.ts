import { NextRequest, NextResponse } from "next/server";
import formidable, { errors as formidableErrors } from "formidable";
import { PDFExtract, PDFExtractOptions } from "pdf.js-extract";
import mime from "mime";
import { auth } from "@clerk/nextjs/server";
import OpenAI from "openai";
import clientPromise, { dbName, document_names } from "../mongodb";
import { Scanned_docs } from "../model.dto";

const openai = new OpenAI();

export async function POST(req: NextRequest, res: NextResponse) {
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
    let result: any[] = [];

    const formData = await req.formData();

    const file = formData.get("file") as Blob | null;
    if (!file) {
      return NextResponse.json(
        { error: "File blob is required." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const mimeType = mime.getExtension(file.type);

    switch (mimeType) {
      case "pdf":
        result = await parsePDFDocument(buffer);
        break;

      case "jpg":
      case "jpeg":
      case "png":
      case "webp":
        let resp;
        resp = await parseImage(buffer, mimeType);
        resp = resp ? JSON.parse(resp) : null;

        if (resp && resp.length > 0) {
          for (let d of resp as Scanned_docs[]) {
            const docs = await db
              .collection<Scanned_docs>(document_names.scanned_docs)
              .findOne({
                transaction_id: d?.transaction_id,
                user_id: userId,
              });

            if (!docs) {
              d["date"] = new Date(d["date"]);
              d["user_id"] = userId;
              d["created_at"] = new Date();
              result.push(d);
            }
          }

          result.length > 0 &&
            (await db
              .collection(document_names.scanned_docs)
              .insertMany(result));
        }
        break;

      default:
        break;
    }

    console.log(file.type);

    return NextResponse.json({
      status: true,
      data: result,
    });
  } catch (error) {
    return NextResponse.json({
      error,
    });
  }
}

async function parsePDFDocument(buf: Buffer) {
  return [
    {
      message: "No pdf implementation yet",
    },
  ];
  //   const fields = form.getFields();

  //   console.log("pdf doc bruv", form);
}

async function parseImage(buf: Buffer, ext: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `
        You will be provided with an image that should correspond to a receipt. 
        You will go through the receipt and return a consistent array of objects, with the keys
        as these: transaction, transaction_id, amount, status, date, benefactor and category.

        - transaction: What the item being bought is for
        - transaction_id: a unique identifier for the receipt
        - amount: Amount of the sold item (always a positive number)
        - status: If the transaction was succesful or not (only two possible values: true or false)
        - date: Date of purchase in ISO format
        - benefactor: The recipient of the purchase, the seller
        - category: If it was a credit transaction or debit transaction (only two possible values: debit or credit)

        If the image does not correspond to a receipt return an empty array. 
        For any values that can't be determined return javascript null.
        Return only the json format with no writeups for all instances.
        `,
      },
      {
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: {
              url: `data:image/${ext};base64,${buf.toString("base64")}`,
            },
          },
        ],
      },
    ],
  });

  return response.choices[0].message.content;
}
