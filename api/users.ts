import type { VercelRequest, VercelResponse } from '@vercel/node'

export default function users(req: VercelRequest, res: VercelResponse) {
  try{
  const { name = 'World' } = req.query
  return res.json({
    message: `Hello ${name}!`,
  })
}
catch(error){
  console.log(error)
}
}