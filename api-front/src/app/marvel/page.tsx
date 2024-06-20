import CargarMenu from '@/components/CargarMenu'
import CharacterCard from '@/components/CharacterCard'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

async function getPersonajes(search: string | undefined) {
    const req = await fetch(`http://web-api:8080/superheroes?casa=Marvel${search ? '&search=' + search : ''}`, {
        cache: 'no-store',
    })
    const data: {
        _id: string
        nombre: string
        nombreReal?: string
        añoDeAparicion: number
        casa: 'Marvel' | 'DC'
        biografia: string
        equipamiento: string[]
        imagenes: string[]
    }[] = await req.json()
    return data
}

export default async function Home({ searchParams }: { searchParams: { s: string | undefined } }) {
    const superheroes = await getPersonajes(searchParams.s)
    return (
        <main className='flex flex-col items-center justify-between bg-background'>
            <form className='my-12 flex gap-2 items-center'>
                <input
                    className='rounded-md border h-10 w-96 px-4 placeholder:text-muted-foreground'
                    placeholder='Buscar'
                    name='s'
                />
                <Button className='rounded-xl' variant={'secondary'}>
                    <Search size={24} color='#ffffff' strokeWidth={2.25} />
                </Button>
            </form>
            <CargarMenu />
            <div className='w-full max-w-7xl justify-center font-mono text-sm lg:flex flex-wrap gap-8'>
                {superheroes.map((sh) => (
                    <CharacterCard
                        key={sh._id}
                        id={sh._id}
                        charName={sh.nombre}
                        realName={sh.nombreReal}
                        biography={sh.biografia}
                        images={sh.imagenes}
                    />
                ))}
            </div>
        </main>
    )
}
