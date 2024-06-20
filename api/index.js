import express from 'express'
import { MongoClient, ObjectId } from 'mongodb'
import CORS from 'cors'

const app = express()

app.use(CORS())

app.use(express.static('public'))

app.use(express.json())

async function connect_db() {
    // const client = createClient({ url: 'redis://db-redis:6379' })
    const client = new MongoClient('mongodb://db-mongo:27017')
    try {
        await client.connect()
    } catch (err) {
        console.log('Error al conectarse a la base de datos ' + err)
    }
    return client
}

async function cargar_datos() {
    const client = await connect_db()
    const database = client.db('db_spa')
    const has_collection = await database.listCollections({ name: 'superheroes' }).toArray()
    if (has_collection.length === 0) {
        const collection = database.collection('superheroes')
        await collection.insertMany([
            {
                nombre: 'Spider-Man',
                nombreReal: 'Peter Parker',
                añoDeAparicion: 1962,
                casa: 'Marvel',
                biografia:
                    "Mordido por una araña radiactiva, el joven Peter Parker obtuvo habilidades sobrehumanas. Tras la muerte de su tío Ben, aprendió que 'un gran poder conlleva una gran responsabilidad'. Desde entonces, lucha contra el crimen como Spider-Man, balanceándose entre su vida personal y sus deberes heroicos.",
                equipamiento: ['Lanza telarañas', 'Traje especial'],
                imagenes: ['/spiderman.png', '/spiderman2.png', '/spiderman3.png'],
            },
            {
                nombre: 'Superman',
                nombreReal: 'Clark Kent',
                añoDeAparicion: 1938,
                casa: 'DC',
                biografia:
                    'Proveniente del planeta Krypton, Kal-El fue enviado a la Tierra cuando era un bebé. Criado como Clark Kent, desarrolló habilidades sobrehumanas bajo el sol amarillo. Como Superman, se convirtió en un símbolo de esperanza, luchando por la verdad, la justicia y el estilo americano.',
                equipamiento: ['Capa'],
                imagenes: ['/superman.png', '/superman2.png', '/superman3.png'],
            },
            {
                nombre: 'Iron Man',
                nombreReal: 'Tony Stark',
                añoDeAparicion: 1963,
                casa: 'Marvel',
                biografia:
                    'Genio, millonario, playboy filántropo. Tony Stark era un magnate de la industria armamentística hasta que una experiencia cercana a la muerte lo llevó a crear una armadura tecnológica que salvó su vida. Desde entonces, usa su intelecto y tecnología para luchar por el bien como Iron Man.',
                equipamiento: ['Armadura de Iron Man', 'JARVIS'],
                imagenes: ['/ironman.png', '/ironman2.png'],
            },
            {
                nombre: 'Batman',
                nombreReal: 'Bruce Wayne',
                añoDeAparicion: 1939,
                casa: 'DC',
                biografia:
                    'Tras presenciar el asesinato de sus padres, Bruce Wayne dedicó su vida a combatir el crimen. Se entrenó física y mentalmente, convirtiéndose en Batman, un vigilante enmascarado que infunde miedo en los corazones de los criminales de Gotham City.',
                equipamiento: ['Batibumeranes', 'Batimóvil', 'Cinturón de utilidades'],
                imagenes: ['/batman.png', '/batman2.png'],
            },
            {
                nombre: 'Capitan America',
                nombreReal: 'Steve Rogers',
                añoDeAparicion: 1941,
                casa: 'Marvel',
                biografia:
                    'Un joven patriota durante la Segunda Guerra Mundial, Steve Rogers fue transformado en un súper soldado gracias al suero del supersoldado. Congelado en el hielo y despertando décadas después, el Capitán América se convirtió en un símbolo de libertad y justicia, luchando por los ideales que siempre ha defendido.',
                equipamiento: ['Escudo de vibranium'],
                imagenes: ['/capitanamerica.png'],
            },
            {
                nombre: 'Wonder Woman',
                nombreReal: 'Diana Prince',
                añoDeAparicion: 1941,
                casa: 'DC',
                biografia:
                    'Princesa amazónica proveniente de la isla de Temiscira, Diana es una guerrera formidable con habilidades sobrehumanas. Armada con el lazo de la verdad y un fuerte sentido de la justicia, Wonder Woman lucha por la paz y la igualdad como embajadora de su gente.',
                equipamiento: ['Lazo de la verdad', 'Brazaletes de sumisión'],
                imagenes: ['/wonderwoman.png'],
            },
            {
                nombre: 'Thor',
                añoDeAparicion: 1962,
                casa: 'Marvel',
                biografia:
                    'Dios nórdico del trueno, Thor es un guerrero poderoso e hijo de Odín. Armado con su martillo Mjolnir, defiende a Asgard y la Tierra de cualquier amenaza. Aunque inicialmente arrogante, aprendió la humildad y el valor de ser un verdadero héroe.',
                equipamiento: ['Mjolnir'],
                imagenes: ['/thor.png'],
            },
            {
                nombre: 'Aquaman',
                nombreReal: 'Arthur Curry',
                añoDeAparicion: 1941,
                casa: 'DC',
                biografia:
                    'Hijo del farero Tom Curry y la reina Atlanna, Arthur Curry es el puente entre el mundo terrestre y el marino. Poseedor de una fuerza sobrehumana y la capacidad de comunicarse con las criaturas marinas, protege los océanos y la superficie como Aquaman.',
                equipamiento: ['Tridente de Neptuno'],
                imagenes: ['/aquaman.png'],
            },
            {
                nombre: 'Hulk',
                nombreReal: 'Bruce Banner',
                añoDeAparicion: 1962,
                casa: 'Marvel',
                biografia:
                    'El Dr. Bruce Banner fue expuesto a altos niveles de rayos gamma, transformándolo en una criatura de furia verde: Hulk. Mientras que Banner busca una cura para su condición, Hulk se convierte en una fuerza imparable cuando la ira lo domina.',
                equipamiento: [],
                imagenes: ['/hulk.png', '/hulk2.png', '/hulk3.png'],
            },
            {
                nombre: 'Green Lantern',
                nombreReal: 'Hal Jordan',
                añoDeAparicion: 1959,
                casa: 'DC',
                biografia:
                    'Piloto de pruebas, Hal Jordan fue elegido para ser un Green Lantern, un protector del universo equipado con un anillo de poder que le permite crear cualquier cosa que imagine. Luchando contra el miedo y la tiranía, se convirtió en uno de los Green Lanterns más grandes de todos los tiempos.',
                equipamiento: ['Anillo de poder'],
                imagenes: ['/greenlantern.png'],
            },
            {
                nombre: 'Wolverine',
                nombreReal: 'James Howlett',
                añoDeAparicion: 1974,
                casa: 'Marvel',
                biografia:
                    'Mutante canadiense con un factor de curación acelerado, sentidos agudizados y garras de hueso retráctiles, Wolverine ha vivido una larga vida llena de violencia y tragedia. A pesar de su naturaleza salvaje, lucha por la justicia y protege a los inocentes.',
                equipamiento: ['Garras de adamantium'],
                imagenes: ['/wolverine.png'],
            },
            {
                nombre: 'The Flash',
                nombreReal: 'Barry Allen',
                añoDeAparicion: 1956,
                casa: 'DC',
                biografia:
                    'Tras un accidente con productos químicos, Barry Allen obtuvo la capacidad de moverse a súper velocidad. Como The Flash, utiliza su velocidad para proteger Central City y viajar a través del tiempo, enfrentando las consecuencias de sus acciones.',
                equipamiento: [],
                imagenes: ['/theflash.png'],
            },
            {
                nombre: 'Black Widow',
                nombreReal: 'Natasha Romanoff',
                añoDeAparicion: 1964,
                casa: 'Marvel',
                biografia:
                    'Entrenada desde niña para ser una asesina letal en la Habitación Roja, Natasha Romanoff desertó al bando de S.H.I.E.L.D. y se convirtió en Black Widow, una espía experta en artes marciales, espionaje y combate táctico.',
                equipamiento: ['Pistolas', 'Dispositivos de electrochoque'],
                imagenes: ['/blackwidow.png'],
            },
            {
                nombre: 'Cyborg',
                nombreReal: 'Victor Stone',
                añoDeAparicion: 1980,
                casa: 'DC',
                biografia:
                    'Tras un accidente que lo dejó al borde de la muerte, Victor Stone fue salvado por su padre, quien lo fusionó con tecnología cibernética. Ahora, como Cyborg, lucha con sus nuevos poderes y busca su lugar en un mundo que ya no lo ve como humano.',
                equipamiento: ['Cañón sónico', 'Interfaz tecnológica'],
                imagenes: ['/cyborg.png'],
            },
            {
                nombre: 'Hawkeye',
                nombreReal: 'Clint Barton',
                añoDeAparicion: 1964,
                casa: 'Marvel',
                biografia:
                    'Arquero maestro con una puntería casi perfecta, Clint Barton utiliza sus habilidades para luchar por la justicia como Hawkeye. A pesar de ser un humano ordinario en un mundo de superhumanos, su dedicación y determinación lo convierten en un activo invaluable.',
                equipamiento: ['Arco y flechas especiales'],
                imagenes: ['/hawkeye.png'],
            },
            {
                nombre: 'Green Arrow',
                nombreReal: 'Oliver Queen',
                añoDeAparicion: 1941,
                casa: 'DC',
                biografia:
                    'Millonario convertido en vigilante después de quedar varado en una isla desierta, Oliver Queen utiliza sus habilidades de tiro con arco y combate para luchar contra el crimen como Green Arrow. Defensor de los oprimidos, lucha por la justicia social en las calles de Star City.',
                equipamiento: ['Arco y flechas especiales'],
                imagenes: ['/greenarrow.png'],
            },
            {
                nombre: 'Doctor Strange',
                nombreReal: 'Stephen Strange',
                añoDeAparicion: 1963,
                casa: 'Marvel',
                biografia:
                    'Un brillante pero arrogante cirujano, Stephen Strange, buscaba una cura para sus manos heridas en el Tíbet. En cambio, encontró la magia y se convirtió en el Hechicero Supremo, defensor de la Tierra contra amenazas místicas.',
                equipamiento: ['Capa de levitación', 'Ojo de Agamotto'],
                imagenes: ['/doctorstrange.png'],
            },
            {
                nombre: 'Zatanna',
                nombreReal: 'Zatanna Zatara',
                añoDeAparicion: 1964,
                casa: 'DC',
                biografia:
                    'Hija del mago Giovanni Zatara, Zatanna hereda la magia de su familia. Con la capacidad de alterar la realidad con solo pronunciar palabras al revés, lucha contra fuerzas sobrenaturales y protege el mundo de la magia oscura.',
                equipamiento: ['Sombrero de copa', 'Varita mágica'],
                imagenes: ['/zatanna.png'],
            },
            {
                nombre: 'Ant-Man',
                nombreReal: 'Scott Lang',
                añoDeAparicion: 1979,
                casa: 'Marvel',
                biografia:
                    'Ladrón reformado, Scott Lang se convirtió en Ant-Man después de robar el traje de Hank Pym. Con la capacidad de encogerse al tamaño de una hormiga y controlar insectos, utiliza sus habilidades para proteger a su familia y luchar junto a los héroes más poderosos del mundo.',
                equipamiento: ['Traje de Ant-Man'],
                imagenes: ['/antman.png'],
            },
            {
                nombre: 'Shazam',
                nombreReal: 'Billy Batson',
                añoDeAparicion: 1940,
                casa: 'DC',
                biografia:
                    "Elegido por el mago Shazam, Billy Batson puede transformarse en un poderoso héroe adulto al pronunciar la palabra mágica: '¡Shazam!'. Con la sabiduría de Salomón, la fuerza de Hércules, la resistencia de Atlas, el poder de Zeus, el coraje de Aquiles y la velocidad de Mercurio, lucha contra el mal y aprende lo que significa ser un héroe.",
                equipamiento: [],
                imagenes: ['/shazam.png'],
            },
            {
                nombre: 'Black Panther',
                nombreReal: "T'Challa",
                añoDeAparicion: 1966,
                casa: 'Marvel',
                biografia:
                    "Rey de Wakanda, una nación africana tecnológicamente avanzada, T'Challa es Black Panther, protector de su gente y un guerrero formidable. Con sus sentidos agudizados, habilidades de combate excepcionales y un traje de vibranium, lucha por la justicia y la prosperidad de su nación.",
                equipamiento: ['Traje de vibranium'],
                imagenes: ['/blackpanther.png'],
            },
            {
                nombre: 'Starfire',
                nombreReal: "Koriand'r",
                añoDeAparicion: 1980,
                casa: 'DC',
                biografia:
                    "Princesa del planeta Tamaran, Koriand'r, conocida como Starfire, es una guerrera tamaraneana con la capacidad de volar, disparar energía solar y una fuerza sobrehumana. Buscando refugio en la Tierra, se unió a los Teen Titans y lucha por proteger su nuevo hogar.",
                equipamiento: [],
                imagenes: ['/starfire.png'],
            },
            {
                nombre: 'Scarlet Witch',
                nombreReal: 'Wanda Maximoff',
                añoDeAparicion: 1964,
                casa: 'Marvel',
                biografia:
                    'Mutante con la capacidad de manipular la probabilidad y la realidad misma, Wanda Maximoff ha luchado tanto del lado del bien como del mal. Como Scarlet Witch, busca la redención por sus acciones pasadas y utiliza sus poderes para proteger a los inocentes.',
                equipamiento: [],
                imagenes: ['/scarletwitch.png'],
            },
            {
                nombre: 'Raven',
                nombreReal: 'Rachel Roth',
                añoDeAparicion: 1980,
                casa: 'DC',
                biografia:
                    'Hija del demonio Trigon, Raven lucha contra su oscura herencia y utiliza sus poderes de telequinesis, teletransportación y empatía para proteger a la humanidad. Como miembro de los Teen Titans, encuentra amistad y aceptación a pesar de sus orígenes.',
                equipamiento: [],
                imagenes: ['/raven.png'],
            },
            {
                nombre: 'Joker',
                añoDeAparicion: 1940,
                casa: 'DC',
                biografia:
                    'El némesis de Batman, Joker es un agente del caos con un retorcido sentido del humor. Un maestro criminal impredecible y sádico, su único objetivo es sembrar el caos y demostrar que cualquiera puede perder la cordura.',
                equipamiento: ['Sustancias químicas tóxicas', 'Flores ácidas', 'Cartas con navajas'],
                imagenes: ['/joker.png'],
            },
            {
                nombre: 'Thanos',
                añoDeAparicion: 1973,
                casa: 'Marvel',
                biografia:
                    'Titán obsesionado con la muerte, Thanos busca el poder absoluto para impresionar a la Muerte misma. Para lograr su objetivo, está dispuesto a sacrificar a cualquiera, incluso a su propia hija.',
                equipamiento: ['Guantelete del Infinito', 'Gemas del Infinito'],
                imagenes: ['/thanos.png'],
            },
            {
                nombre: 'Lex Luthor',
                añoDeAparicion: 1940,
                casa: 'DC',
                biografia:
                    'Genio criminal y enemigo acérrimo de Superman, Lex Luthor desprecia al Hombre de Acero por representar todo lo que él no puede ser. Utiliza su intelecto y recursos para destruir a Superman y demostrar su superioridad.',
                equipamiento: ['Armadura de guerra', 'Kryptonita'],
                imagenes: ['/lexluthor.png'],
            },
            {
                nombre: 'Magneto',
                nombreReal: 'Max Eisenhardt',
                añoDeAparicion: 1963,
                casa: 'Marvel',
                biografia:
                    'Superviviente del Holocausto, Magneto cree que los mutantes son la siguiente etapa de la evolución humana y que deben dominar a los humanos. Con su poder para controlar el magnetismo, lucha por la supremacía mutante, a menudo chocando con los X-Men.',
                equipamiento: ['Casco que bloquea la telepatía'],
                imagenes: ['/magneto.png'],
            },
            {
                nombre: 'Catwoman',
                nombreReal: 'Selina Kyle',
                añoDeAparicion: 1940,
                casa: 'DC',
                biografia:
                    'Ladrona experta con una debilidad por los objetos brillantes y una relación complicada con Batman, Catwoman camina en la línea entre el bien y el mal. Aunque es una criminal, a menudo ayuda a Batman y se rige por su propio código de ética.',
                equipamiento: ['Látigo', 'Garras retráctiles'],
                imagenes: ['/catwoman.png'],
            },
            {
                nombre: 'Loki',
                añoDeAparicion: 1962,
                casa: 'Marvel',
                biografia:
                    'Dios nórdico de las mentiras y hermano adoptivo de Thor, Loki busca constantemente el poder y la venganza. Maestro de la manipulación y la ilusión, disfruta sembrando el caos y enfrentando a sus enemigos entre sí.',
                equipamiento: ['Cetro con la gema de la mente'],
                imagenes: ['/loki.png'],
            },
            {
                nombre: 'Harley Quinn',
                nombreReal: 'Harleen Quinzel',
                añoDeAparicion: 1992,
                casa: 'DC',
                biografia:
                    "Psiquiatra convertida en criminal tras enamorarse del Joker, Harley Quinn es una mezcla de locura y encanto. Impredecible y peligrosa, utiliza su carisma y habilidades acrobáticas para sembrar el caos junto a su amado 'Puddin'.",
                equipamiento: ['Mazos gigantes', 'Explosivos'],
                imagenes: ['/harleyquinn.png'],
            },
            {
                nombre: 'Green Goblin',
                nombreReal: 'Norman Osborn',
                añoDeAparicion: 1964,
                casa: 'Marvel',
                biografia:
                    'Empresario despiadado y padre de Harry Osborn, Norman Osborn se convirtió en el Duende Verde después de un experimento fallido. Con fuerza sobrehumana y un arsenal de armas, se convirtió en el archienemigo de Spider-Man, atormentando su vida durante años.',
                equipamiento: ['Planeador', 'Bombas de calabaza'],
                imagenes: ['/greengoblin.png'],
            },
            {
                nombre: 'Two-Face',
                nombreReal: 'Harvey Dent',
                añoDeAparicion: 1942,
                casa: 'DC',
                biografia:
                    'Fiscal de Gotham City, Harvey Dent se dedicaba a combatir el crimen hasta que un ataque con ácido lo desfiguró física y mentalmente. Obsesionado con la dualidad, toma decisiones basándose en el lanzamiento de una moneda, convirtiéndose en el criminal Two-Face.',
                equipamiento: ['Pistolas'],
                imagenes: ['/twoface.png'],
            },
            {
                nombre: 'Red Skull',
                nombreReal: 'Johann Schmidt',
                añoDeAparicion: 1941,
                casa: 'Marvel',
                biografia:
                    'Agente nazi y enemigo acérrimo del Capitán América, Red Skull es un maestro de la estrategia y la manipulación. Impulsado por su odio hacia Estados Unidos y su búsqueda del poder absoluto, es una amenaza constante para la libertad y la justicia.',
                equipamiento: ['Cubo Cósmico'],
                imagenes: ['/redskull.png'],
            },
            {
                nombre: 'Deadpool',
                nombreReal: 'Wade Wilson',
                añoDeAparicion: 1991,
                casa: 'Marvel',
                biografia:
                    'Mercenario con un factor de curación acelerado y un sentido del humor bastante particular. Conocido por romper la cuarta pared, Deadpool es un antihéroe impredecible que se enfrenta tanto a villanos como a las voces en su cabeza.',
                equipamiento: ['Katanas', 'Pistolas', 'Mucha munición'],
                imagenes: ['/deadpool.png'],
            },
            {
                nombre: 'Doctor Doom',
                nombreReal: 'Victor von Doom',
                añoDeAparicion: 1962,
                casa: 'Marvel',
                biografia:
                    'Gobernante de Latveria y uno de los mayores intelectos del mundo, Doctor Doom es un maestro de la ciencia y la magia. Obsesionado con el poder y la conquista, se considera a sí mismo como un salvador, aunque sus métodos sean cuestionables.',
                equipamiento: ['Armadura tecnológica', 'Conocimientos arcanos'],
                imagenes: ['/doctordoom.png'],
            },
            {
                nombre: 'Penguin',
                nombreReal: 'Oswald Cobblepot',
                añoDeAparicion: 1941,
                casa: 'DC',
                biografia:
                    'Criminal de baja estatura con una apariencia similar a la de un pingüino, Penguin es uno de los enemigos más antiguos de Batman. Utiliza su astucia, inteligencia y paraguas modificados para controlar el inframundo de Gotham City.',
                equipamiento: ['Paraguas con armas'],
                imagenes: ['/penguin.png'],
            },
            {
                nombre: 'Capitana Marvel',
                nombreReal: 'Carol Danvers',
                añoDeAparicion: 1968,
                casa: 'Marvel',
                biografia:
                    'Piloto de la Fuerza Aérea, Carol Danvers obtuvo habilidades sobrehumanas tras un accidente que fusionó su ADN con el de un Kree. Como Captain Marvel, posee fuerza, velocidad, vuelo y la capacidad de proyectar energía, convirtiéndose en una de las heroínas más poderosas del universo.',
                equipamiento: [],
                imagenes: ['/capitanamarvel.png'],
            },
            {
                nombre: 'Darkseid',
                añoDeAparicion: 1970,
                casa: 'DC',
                biografia:
                    'Gobernante tiránico del planeta Apokolips, Darkseid es una de las mayores amenazas para el universo DC. Obsesionado con encontrar la Ecuación Anti-Vida, que le otorgaría control absoluto sobre el libre albedrío, es un enemigo formidable con una sed insaciable de conquista.',
                equipamiento: ['Rayos Omega'],
                imagenes: ['/darkseid.png'],
            },
            {
                nombre: 'Beast Boy',
                nombreReal: 'Garfield Logan',
                añoDeAparicion: 1965,
                casa: 'DC',
                biografia:
                    'Tras contraer una extraña enfermedad en África, Garfield Logan desarrolló la capacidad de transformarse en cualquier animal. Como Beast Boy, utiliza sus poderes para luchar por el bien junto a los Teen Titans, aportando humor y un toque salvaje al equipo.',
                equipamiento: [],
                imagenes: ['/beastboy.png'],
            },
        ])
    }
}

app.get('/superheroes', async (req, res) => {
    let findQuery = {}
    if (req.query.search) {
        findQuery = { ...findQuery, nombre: new RegExp('^' + req.query.search, 'i') }
    }
    if (req.query.casa) {
        findQuery = { ...findQuery, casa: req.query.casa }
    }
    const client = await connect_db()
    const database = client.db('db_spa')
    const collection = database.collection('superheroes')
    const results = await collection.find(findQuery).toArray()
    res.send(results)
})

app.get('/superheroe', async (req, res) => {
    if (!req.query.id) {
        res.sendStatus(400)
        return
    }
    try {
        const client = await connect_db()
        const database = client.db('db_spa')
        const collection = database.collection('superheroes')
        const results = await collection.find({ _id: new ObjectId(req.query.id) }).toArray()
        res.send(results)
    } catch (err) {
        res.status(500).send({
            message: 'ERROR',
            error: err,
        })
    }
})

app.post('/cargarSuperheroe', async (req, res) => {
    const data = req.body
    try {
        const client = await connect_db()
        const database = client.db('db_spa')
        const collection = database.collection('superheroes')
        const result = await collection.insertOne(data)
        res.send(result)
    } catch (err) {
        res.status(500).send({
            message: 'ERROR',
            error: err,
        })
    }
})

app.post('/modificarSuperheroe', async (req, res) => {
    const data = req.body
    try {
        const client = await connect_db()
        const database = client.db('db_spa')
        const collection = database.collection('superheroes')
        const result = await collection.updateOne(
            { _id: new ObjectId(data.id) },
            {
                $set: {
                    nombre: data.nombre,
                    nombreReal: data.nombreReal,
                    añoDeAparicion: data.añoDeAparicion,
                    casa: data.casa,
                    equipamiento: data.equipamiento,
                    biografia: data.biografia,
                    imagenes: data.imagenes,
                },
            }
        )
        res.send(result)
    } catch (err) {
        res.status(500).send({
            message: 'ERROR',
            error: err,
        })
    }
})

app.post('/eliminarSuperheroe', async (req, res) => {
    const data = req.body
    try {
        const client = await connect_db()
        const database = client.db('db_spa')
        const collection = database.collection('superheroes')
        const result = await collection.deleteOne({ _id: new ObjectId(data.id) })
        res.send(result)
    } catch (err) {
        res.status(500).send({
            message: 'ERROR',
            error: err,
        })
    }
})

// app.get('/lugaresCerca', async (req, res) => {
//     if (!req.query.latitud || !req.query.longitud) {
//         res.sendStatus(400)
//         return
//     }
//     try {
//         const client = await connect_db()

//         const lugares = await Promise.all([
//             client.geoRadius(
//                 'Cervecerías artesanales',
//                 { latitude: req.query.latitud, longitude: req.query.longitud },
//                 5,
//                 'km'
//             ),
//             client.geoRadius('Universidades', { latitude: req.query.latitud, longitude: req.query.longitud }, 5, 'km'),
//             client.geoRadius('Farmacias', { latitude: req.query.latitud, longitude: req.query.longitud }, 5, 'km'),
//             client.geoRadius(
//                 'Centro de atención de emergencias',
//                 { latitude: req.query.latitud, longitude: req.query.longitud },
//                 5,
//                 'km'
//             ),
//         ])

//         res.send([
//             ...lugares[0].map((l) => ({ name: l, type: 'Cervecerías artesanales' })),
//             ...lugares[1].map((l) => ({ name: l, type: 'Universidades' })),
//             ...lugares[2].map((l) => ({ name: l, type: 'Farmacias' })),
//             ...lugares[3].map((l) => ({ name: l, type: 'Centro de atención de emergencias' })),
//         ])
//     } catch (err) {
//         res.status(500).send({
//             message: 'ERROR',
//             error: err,
//         })
//     }
// })

// app.get('/distancia', async (req, res) => {
//     if (!req.query.nombre || !req.query.tipo || !req.query.latitud || !req.query.longitud) {
//         res.sendStatus(400)
//         return
//     }
//     try {
//         const client = await connect_db()

//         // agregamos temporalmente la ubicacion del usuario para poder calcular la distancia
//         await client.geoAdd(req.query.tipo, {
//             member: 'usuario',
//             longitude: req.query.longitud,
//             latitude: req.query.latitud,
//         })

//         const distancia = await client.geoDist(req.query.tipo, 'usuario', req.query.nombre, 'm')

//         await client.zRem(req.query.tipo, 'usuario')

//         res.send({ distancia: distancia })
//     } catch (err) {
//         res.status(500).send({
//             message: 'ERROR',
//             error: err,
//         })
//     }
// })

// app.get('/cargarLugar', async (req, res) => {
//     if (!req.query.nombre || !req.query.longitud || !req.query.latitud || !req.query.grupo) {
//         res.sendStatus(400)
//         return
//     }
//     try {
//         const client = await connect_db()

//         await client.geoAdd(req.query.grupo, {
//             member: req.query.nombre,
//             longitude: req.query.longitud,
//             latitude: req.query.latitud,
//         })

//         res.sendStatus(200)
//     } catch (err) {
//         res.status(500).send({
//             message: 'ERROR',
//             error: err,
//         })
//     }
// })

app.listen(8080, async () => {
    console.log('Servidor corriendo en el puerto 8080')
    await cargar_datos()
})
