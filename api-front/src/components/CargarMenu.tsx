'use client'

import { Plus } from 'lucide-react'
import { Button } from './ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './ui/dialog'
import { Label } from './ui/label'
import MultipleSelector, { Option } from './MultipleSelector'
import { ChangeEvent, useEffect, useState } from 'react'
import { ScrollArea } from './ui/scroll-area'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function CargarMenu() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [imageList, setImageList] = useState([])
    const [selectedImages, setSelectedImages] = useState([])
    const [equipamiento, setEquipamiento] = useState<Option[]>([])
    const [formData, setFormData] = useState<{ [key: string]: string }>({ casa: 'Marvel' })
    const router = useRouter()

    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    function handleSubmit() {
        if (!formData.nombre || !formData.añoDeAparicion || !formData.biografia || selectedImages.length == 0) {
            toast.error('Formulario incompleto!')
            return
        }
        fetch('http://localhost:8080/cargarSuperheroe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...formData,
                equipamiento: equipamiento.map((eq) => eq.value),
                imagenes: selectedImages.map((image) => '/' + image),
            }),
            cache: 'no-store',
        })
            .then((res) => {
                if (!res.ok) {
                    throw 500
                }
                return res.json()
            })
            .then(() => {
                setMenuOpen(false)
                toast.success('Personaje cargado!', {
                    style: {
                        border: '1px solid #565110',
                        padding: '16px',
                        color: 'black',
                    },
                    iconTheme: {
                        primary: '#1673d0',
                        secondary: 'white',
                    },
                })
                router.refresh()
            })
            .catch(() => {})
    }

    useEffect(() => {
        fetch('/getImages', { cache: 'no-store' })
            .then((res) => res.json())
            .then((images) => setImageList(images))
    }, [])

    return (
        <Dialog modal={true} open={menuOpen} onOpenChange={setMenuOpen}>
            <DialogTrigger asChild>
                <Button variant='outline' className='h-9 mb-2'>
                    <Plus className='mr-2 h-5 w-5' /> Cargar personaje
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Cargar personaje</DialogTitle>
                    <DialogDescription>Crea un nuevo superheroe o villano.</DialogDescription>
                </DialogHeader>
                <div className='grid gap-4'>
                    <div>
                        <Label htmlFor='nombre' className='text-right'>
                            Nombre
                        </Label>
                        <input
                            className='rounded-md border h-10 w-full px-4 placeholder:text-muted-foreground'
                            name='nombre'
                            onChange={handleChange}
                            value={formData.nombre}
                        />
                    </div>
                    <div>
                        <Label htmlFor='nombreReal' className='text-right'>
                            Nombre real
                        </Label>
                        <input
                            className='rounded-md border h-10 w-full px-4 placeholder:text-muted-foreground'
                            name='nombreReal'
                            onChange={handleChange}
                            value={formData.nombreReal}
                        />
                    </div>
                    <div>
                        <Label htmlFor='añoDeAparicion' className='text-right'>
                            Año de aparición
                        </Label>
                        <input
                            className='rounded-md border h-10 w-full px-4 placeholder:text-muted-foreground'
                            name='añoDeAparicion'
                            type='number'
                            onChange={handleChange}
                            value={formData.añoDeAparicion}
                        />
                    </div>
                    <div>
                        <Label htmlFor='casa' className='text-right'>
                            Casa
                        </Label>
                        <select
                            className='rounded-md border h-10 w-full px-3'
                            name='casa'
                            onChange={handleChange}
                            value={formData.casa}
                        >
                            <option>Marvel</option>
                            <option>DC</option>
                        </select>
                    </div>
                    <div>
                        <Label htmlFor='equipo' className='text-right'>
                            Equipamiento
                        </Label>
                        <MultipleSelector
                            className='bg-white'
                            defaultOptions={[]}
                            placeholder='Seleccionar'
                            creatable
                            emptyIndicator={<p>Ingresa un nuevo equipamiento</p>}
                            onChange={(o) => setEquipamiento(o)}
                            value={equipamiento}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor='biografia' className='text-left'>
                            Biografía
                        </Label>
                        <textarea
                            name='biografia'
                            className='bg-white border px-2 py-1 rounded-md'
                            onChange={handleChange}
                            value={formData.biografia}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor='imagenes' className='text-left'>
                            Seleccionar imagenes
                        </Label>
                        <ScrollArea className='max-h-40 '>
                            <div className='flex gap-4 flex-wrap justify-center border rounded-md p-4'>
                                {imageList.map((image) => (
                                    <div
                                        className={`cursor-pointer w-16  ${
                                            selectedImages.includes(image)
                                                ? 'border-2 border-secondary'
                                                : 'border border-neutral-400'
                                        }  rounded-md hover:border-secondary hover:border-2 p-2 flex justify-center items-center hover:bg-neutral-300`}
                                        key={image}
                                        onClick={() => {
                                            setSelectedImages((prev) =>
                                                prev.includes(image)
                                                    ? prev.filter((img) => img !== image)
                                                    : [...prev, image]
                                            )
                                        }}
                                    >
                                        <img src={'/superheroes/' + image} />
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </div>
                <DialogFooter>
                    <Button type='submit' variant='secondary' onClick={handleSubmit}>
                        Guardar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
