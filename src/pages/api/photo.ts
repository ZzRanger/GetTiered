import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { saveTierlist } from "../../components/firebase/firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  let test = JSON.parse(req.body);
 
  let img = await fetch(test.URL);
  res.status(200).send(img);
}

