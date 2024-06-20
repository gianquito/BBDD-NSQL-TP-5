import ClientNavigator from '@/components/ClientNavigator'
import EliminarMenu from '@/components/EliminarMenu'
import ModificarMenu from '@/components/ModificarMenu'
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { getPersonaje } from '@/utils'

export default async function CharacterPage({ params }: { params: { id: string } }) {
    const personaje = await getPersonaje(params.id)
    if (!personaje) {
        return <ClientNavigator route='/404' />
    }
    return (
        <main className='flex min-h-screen flex-col items-center justify-between p-24 bg-background'>
            <div className='w-full max-w-3xl items-center font-mono text-lg flex flex-col gap-8'>
                <Carousel className='w-80'>
                    <CarouselContent>
                        {personaje.imagenes.map((imagen) => (
                            <CarouselItem key={imagen}>
                                <Card className='bg-transparent'>
                                    <CardContent className='flex aspect-square items-center justify-center'>
                                        <img src={`/superheroes/${imagen}`} />
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
                <div className='gap-2 flex self-end'>
                    <ModificarMenu id={params.id} />
                    <EliminarMenu id={params.id} nombre={personaje.nombre} />
                </div>
                <section className='flex justify-between w-full'>
                    <div className='flex flex-col gap-4'>
                        <p>
                            <b>Nombre:</b> {personaje.nombre}
                        </p>
                        <p>
                            <b>Nombre real:</b> {personaje.nombreReal ?? 'N/A'}
                        </p>
                        <p>
                            <b>Casa:</b> {personaje.casa}
                        </p>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <p>
                            <b>Año de aparición:</b> {personaje.añoDeAparicion}
                        </p>
                        <div className='flex gap-8'>
                            <p className='font-bold'>Equipamiento:</p>
                            <ul className='list-disc'>
                                {personaje.equipamiento.length > 0
                                    ? personaje.equipamiento.map((equipo) => (
                                          <li className='text-base' key={equipo}>
                                              {equipo}
                                          </li>
                                      ))
                                    : '-'}
                            </ul>
                        </div>
                        <div className='flex justify-center mt-1'>
                            <img src={`/casas/${personaje.casa}.svg`} className='w-12' />
                        </div>
                    </div>
                </section>
                <div>
                    <p className='font-bold text-center'>Biografía:</p>
                    <p className='text-base'>{personaje.biografia}</p>
                </div>
            </div>
        </main>
    )
}
