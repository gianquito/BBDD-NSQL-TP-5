'use client'

import { Button } from './ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'

export default function EliminarMenu({ id, nombre }: { id: string; nombre: string }) {
    const [menuOpen, setMenuOpen] = useState(false)
    const router = useRouter()

    function handleSubmit() {
        fetch('http://localhost:8080/eliminarSuperheroe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id,
            }),
            cache: 'no-store',
        })
            .then((res) => res.json())
            .then(() => {
                setMenuOpen(false)
                router.push('/')
                toast.success('Personaje eliminado!', {
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
            })
            .catch(() => {})
    }

    // useEffect(() => {
    //     if (!menuOpen) return
    //     getPersonaje(id).then((data) => {
    //         if (data === undefined) return
    //         setFormData({
    //             nombre: data.nombre,
    //             nombreReal: data.nombreReal,
    //             añoDeAparicion: data.añoDeAparicion,
    //             casa: data.casa,
    //             biografia: data.biografia,
    //         })
    //         setEquipamiento(data.equipamiento.map((eq) => ({ value: eq, label: eq })))
    //         //imagenes
    //     })
    // }, [menuOpen])

    return (
        <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
            <DialogTrigger>
                <Button className='h-9' variant='destructive'>
                    <Trash2 className='mr-2 h-4 w-4' /> Eliminar
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Eliminar personaje</DialogTitle>
                    <DialogDescription>¿Estás seguro que deseas eliminar este personaje?</DialogDescription>
                </DialogHeader>
                <p className='font-bold text-xl my-4'>{nombre}</p>
                <div className='flex w-full gap-2'>
                    <Button variant='destructive' onClick={handleSubmit} className='w-full'>
                        Confirmar
                    </Button>
                    <Button variant='outline' onClick={() => setMenuOpen(false)} className='w-full'>
                        Cancelar
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
