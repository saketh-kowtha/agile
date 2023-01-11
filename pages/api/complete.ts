// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import request from "../../config/request";

type Data = {
  message?: string;
  data?: any;
};

const base = `
Get Agile epics, stories, tasks with rough estimates and AC's in html format use H2 -> epics, H3 -> stories, H4 -> Tasks, Italic->estimates and H5->Acs.
`;
const appendStr = (str: string) => base + str;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, token } = req.body;
  if (!prompt) return res.status(401).json({ message: "Bad request" });
  request(appendStr(prompt), token)
    .then((response) => {
      res.status(200).send(response?.data?.choices?.[0]?.text);
    })
    .catch((error) => {
      console.log(error.response);
      res.status(500).json({ message: "Something went wrong" });
    });
}
