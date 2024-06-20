import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'

interface CharacterCardProps {
    id: string
    charName: string
    realName?: string
    biography: string
    images: string[]
}

export default function CharacterCard({ id, charName, realName, biography, images }: CharacterCardProps) {
    return (
        <div className='flex-shrink-0 w-[338px]'>
            <Card>
                <CardContent className='flex justify-center'>
                    <img className='h-48' src={'/superheroes/' + images[0]} />
                </CardContent>
                <CardHeader>
                    <CardTitle>{charName}</CardTitle>
                    <CardDescription>{realName ?? '\u00A0'}</CardDescription>
                </CardHeader>
                <CardFooter>
                    <div>
                        <p className='w-72 overflow-hidden text-ellipsis line-clamp-3'>{biography}</p>
                        <a href={`/p/${id}`}>
                            <Button className='w-full mt-1' variant='secondary'>
                                Ver detalles
                            </Button>
                        </a>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
