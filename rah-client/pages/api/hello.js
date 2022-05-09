// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { useRecoilState } from 'recoil';
import { jwtState } from '../../_states/tokenState';

export default function handler(req, res) {

  if (req.method.toUpperCase() === 'POST') {
    res.status(201).send({ data: 'Successful POST' });
  } else if (req.method.toUpperCase() === 'GET') {
    res.status(200).json({ data: 'Successful GET' });
  }
}
