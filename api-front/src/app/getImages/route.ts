import { promises as fs } from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic' // defaults to auto
export async function GET() {
    const imageDirectory = path.join(process.cwd(), '/public/superheroes')
    const imageFilenames = await fs.readdir(imageDirectory)
    return Response.json(imageFilenames.filter((fn) => fn.endsWith('png')))
}
