export async function getPersonaje(id: string) {
    const req = await fetch(`http://web-api:8080/superheroe?id=${id}`, { cache: 'no-store' })
    const data: {
        nombre: string
        nombreReal?: string
        añoDeAparicion: number
        casa: 'Marvel' | 'DC'
        biografia: string
        equipamiento: string[]
        imagenes: string[]
    }[] = await req.json()
    return data.length > 0 ? data[0] : undefined
}
