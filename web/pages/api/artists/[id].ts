import { NextApiRequest, NextApiResponse } from 'next'
import { getArtistPageData } from '../../../utils/test';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id: stringId },
    method: method,
  } = _req;

  const id : number = +stringId;

  try {
    switch(method) {
      case 'GET':
        const result = await getArtistPageData(id);
        res.status(200).json({"Artists":result});
        break;
  
      default:
        res.end()
    }
  } catch (err) { res.status(500).json({ statusCode: 500, message: err.message }) }
}

export default handler;