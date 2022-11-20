import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data } = await axios.get(
      `https://aed2.herokuapp.com/v1/movies?title=${req.query.movieName}`
    );
    res.status(200).json(data);
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }
}
