// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  // res.status(200).json({ name: 'John Doe' })

  if (req.method.toUpperCase() === 'POST') {
    res.status(201).json({ data: 'Successful POST' });
  } else if (req.method.toUpperCase() === 'GET') {
    res.status(200).json({ data: 'Successful GET' });
  }
}
