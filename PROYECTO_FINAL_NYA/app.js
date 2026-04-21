// app.js
// Variables de estado

let localidadActual = null;
let restaurantesFavoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
let currentFilter = 'todos';
// Datos de restaurantes
const restaurantes = [
    {
        id: 1,
        nombre: "Amor Perfecto",
        localidad: "Barrios Unidos",
        tipo: "Cafetería",
        descripcion_es: "en Amor Perfecto, tenemos la filosofía de ofrecer el mejor café del país para los colombianos. Además, somos distribuidores oficiales en Colombia de equipos e importantes marcas para la preparación de café.",
        descripcion_en: "At Amor Perfecto, our philosophy is to offer Colombians the best coffee in the country. We are also the official distributors in Colombia of equipment and major brands for coffee preparation.",
        servicios: ["Café", "Comida", "Familiar"],
        ubicacion: "Carrera 4 # 66 - 46",
        foto_url: "amorperfecto2.jpg", 
        puntuacion: 4.5
    },
    {
        id: 2,
        nombre: "Tierra Restaurante",
        localidad: "Chapinero",
        tipo: "Restaurante",
        descripcion_es: "La tierra es parte fundamental de ser, estar y evolucionar por eso queremos conectarte con ella a través de nuestra comida. Apoyamos a campesinos, productores y emprendedores comprometidos con el medio ambiente, asegurando así una despensa fresca, de calidad, responsable y sostenible con nuestro entorno.",
        descripcion_en: "The earth is a fundamental part of being, existing, and evolving, which is why we want to connect you with it through our food. We support farmers, producers, and entrepreneurs who are committed to the environment, thus ensuring a fresh, high-quality, responsible, and sustainable pantry for our environment.",
        servicios: ["Comida", "Brunch", "Bebidas", "Opciones vegetarianas", "Abierto hasta tarde"],
        ubicacion: "Calle 66 No. 4A - 31 Chapinero",
        foto_url: "Tierra Restaurante1.jpg",
        puntuacion: 4.9
    },
    {
        id: 3,
        nombre: "La Paloma Mirador",
        localidad: "Chapinero",
        tipo: "Restaurante",
        descripcion_es: "Restaurante, mirador, musica en vivo, bar turistico, abierto todos los días hasta las 3 am.",
        descripcion_en: "Restaurant, viewpoint, live music, tourist bar, open every day until 3 a.m.",
        servicios: ["Cena", "Familiar", "Petfriendly", "Estacionamiento privado gratis"],
        ubicacion: "Kilometro 1 Via A La Calera",
        foto_url: "La Paloma Mirador5.jpg",
        puntuacion: 4.1
    },
    {
        id: 4,
        nombre: "Restaurante Green Piece",
        localidad: "Chapinero",
        tipo: "Gastrobar",
        descripcion_es: "Una experiencia gastronómica para todos los gustos, en el corazón del norte de Bogotá Descubre un rincón donde los sabores del mundo se encuentran: cocina internacional, opciones vegetarianas creativas y platos clásicos con un giro moderno.",
        descripcion_en: "A dining experience for all tastes, in the heart of northern Bogotá Discover a place where the flavors of the world come together: international cuisine, creative vegetarian options, and classic dishes with a modern twist.",
        servicios: ["Comida", "Bar ", "Bufé", "Acceso para silla de ruedas"],
        ubicacion: "Cra 7 bis # 124 - 36 Santa Barbara Hotel Ghl Biohotel Organic Suites",
        foto_url: "green-piece-d_Lapisqd.webp",
        puntuacion: 4.8
    },
    {
        id: 5,
        nombre: "Cantina La 15 Bogotá",
        localidad: "Chapinero",
        tipo: "Gastrobar",
        descripcion_es: "Cantina La 15 es el mejor restaurante mexicano de Colombia. Te transporta a México con su gastronomía y música en vivo. Fuego, dj, personajes, mariachis, platos terminados en la mesa y mucho más vas a encontrar todos los días en nuestras sedes.",
        descripcion_en: "Cantina La 15 is the best Mexican restaurant in Colombia. It transports you to Mexico with its cuisine and live music. Fire, DJs, characters, mariachis, dishes finished at the table, and much more can be found every day at our locations.",
        servicios: ["Comida", "Bebidas alcohólicas", "Reservas", "Música en vivo"],
        ubicacion: "Carrera 13 83 57",
        foto_url: "Cantina La 15 Bogotá5.webp",
        puntuacion: 4.5
    },
    {
        id: 6,
        nombre: "Tremé",
        localidad: "Chapinero",
        tipo: "Gastrobar",
        descripcion_es: "Tremé es un restaurante-bar inspirado en la cocina cajún y creole de Nueva Orleans. Como socios nos enamoramos de la idea de hacer un lugar con el estilo de Nueva Orleans pero queríamos hacerlo manteniendo su tradición.",
        descripcion_en: "Tremé is a restaurant-bar inspired by the Cajun and Creole cuisine of New Orleans. As partners, we fell in love with the idea of creating a New Orleans-style venue, but we wanted to do so while maintaining its tradition.",
        servicios: ["Comida", "Bebidas alcohólicas", "Reservas", "Petfriendly", "Música en vivo", "Bar de jazz"],
        ubicacion: "Carrera 10A #70-50",
        foto_url: "Tremé5.jpg",
        puntuacion: 4.5
    },
    {
        id: 7,
        nombre: "Storia D'Amore",
        localidad: "Chapinero",
        tipo: "Gastrobar",
        descripcion_es: "Tremé es un restaurante-bar inspirado en la cocina cajún y creole de Nueva Orleans. Como socios nos enamoramos de la idea de hacer un lugar con el estilo de Nueva Orleans pero queríamos hacerlo manteniendo su tradición.",
        descripcion_en: "Tremé is a restaurant-bar inspired by the Cajun and Creole cuisine of New Orleans. As partners, we fell in love with the idea of creating a New Orleans-style venue, but we wanted to do so while maintaining its tradition.",
        servicios: ["Comida", "Bebidas alcohólicas", "Wi-Fi gratis", "Petfriendly", "Música en vivo"],
        ubicacion: "Carrera 13 82 36",
        foto_url: "Storia D_Amore1.webp",
        puntuacion: 4.5
    },
    {
        id: 8,
        nombre: "El cielo Restaurant",
        localidad: "Chapinero",
        tipo: "Restaurante",
        descripcion_es: "El restaurante Elcielo se caracteriza por brindarle a sus clientes una experiencia culinaria única, en la que desde el primer plato se involucran todos los sentidos. Se mezclan técnicas que van desde la cocina de vanguardia hasta métodos tradicionales de la cocina colombiana.",
        descripcion_en: "Elcielo restaurant is known for offering its customers a unique culinary experience that engages all the senses from the very first course. It combines techniques ranging from avant-garde cuisine to traditional Colombian cooking methods.",
        servicios: ["Comida", "Reservas", "Restaurante privado"],
        ubicacion: "Calle 70 4 - 47",
        foto_url: "El cielo Restaurant1.webp",
        puntuacion: 4.5
    },  
    {
        id: 9,
        nombre: "Andes Parrilla",
        localidad: "Barrios Unidos",
        tipo: "Restaurante",
        descripcion_es: "es un acogedor restaurante donde la parrilla argentina y la buena atención se combinan para ofrecer una experiencia única. Abierto de lunes a viernes de 12:00 p.m. a 4:00 p.m., y los sábados y domingos hasta las 4:30 p.m., Andes Parrilla es el lugar ideal para disfrutar de un almuerzo delicioso. Además, ofrecen servicio a domicilio llamando al 314 803 9301 o al 2252842. Para eventos especiales, cuentan con salones privados, lo que convierte a este restaurante en una opción perfecta para celebraciones y reuniones.",
        descripcion_en: "is a cozy restaurant where Argentinean barbecue and excellent service combine to offer a unique experience. Open Monday through Friday from 12:00 p.m. to 4:00 p.m., and Saturdays and Sundays until 4:30 p.m., Andes Parrilla is the ideal place to enjoy a delicious lunch. They also offer delivery service by calling 314 803 9301 or 2252842. For special events, they have private rooms, making this restaurant a perfect choice for celebrations and gatherings.",
        servicios: ["Comida", "Bebidas alcohólicas", "Wi-Fi gratis"],
        ubicacion: "Calle 66 Nro. 58-07. Piso 1, local 202 ",
        foto_url: "Andes Parrilla5.webp",
        puntuacion: 4.5
    },
    {
        id: 10,
        nombre: "UAI",
        localidad: "Barrios Unidos",
        tipo: "Restaurante",
        descripcion_es: "UAI es un pedacito de Brasil en Colombia, atendido por su propietario Claudio Robertis. En menos de dos años, ha logrado cautivar a los comensales con sus auténticos pasteles brasileños, tanto salados como dulces, que combinan sabores únicos y una textura inigualable. Además, no te puedes perder otros exquisitos postres como el sonho, brigadeiro y pudín, que son una verdadera delicia. ¡Una experiencia gastronómica que definitivamente vale la pena!",
        descripcion_en: "UAI is a little piece of Brazil in Colombia, run by its owner Claudio Robertis. In less than two years, it has captivated diners with its authentic Brazilian pastries, both savory and sweet, which combine unique flavors and unmatched texture. In addition, don't miss other exquisite desserts such as sonho, brigadeiro, and pudding, which are truly delicious. A dining experience that is definitely worth it!",
        servicios: ["Gastronomía brasileña", "Bebidas alcohólicas", "Atención personalizada"],
        ubicacion: "Cll 75 #27-37",
        foto_url: "UAI1.webp",
        puntuacion: 4.5
    },
    {
        id: 11,
        nombre: "Go Potatos",
        localidad: "Barrios Unidos",
        tipo: "Restaurante",
        descripcion_es: "Go Potatos es el lugar perfecto para quienes disfrutan comer sabroso y en grande. Son conocidos por su famosa salchipapota, una explosión de sabores con chunchullo, chicharrón, chorizo, papas fritas, platanito maduro, queso y mucho más. También ofrecen opciones como la canoa de plátano con carne desmechada y chunchullo, simplemente ¡deliciosa!",
        descripcion_en: "Go Potatos is the perfect place for those who enjoy eating tasty food in large portions. They are known for their famous salchipapota, an explosion of flavors with chunchullo, chicharrón, chorizo, French fries, ripe plantain, cheese, and much more. They also offer options such as plantain canoe with shredded beef and chunchullo, which is simply delicious!",
        servicios: ["Comida rápida", "Familiar"],
        ubicacion: "Cra 26 # 71b-30",
        foto_url: "Go Potatos1.webp",
        puntuacion: 4.5
    },
    {
        id: 12,
        nombre: "La Vieja Antioquia",
        localidad: "Barrios Unidos",
        tipo: "Restaurante",
        descripcion_es: "restaurante de comida típica colombiana, ubicado en la Carrera 11 #65-46, que sirve platos como la bandeja paisa y el sancocho. Es un lugar tradicional con un ambiente acogedor y decoración auténtica, conocido desde 1994 por sus generosas porciones.",
        descripcion_en: "A restaurant serving traditional Colombian cuisine, offering dishes such as bandeja paisa and sancocho. It is a traditional establishment with a welcoming atmosphere and authentic décor, known since 1994 for its generous portions. ",
        servicios: ["Comida tipica", "Familiar", "Servicio a domicilio"],
        ubicacion: "Carrera 11 #65-46",
        foto_url: "La Vieja Antioquia4.jpg",
        puntuacion: 4.5
    },
    {
        id: 13,
        nombre: "Nueve",
        localidad: "Barrios Unidos",
        tipo: "Restaurante",
        descripcion_es: "Cocina contemporánea enfocada en apreciar y realzar los ingredientes locales. Creo platos sin pretensiones, que se pueden compartir en tapas y platos pequeños. Mi menú cambia frecuentemente con una exploración constante de texturas, sabores y aromas.",
        descripcion_en: "Contemporary cuisine focused on appreciating and enhancing local ingredients. I create unpretentious dishes that can be shared as tapas and small plates. My menu changes frequently with a constant exploration of textures, flavors, and aromas.",
        servicios: ["Comida", "Familiar", "Atención para eventos"],
        ubicacion: "Calle 70A No. 10A-18",
        foto_url: "Nueve5.webp",
        puntuacion: 4.5
    },
    {
        id: 14,
        nombre: "Castro Cocina",
        localidad: "Barrios Unidos",
        tipo: "Restaurante",
        descripcion_es: "Las cenas clandestinas son una tendencia mundial que se está abriendo paso en Bogotá. Uno de los primeros en adaptar este modelo fue Jorge Iván Castro, un periodista que se cansó de las noticias y decidió darle rienda suelta a su pasión por la cocina.",
        descripcion_en: "Clandestine dinners are a global trend that is gaining ground in Bogotá. One of the first to adapt this model was Jorge Iván Castro, a journalist who grew tired of the news and decided to give free rein to his passion for cooking.",
        servicios: ["Comida", "Familiar", "Reserva", "Wi-Fi gratis"],
        ubicacion: "Cra. 5 # 72A-39",
        foto_url: "Castro Cocina6.jpg",
        puntuacion: 4.5
    },  
    {
        id: 15,
        nombre: "La Gran Parrilla Santandereana Santa Helenita",
        localidad: "Engativá",
        tipo: "Restaurante",
        descripcion_es: "Restaurante de comida típica santandereana, desayunos, platos fuertes, combos, comida llanera",
        descripcion_en: "Restaurant serving typical Santander cuisine, breakfasts, main courses, combos, Llanera cuisine",
        servicios: ["Comida", "Familiar", "Domicilios", "Parqueadero"],
        ubicacion: "Carrera 80 # 71B-20",
        foto_url: "La Gran Parrilla Santandereana Santa Hlenita5.jpg",
        puntuacion: 3.9
    },
    {
        id: 16,
        nombre: "Fast food el vegano",
        localidad: "Engativá",
        tipo: "Restaurante",
        descripcion_es: "Este es un restaurante con enfoque vegetariano / vegano, ubicado en Engativá. El nombre lo deja claro: “Fast Food El Vegano.",
        descripcion_en: "This is a vegetarian/vegan restaurant located in Engativá. The name says it all: “Fast Food El Vegano.",
        servicios: ["Comida", "Familiar", "Domicilios", "Vegano", "Petfriendly"],
        ubicacion: "Transversal 90b # 84‑2",
        foto_url: "Fast food el vegano5.jpg",
        puntuacion: 4.0
    },
    {
        id: 17,
        nombre: "La Banqueta Parrilla",
        localidad: "Engativá",
        tipo: "Restaurante",
        descripcion_es: "La Banqueta Parrilla es un restaurante especializado en parrilladas y carnes a la brasa que sirve platos contundentes, ofrece combinaciones de carnes y acompañamientos.",
        descripcion_en: "La Banqueta Parrilla is a restaurant specializing in barbecued meats and grilled dishes, serving hearty meals and offering combinations of meats and side dishes.",
        servicios: ["Comida", "Familiar", "Domicilios"],
        ubicacion: "Calle 68 # 88‑76",
        foto_url: "La Banqueta Parrilla2.webp",
        puntuacion: 4.5
    },
    {
        id: 18,
        nombre: "Parrilla Express",
        localidad: "Engativá",
        tipo: "Restaurante",
        descripcion_es: "Este restaurante funciona como una opción rápida de parrilla, ideal para quienes no quieren esperar mucho.",
        descripcion_en: "This restaurant operates as a quick grill option, ideal for those who don't want to wait long.",
        servicios: ["Parrilla", "Familiar", "Servicio personalizado", "Domicilios"],
        ubicacion: "Calle 78a # 99b‑63",
        foto_url: "Parrilla Express.jpeg",
        puntuacion: 4.5
    },
    {
        id: 19,
        nombre: "Apromar (Delicias del mar)",
        localidad: "Engativá",
        tipo: "Restaurante",
        descripcion_es: "Ofrece platos como cazuela de mariscos, pasta con mariscos y otros productos del mar.",
        descripcion_en: "It offers dishes such as seafood casserole, pasta with seafood, and other seafood products. ",
        servicios: ["Comida de mar", "Familiar", "Wi-fi gratis"],
        ubicacion: "Calle 78a # 99b‑63",
        foto_url: "Apromar (Delicias del mar).jpg",
        puntuacion: 4.5
    },
    {
        id: 20,
        nombre: "Señor Burrito",
        localidad: "Engativá",
        tipo: "Restaurante",
        descripcion_es: "Especializado en comida mexicana como burritos, tacos y quesadillas, con un ambiente cálido y colorido. Ideal para amantes de los sabores auténticos.",
        descripcion_en: "Specializing in Mexican food such as burritos, tacos, and quesadillas, with a warm and colorful atmosphere. Ideal for lovers of authentic flavors.",
        servicios: ["Comida mexicana", "Familiar", "Reservas"],
        ubicacion: "Cra. 98b # 71b-39",
        foto_url: "Señor Burrito.webp",
        puntuacion: 4.5
    },
    {
        id: 21,
        nombre: "Patatús",
        localidad: "Engativá",
        tipo: "Restaurante",
        descripcion_es: "Ofrece platos con sabor local como plátanos maduros engallados y papas chorreadas. Una opción para comida de estilo casero y reconfortante.",
        descripcion_en: "It offers dishes with local flavors such as ripe plantains “engallados” and papas chorreadas. An option for home-style, comforting food.",
        servicios: ["Comida", "Familiar", "Domicilios"],
        ubicacion: "Av Cll 53# 73-50",
        foto_url: "Patatus.jpg",
        puntuacion: 4.0
    }, 
    {
        id: 22,
        nombre: "Patarrasca",
        localidad: "Engativá",
        tipo: "Restaurante",
        descripcion_es: "es un establecimiento que se especializa en Parrilla y Carbón, ofreciendo un menú centrado en la carne y preparaciones a la brasa.",
        descripcion_en: "is an establishment specializing in grilled and charcoal-grilled dishes, offering a menu focused on meat and charcoal-grilled preparations.",
        servicios: ["Comida", "Familiar", "Domicilios"],
        ubicacion: "Carrera 106 C. Nro. 71B-49",
        foto_url: "la-patarashca-_05-990x556.jpg",
        puntuacion: 4.8
    },
    {
        id: 23,
        nombre: "Don Martín Parrilla",
        localidad: "Suba",
        tipo: "Restaurante",
        descripcion_es: "Destacado por su parrilla y específicamente mencionado por ofrecer un auténtico choripán argentino.",
        descripcion_en: "Notable for its grill and specifically mentioned for offering an authentic Argentine choripán.",
        servicios: ["Comida", "Familiar", "Domicilios"],
        ubicacion: "Cra 56 # 167-30",
        foto_url: "Don Martín Parrilla.webp",
        puntuacion: 4.0
    },
    {
        id: 24,
        nombre: "Sapo Perro",
        localidad: "Suba",
        tipo: "Restaurante",
        descripcion_es: "Conocido por sus opciones de comida rápida creativa, como un Sapoperro hawaiano y hamburguesas especiales.",
        descripcion_en: "Known for its creative fast food options, such as a “Hawaiian Sapoperro” and specialty burgers.",
        servicios: ["Comida", "Familiar", "Domicilios"],
        ubicacion: "Cra 103f bis # 150c-40",
        foto_url: "Sapo Perro.webp",
        puntuacion: 4.5
    },
    {
        id: 25,
        nombre: "Da Quei Matti",
        localidad: "Suba",
        tipo: "Restaurante",
        descripcion_es: "Restaurante de comida italiana con un buen nivel de satisfacción en comida, ideal para pasta y pizza.",
        descripcion_en: "Italian restaurant with a high level of satisfaction in terms of food, ideal for pasta and pizza.",
        servicios: ["Comida italiana", "Familiar", "Domicilios"],
        ubicacion: "Calle 150 Nro. 48-71",
        foto_url: "Da Quei Matti.avif",
        puntuacion: 4.0
    },
    {
        id: 26,
        nombre: "Home Burgers",
        localidad: "Suba",
        tipo: "Restaurante",
        descripcion_es: "Especializado en hamburguesas de estilo americano. Una buena opción para comida casual y jugosa.",
        descripcion_en: "Specializing in American-style burgers. A great option for casual, juicy dining.",
        servicios: ["Comida rápida", "Familiar", "Domicilios"],
        ubicacion: "Carrera 58D Nro. 146-51",
        foto_url: "Home Burgers.jpg",
        puntuacion: 4.1
    },
    {
        id: 27,
        nombre: "Bendito Cafe",
        localidad: "Suba",
        tipo: "Cafeteria",
        descripcion_es: "Ideal para postres, tortas artesanales (como Red Velvet y Chocolate), y una variedad de bebidas de café y granizados.",
        descripcion_en: "Ideal for desserts, artisanal cakes (such as Red Velvet and Chocolate), and a variety of coffee drinks and slushies.",
        servicios: ["Cafetería", "Familiar"],
        ubicacion: "Cl. 151a # 103 B 53",
        foto_url: "Bendito Cafe.jpg",
        puntuacion: 4.0
    },  
    {
        id: 28,
        nombre: "Xocolat And More",
        localidad: "Suba",
        tipo: "Cafeteria",
        descripcion_es: "Un lugar para disfrutar de productos de chocolate, postres y, probablemente, bebidas calientes o frías de alta calidad.",
        descripcion_en: "A place to enjoy chocolate products, desserts, and probably high-quality hot or cold drinks.",
        servicios: ["Comida", "Familiar", "Domicilios"],
        ubicacion: "Carrera 46 # 152- 29",
        foto_url: "Xocolat And More.png",
        puntuacion: 5.0
    },  
    {
        id: 29,
        nombre: "Fruterias Tropical",
        localidad: "Suba",
        tipo: "Cafeteria",
        descripcion_es: "Perfecto para opciones refrescantes y saludables como helados, frutas y jugos naturales.",
        descripcion_en: "Perfect for refreshing and healthy options such as ice cream, fruit, and natural juices.",
        servicios: ["Comida", "Familiar", "Domicilios"],
        ubicacion: "Carrera 46 # 152- 29",
        foto_url: "Fruterias Tropical.jpg",
        puntuacion: 5.0
    },  
    {
        id: 30,
        nombre: "Sujo",
        localidad: "Suba",
        tipo: "Restaurante",
        descripcion_es: "Ofrece una experiencia gastronómica oriental. Al estar en un centro comercial, es una opción accesible y concurrida.",
        descripcion_en: "It offers an oriental dining experience. Being located in a shopping mall, it is an accessible and popular option.",
        servicios: ["Comida", "Familiar", "Domicilios"],
        ubicacion: "Calle 153 No. 55-80 Loc. 8",
        foto_url: "Sujo.webp",
        puntuacion: 4.5
    }, 
    {
        id: 31,
        nombre: "Restaurante mini-mal",
        localidad: "Chapinero",
        tipo: "Restaurante",
        descripcion_es: "Conocido por su cocina de autor colombiana, que explora ingredientes y sabores tradicionales del país de forma creativa y sorprendente. Es un referente de la gastronomía contemporánea.",
        descripcion_en: "Known for his signature Colombian cuisine, which explores traditional ingredients and flavors from the country in creative and surprising ways. He is a leading figure in contemporary gastronomy.",
        servicios: ["Comida", "Familiar", "Domicilios"],
        ubicacion: "Tv. 4 Bis #57-52",
        foto_url: "Restaurante mini-mal.webp",
        puntuacion: 5.0
    },
    {
        id: 32,
        nombre: "Variale",
        localidad: "Chapinero",
        tipo: "Cafeteria",
        descripcion_es: "Cafetería de especialidad con un enfoque en café de alta calidad. Se destaca por su ambiente único, a menudo en una casa adaptada, y es ideal para trabajar o disfrutar de un buen café filtrado.",
        descripcion_en: "Specialty coffee shop with a focus on high-quality coffee. It stands out for its unique atmosphere, often in a converted house, and is ideal for working or enjoying a good cup of filter coffee.",
        servicios: ["Comida", "Familiar", "Domicilios"],
        ubicacion: "Cra. 4a #57-02",
        foto_url: "Variale.jpg",
        puntuacion: 4.3
    },
    {
        id: 33,
        nombre: "ER Dulce Tertulia",
        localidad: "Engativá",
        tipo: "Cafeteria",
        descripcion_es: "Cafetería de especialidad con un enfoque en café de alta calidad. Se destaca por su ambiente único, a menudo en una casa adaptada, y es ideal para trabajar o disfrutar de un buen café filtrado.",
        descripcion_en: "Specialty coffee shop with a focus on high-quality coffee. It stands out for its unique atmosphere, often in a converted house, and is ideal for working or enjoying a good cup of filter coffee.",
        servicios: ["Cafetería", "Espresso Bar"],
        ubicacion: "Cl. 75 # 70f-38",
        foto_url: "ER Dulce Tertulia.webp",
        puntuacion: 4.3
    },
    {
        id: 34,
        nombre: "Picnic Salón De Onces",
        localidad: "Engativá",
        tipo: "Cafeteria",
        descripcion_es: "Cafetería con espacio de “onces” (merienda) y buena variedad de pastelería + café.",
        descripcion_en: "Coffee shop with afternoon tea service and a good selection of pastries and coffee.",
        servicios: ["Cafetería", "Pasteleria","Co-working"],
        ubicacion: "Cra. 73a # 72a-2",
        foto_url: "Picnic Salón De Onces.webp",
        puntuacion: 4.6
    },
    {
        id: 35,
        nombre: "Café Express Jota",
        localidad: "Chapinero",
        tipo: "Cafeteria",
        descripcion_es: "Café tipo express (rápido) pero bien valorado, buen lugar para parada rápida de café.",
        descripcion_en: "Express-style coffee (quick) but well-regarded, a good place for a quick coffee break.",
        servicios: ["Cafetería", "Familiar"],
        ubicacion: "Cl. 72 #69-50",
        foto_url: "Café Express Jota.jpg",
        puntuacion: 4.8
    },
    {
        id: 36,
        nombre: "Café y Aroma Salón de Onces",
        localidad: "Engativá",
        tipo: "Cafeteria",
        descripcion_es: "Una pastelería + cafetería, es bastante conocida en la zona, alta visibilidad, buena valoración, ideal para merienda con café y pastelería.",
        descripcion_en: "A bakery + café, well known in the area, high visibility, good reputation, ideal for afternoon tea with coffee and pastries.",
        servicios: ["Cafetería", "Pasteleria", "Familiar"],
        ubicacion: "Transversal 73a, Dg. 81g #03",
        foto_url: "Café y Aroma Salón de Onces y Pastelería.png",
        puntuacion: 4.8
    },
    {
        id: 37,
        nombre: "Localidad Chapinero",
        localidad: "Chapinero",
        tipo: "Cafetería",
        descripcion_es: "Cafetería de especialidad conocida, buen lugar para café bien preparado, ambiente urbano de Chapinero",
        descripcion_en: "Well-known specialty coffee shop, a great place for well-prepared coffee, urban atmosphere in Chapinero.",
        servicios: ["Cafetería", "Ambiente urbano"],
        ubicacion: "Cra. 4 #66-46",
        foto_url: "Localidad Chapinero.jpg",
        puntuacion: 4.5
    },
    {
        id: 38,
        nombre: "Kaldivia Café ",
        localidad: "Chapinero",
        tipo: "Cafetería",
        descripcion_es: "Café con buen ambiente para quedarse, buena elección de cafés y pastelería.",
        descripcion_en: "Coffee shop with a pleasant atmosphere to linger in, good selection of coffees and pastries.",
        servicios: ["Cafetería", "Pastelería"],
        ubicacion: "Cl. 59 #10-67",
        foto_url: "Kaldivia Café.jpg",
        puntuacion: 4.3 
    }, 
    {
        id: 39,
        nombre: "Café de la Tintería",
        localidad: "Chapinero",
        tipo: "Cafeteria",
        descripcion_es: "Espacio artístico y tranquilo con vista a la calle. Perfecto para disfrutar un café con buena música o trabajar.",
        descripcion_en: "A peaceful artistic space overlooking the street. Perfect for enjoying a coffee with good music or working.",
        servicios: ["Cafetería", "Wi-Fi gratis"],
        ubicacion: "Cl. 54a #4 A-21 Segundo Piso",
        foto_url: "Café de la Tintería.jpg",
        puntuacion: 4.7 
    }, 
    {
        id: 40,
        nombre: "Varietale Javeriana",
        localidad: "Chapinero",
        tipo: "Cafeteria",
        descripcion_es: "Cafetería amplia y moderna con una gran variedad de cafés de origen colombiano. Popular entre estudiantes y profesionales",
        descripcion_en: "Spacious, modern café offering a wide variety of Colombian coffees. Popular with students and professionals.",
        servicios: ["Cafetería", "Elegante"],
        ubicacion: "Cl. 41 #8-43",
        foto_url: "Varietale Javeriana.jpg",
        puntuacion: 4.7
    }, 
    {
        id: 41,
        nombre: "Chapoleros Café de Especialidad",
        localidad: "Barrios Unidos",
        tipo: "Cafeteria",
        descripcion_es: "Pequeño rincón cafetero con gran sabor y atención personalizada. Ideal para los amantes del café puro.",
        descripcion_en: "A small coffee shop with great flavor and personalized service. Ideal for lovers of pure coffee.",
        servicios: ["Cafetería", "Familiar", "Atención personalizada"],
        ubicacion: "Cl. 74a # 20C-11",
        foto_url: "Chapoleros.webp",
        puntuacion: 5.0
    }, 
    {
        id: 42,
        nombre: "Typica - Tienda de Café",
        localidad: "Barrios Unidos",
        tipo: "Cafeteria",
        descripcion_es: "Tienda de café con enfoque en granos de origen y preparación experta. Ambiente relajado y acogedor.",
        descripcion_en: "Coffee shop with a focus on specialty beans and expert preparation. Relaxed and welcoming atmosphere.",
        servicios: ["Cafetería", "Familiar"],
        ubicacion: "Cra. 19 #63-22",
        foto_url: "Typica - Tienda de Café.webp",
        puntuacion: 4.8 
    }, 
    {
        id: 43,
        nombre: "Nuestro Café Bogotá",
        localidad: "Barrios Unidos",
        tipo: "Cafeteria",
        descripcion_es: "Café de barrio moderno con estilo minimalista. Excelente atención y ambiente tranquilo.",
        descripcion_en: "Modern neighborhood café with minimalist style. Excellent service and relaxed atmosphere.",
        servicios: ["Cafetería", "Minimalista", "Wi-fi gratis"],
        ubicacion: "Cra. 28 #74-55",
        foto_url: "Nuestro Café Bogotá.webp",
        puntuacion: 4.8 
    }, 
    {
        id: 44,
        nombre: "Boom Café",
        localidad: "Barrios Unidos",
        tipo: "Cafeteria",
        descripcion_es: "Espacio contemporáneo especializado en café artesanal. Ideal para disfrutar bebidas frías o calientes con buena música.",
        descripcion_en: "A contemporary space specializing in artisanal coffee. Ideal for enjoying hot or cold drinks with good music.",
        servicios: ["Cafetería", "Contemporaneo"],
        ubicacion: "Cl. 66 #58-07 Local 203",
        foto_url: "Boom Café.webp",
        puntuacion: 5.0
    },
    {
        id: 45,
        nombre: "Filocafé Al Tallo",
        localidad: "Suba",
        tipo: "Cafeteria",
        descripcion_es: "Cafetería íntima con estilo bohemio y cafés de alta calidad. Perfecto para relajarse y disfrutar un buen espresso.",
        descripcion_en: "Intimate café with bohemian style and high-quality coffee. Perfect for relaxing and enjoying a good espresso.",
        servicios: ["Cafetería", "Ambiente bohemio", "Espresso"],
        ubicacion: "Cra. 105c # 143-03 Piso 2",
        foto_url: "Filocafé Al Tallo.jpg",
        puntuacion: 4.9
    },
    {
        id: 46,
        nombre: "Macambo",
        localidad: "Suba",
        tipo: "Cafeteria",
        descripcion_es: "Café moderno con ambiente juvenil y excelente servicio. Ideal para charlar o trabajar en laptop.",
        descripcion_en: "Modern café with a youthful atmosphere and excellent service. Ideal for chatting or working on your laptop.",
        servicios: ["Cafetería", "co-working"],
        ubicacion: "Cra. 59c # 131 A-69",
        foto_url: "Macambo.webp",
        puntuacion: 4.9
    },
    {
        id: 45,
        nombre: "Gato Negro Café and Pub Suba",
        localidad: "Suba",
        tipo: "Gastrobar",
        descripcion_es: "Fusión entre café y pub con ambiente artístico. Perfecto para tardes tranquilas o noches con música.",
        descripcion_en: "A fusion of café and pub with an artistic atmosphere. Perfect for quiet afternoons or evenings with music.",
        servicios: ["Cafetería", "Bebidas alcohólicas", ],
        ubicacion: "Cra. 91 # 147b-06",
        foto_url: "Gato Negro Café and Pub Suba.webp",
        puntuacion: 5.0
    },
    {
        id: 46,
        nombre: "Scalea Café Pasadena",
        localidad: "Suba",
        tipo: "Cafeteria",
        descripcion_es: "Cafetería espaciosa con menú variado y estilo clásico. Ideal para encuentros o reuniones informales.",
        descripcion_en: "Spacious café with a varied menu and classic style. Ideal for informal gatherings or meetings.",
        servicios: ["Cafetería", "Familiar"],
        ubicacion: "Cra. 53 # 103B-07",
        foto_url: "Scalea Café Pasadena.webp",
        puntuacion: 4.4
    },                              
];

const SERVICIOS_TRADUCCIONES = {
    "Almuerzo": "Lunch",
    "Cena": "Dinner",
    "Familiar": "Family",
    "Mariscos": "Seafood",
    "Domicilios": "Delivery service",
    "Reservas": "Reservation",
    "Experiencia": "Experience",
    "Desayuno": "Breakfast",
    "Café": "Coffe shop",
    "Comida": "Food",
    "Bebidas": "Drinks",
    "Opciones vegetarianas": "Vegetarian options",
    "Abierto hasta tarde": "Open until late",
    "Estacionamiento privado gratis": "Free private parking",
    "Bufé": "Buffet",
    "Acceso para silla de ruedas": "Wheelchair access",
    "Bebidas alcohólicas": "Alcoholic beverages",
    "Música en vivo": "Live music",
    "Bar de jazz": "Jazz bar",
    "Wi-Fi gratis": "Free Wi-Fi",
    "Restaurante privado": "Private restaurant",
    "Gastronomía brasileña": "Brazilian cuisine",
    "Atención personalizada": "Personalized service",
    "Comida rápida": "Fast food",
    "Comida italiana":"Italian food",
    "Comida típica": "Local cuisine",
    "Atención para eventos": "Event catering",
    "Vegano": "Vegan",
    "Cafeterias":"Coffeeshop",
    "Pastelería":"Pastry shop",
    "Cafetería":"Coffeeshop",
    "Contemporaneo":"Contemporary",
    "Ambiente bohemio":"Bohemian atmosphere",
    "Minimalista":"Minimalist",
    "Elegante":"Elegant",
    "Ambiente urbano":"Urban environment",
};

// =================================================
// CLASIFICACIÓN AUTOMÁTICA DE RESTAURANTES
// =================================================
restaurantes.forEach(rest => {
    if (!rest.tipo) {
        const nombre = rest.nombre.toLowerCase();
        const descripcion = rest.descripcion_es.toLowerCase();
        const servicios = rest.servicios.join(' ').toLowerCase();
        
        if (nombre.includes('café') || nombre.includes('cafe') || nombre.includes('coffee') || 
            descripcion.includes('café') || descripcion.includes('cafe') || descripcion.includes('coffee') ||
            servicios.includes('café') || servicios.includes('cafe') || servicios.includes('coffee') ||
            nombre.includes('barra de café') || servicios.includes('espresso')) {
            rest.tipo = 'Cafeteria';
        } else if (nombre.includes('bar') || servicios.includes('bar') || 
                  servicios.includes('pub') || servicios.includes('coctel') ||
                  servicios.includes('música en vivo') || servicios.includes('bar de jazz') ||
                  descripcion.includes('bar') || descripcion.includes('pub') || descripcion.includes('Bebidas alcoholicas')) {
            rest.tipo = 'Gastrobar';
        } else {
            rest.tipo = 'Restaurante';
        }
    }
});

console.log('Restaurantes clasificados:', restaurantes.map(r => ({ nombre: r.nombre, tipo: r.tipo })));

// =================================================
// FUNCIONES DE UTILIDAD
// =================================================
function obtenerIdiomaActual() {
    return document.documentElement.lang;
}

function toggleLanguageRedirect() {
    const currentLang = obtenerIdiomaActual();
    if (currentLang === 'es') {
        window.location.href = 'indexen.html';
    } else if (currentLang === 'en') {
        window.location.href = 'index.html';
    }
}

function obtenerIniciales(nombre) {
    if (!nombre) return 'U';
    return nombre
        .split(' ')
        .map(palabra => palabra.charAt(0).toUpperCase())
        .join('')
        .substring(0, 2);
}

function actualizarInfoUsuario(usuario) {
    const avatarInitials = document.getElementById('avatar-initials');
    const userName = document.getElementById('user-name');
    const userEmail = document.getElementById('user-email');
    
    if (usuario) {
        const nombre = usuario.user_metadata?.name || 'Usuario';
        const email = usuario.email || 'usuario@ejemplo.com';
        
        if (avatarInitials) avatarInitials.textContent = obtenerIniciales(nombre);
        if (userName) userName.textContent = nombre;
        if (userEmail) userEmail.textContent = email;
    }
}

function inicializarMenuUsuario() {
    const userAvatar = document.getElementById('user-avatar');
    const userDropdown = document.getElementById('user-dropdown');
    const logoutBtn = document.getElementById('logout-btn');
    
    if (userAvatar && userDropdown) {
        userAvatar.addEventListener('click', (e) => {
            e.stopPropagation();
            userDropdown.classList.toggle('show');
        });
        
        document.addEventListener('click', () => {
            userDropdown.classList.remove('show');
        });
        
        userDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.handleLogout();
        });
    }
}

// =================================================
// SISTEMA DE FAVORITOS
// =================================================
function toggleFavorito(restauranteId) {
    const id = parseInt(restauranteId);
    const index = restaurantesFavoritos.indexOf(id);

    if (index === -1) {
        restaurantesFavoritos.push(id);
    } else {
        restaurantesFavoritos.splice(index, 1);
    }
    localStorage.setItem('favoritos', JSON.stringify(restaurantesFavoritos));
    
    const favoritesSection = document.getElementById('favorites-section');
    if (favoritesSection && favoritesSection.style.display === 'block') {
        mostrarFavoritos();
    } else if (localidadActual) {
        mostrarRestaurantes(localidadActual);
    }
}

function esFavorito(restauranteId) {
    return restaurantesFavoritos.includes(parseInt(restauranteId));
}

// =================================================
// SISTEMA DE FILTRADO
// =================================================
function initializeFilterSystem() {
    console.log('Inicializando sistema de filtrado...');
    
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const filter = e.target.dataset.filter;
            console.log('Filtro seleccionado:', filter);
            
            currentFilter = filter;
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            
            applyFilters();
        });
    });

    console.log('Sistema de filtrado inicializado');
}

function applyFilters() {
    console.log('Aplicando filtro:', currentFilter);

    const favoritesSection = document.getElementById('favorites-section');
    const isFavoritesVisible = favoritesSection.style.display !== 'none';
    const containerSelector = isFavoritesVisible ? '#favorites-container' : '#restaurants-container';
    
    const restaurantCards = document.querySelectorAll(`${containerSelector} .restaurant-card`);
    let visibleCount = 0;

    restaurantCards.forEach(card => {
        const restaurantType = card.dataset.type || 'Restaurante';
        
        if (currentFilter === 'todos' || restaurantType.toLowerCase() === currentFilter.toLowerCase()) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    console.log('Tarjetas visibles:', visibleCount, 'de', restaurantCards.length);
    showNoResultsMessage(visibleCount === 0, containerSelector);
}

function showNoResultsMessage(show, containerSelector) {
    const targetContainer = document.querySelector(containerSelector);
    if (!targetContainer) return;
    
    let noResultsMsg = targetContainer.querySelector('.no-results-filter');
    
    if (show && !noResultsMsg) {
        noResultsMsg = document.createElement('div');
        noResultsMsg.className = 'no-restaurants no-results-filter';
        
        const idioma = obtenerIdiomaActual();
        const msg = idioma === 'es' 
            ? '🚫 No se encontraron establecimientos con este filtro.' 
            : '🚫 No establishments found with this filter.';
        
        noResultsMsg.innerHTML = `<p>${msg}</p>`;
        targetContainer.appendChild(noResultsMsg);
    } else if (!show && noResultsMsg) {
        noResultsMsg.remove();
    }
}

function resetAndApplyFilters() {
    currentFilter = 'todos';
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === 'todos');
    });
    setTimeout(() => applyFilters(), 50);
}

// =================================================
// RENDERIZADO DE RESTAURANTES
// =================================================
function mostrarRestaurantes(localidad) {
    const restaurantsContainer = document.getElementById('restaurants-container');
    localidadActual = localidad;
    const restaurantesFiltrados = restaurantes.filter(rest => 
        rest.localidad.toLowerCase() === localidad.toLowerCase()
    );
    const idioma = obtenerIdiomaActual();
    
    const noRestMsg = idioma === 'es' ? 'No hay restaurantes disponibles en esta localidad.' : 'No restaurants available in this locality.';
    const locationTitle = idioma === 'es' ? 'Ubicación' : 'Location';
    const servicesTitle = idioma === 'es' ? 'Servicios' : 'Services';
    const scoreTitle = idioma === 'es' ? 'Puntuación' : 'Score';
    const btnText = idioma === 'es' ? '¿Cómo llegar?' : 'How to get there?';
    
    if (restaurantesFiltrados.length === 0) {
        restaurantsContainer.innerHTML = `<div class="no-restaurants"><p>${noRestMsg}</p></div>`;
        return;
    }
    
    restaurantsContainer.innerHTML = restaurantesFiltrados.map(restaurante => `
        <div class="restaurant-card" data-type="${restaurante.tipo}" data-locality="${restaurante.localidad}">
            <div class="restaurant-image">
                <img src="./images/${restaurante.foto_url}" alt="${restaurante.nombre}" onerror="this.style.display='none'; this.parentNode.innerHTML='🍽️ ${restaurante.nombre}';">
            </div>
            <div class="restaurant-info">
                <div class="restaurant-header">
                    <h3 class="restaurant-name">${restaurante.nombre}</h3>
                    <button class="favorite-btn ${esFavorito(restaurante.id) ? 'active' : ''}" 
                            data-id="${restaurante.id}">
                        ${esFavorito(restaurante.id) ? '❤️' : '🤍'}
                    </button>
                </div>
                <p class="restaurant-description">
                    ${idioma === 'es' ? restaurante.descripcion_es : restaurante.descripcion_en}
                </p>
                <div class="restaurant-details">
                    <div class="restaurant-location">
                        <strong>${locationTitle}:</strong>
                        <button class="btn-como-llegar" data-direccion="${restaurante.ubicacion}">
                            ${btnText}
                        </button>
                    </div>
                    <div class="restaurant-services">
                        <strong>${servicesTitle}:</strong>
                        <div>
                            ${restaurante.servicios.map(servicio => {
                                const nombreTraducido = (idioma === 'en' && SERVICIOS_TRADUCCIONES[servicio]) 
                                                        ? SERVICIOS_TRADUCCIONES[servicio] 
                                                        : servicio;
                                return `<span>${nombreTraducido}</span>`;
                            }).join('')}
                        </div>
                    </div>
                    <div class="restaurant-rating">
                        <strong>${scoreTitle}:</strong>
                        <span class="rating-stars">${'★'.repeat(Math.floor(restaurante.puntuacion))}${'☆'.repeat(5-Math.floor(restaurante.puntuacion))}</span>
                        <span>(${restaurante.puntuacion})</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    attachRestaurantEventListeners();
    resetAndApplyFilters();
}

function mostrarFavoritos() {
    const favoritesContainer = document.getElementById('favorites-container');
    const restaurantesFavoritosFiltrados = restaurantes.filter(rest => 
        restaurantesFavoritos.includes(rest.id)
    );
    
    const idioma = obtenerIdiomaActual();
    const noFavoritesMsg = idioma === 'es' ? 'No tienes restaurantes favoritos aún.' : "You don't have favorite restaurants yet";
    const locationTitle = idioma === 'es' ? 'Ubicación' : 'Location';
    const servicesTitle = idioma === 'es' ? 'Servicios' : 'Services';
    const scoreTitle = idioma === 'es' ? 'Puntuación' : 'Score';
    const btnText = idioma === 'es' ? '¿Cómo llegar?' : 'How to get there?';

    if (restaurantesFavoritosFiltrados.length === 0) {
        favoritesContainer.innerHTML = `<div class="no-restaurants"><p>${noFavoritesMsg}</p></div>`;
        return;
    }
    
    favoritesContainer.innerHTML = restaurantesFavoritosFiltrados.map(restaurante => `
        <div class="restaurant-card" data-type="${restaurante.tipo}" data-locality="${restaurante.localidad}">
            <div class="restaurant-image">
                <img src="./images/${restaurante.foto_url}" alt="${restaurante.nombre}" onerror="this.style.display='none'; this.parentNode.innerHTML='🍽️ ${restaurante.nombre}';">
            </div>
            <div class="restaurant-info">
                <div class="restaurant-header">
                    <h3 class="restaurant-name">${restaurante.nombre}</h3>
                    <button class="favorite-btn active" data-id="${restaurante.id}">❤️</button>
                </div>
                <p class="restaurant-description">
                    ${idioma === 'es' ? restaurante.descripcion_es : restaurante.descripcion_en}
                </p>
                <div class="restaurant-details">
                    <div class="restaurant-location">
                        <strong>${locationTitle}:</strong>
                        <button class="btn-como-llegar" data-direccion="${restaurante.ubicacion}">${btnText}</button>
                    </div>
                    <div class="restaurant-services">
                        <strong>${servicesTitle}:</strong>
                        <div>
                            ${restaurante.servicios.map(servicio => {
                                const nombreTraducido = (idioma === 'en' && SERVICIOS_TRADUCCIONES[servicio]) 
                                                        ? SERVICIOS_TRADUCCIONES[servicio] 
                                                        : servicio;
                                return `<span>${nombreTraducido}</span>`;
                            }).join('')}
                        </div>
                    </div>
                    <div class="restaurant-rating">
                        <strong>${scoreTitle}:</strong>
                        <span class="rating-stars">${'★'.repeat(Math.floor(restaurante.puntuacion))}${'☆'.repeat(5-Math.floor(restaurante.puntuacion))}</span>
                        <span>(${restaurante.puntuacion})</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    attachFavoriteEventListeners();
    resetAndApplyFilters();
}

function attachRestaurantEventListeners() {
    document.querySelectorAll('.favorite-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            toggleFavorito(e.currentTarget.getAttribute('data-id'));
        });
    });
    
    document.querySelectorAll('.btn-como-llegar').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const direccion = e.currentTarget.getAttribute('data-direccion');
            const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(direccion)}&travelmode=driving`;
            window.open(url, '_blank', 'noopener,noreferrer');
        });
    });
}

function attachFavoriteEventListeners() {
    document.querySelectorAll('#favorites-container .favorite-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            toggleFavorito(e.currentTarget.getAttribute('data-id'));
        });
    });
    
    document.querySelectorAll('#favorites-container .btn-como-llegar').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const direccion = e.currentTarget.getAttribute('data-direccion');
            const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(direccion)}&travelmode=driving`;
            window.open(url, '_blank', 'noopener,noreferrer');
        });
    });
}

// =================================================
// NAVEGACIÓN Y SECCIONES
// =================================================
function mostrarSeccion(seccion) {
    const favoritesSection = document.getElementById('favorites-section');
    const localitiesSection = document.getElementById('localities-section');
    const restaurantListSection = document.getElementById('restaurant-list');
    const aboutSection = document.getElementById('about-section');
    const filterSection = document.getElementById('filter-section'); // ✅ CORREGIDO
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    favoritesSection.style.display = 'none';
    localitiesSection.style.display = 'none';
    restaurantListSection.style.display = 'none';
    if (aboutSection) aboutSection.style.display = 'none';
    if (filterSection) filterSection.style.display = 'none'; // Ocultar por defecto
    
    navLinks.forEach(link => link.classList.remove('active'));
    
    switch(seccion) {
        case 'favorites':
            favoritesSection.style.display = 'block';
            if (filterSection) filterSection.style.display = 'block'; // ✅ Mostrar filtros
            document.querySelector('#favorites-toggle').classList.add('active');
            mostrarFavoritos();
            break;
        case 'about':
            if (aboutSection) {
                aboutSection.style.display = 'block';
                // filterSection ya está oculto por defecto
                document.querySelector('a[href="#about"]').classList.add('active');
            }
            break;
        case 'home':
        default:
            localitiesSection.style.display = 'block';
            restaurantListSection.style.display = 'block';
            if (filterSection) filterSection.style.display = 'block'; // ✅ Mostrar filtros
            document.querySelector('a[href="#home"]').classList.add('active');
            break;
    }
}

// =================================================
// INICIALIZACIÓN
// =================================================
function inicializarAppContent() {
    const body = document.body;
    const themeToggleBtn = document.getElementById('theme-toggle');
    const localityButtons = document.querySelectorAll('.locality-btn');
    const navMenu = document.getElementById('nav-menu');
    const menuBtn = document.getElementById('menu-btn');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const langToggleBtn = document.getElementById('lang-toggle');
    const logo = document.querySelector('.logo'); // Seleccionar el logo

    // Event listener para el logo
    if (logo) {
        logo.addEventListener('click', (e) => {
            e.preventDefault();
            mostrarSeccion('home');
            // Opcional: cerrar el menú en móvil si está abierto
            if (window.innerWidth <= 768 && navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                menuBtn.textContent = '☰';
            }
        });
        // Agregar cursor pointer al logo
        logo.style.cursor = 'pointer';
    }

    if (menuBtn) menuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        menuBtn.textContent = navMenu.classList.contains('open') ? '✕' : '☰';
    });

    if (themeToggleBtn) themeToggleBtn.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        body.setAttribute('data-theme', newTheme);
        themeToggleBtn.textContent = newTheme === 'light' ? '☀️ / 🌙' : '🌙 / ☀️';
        localStorage.setItem('theme', newTheme);
    });
    
    if (langToggleBtn) langToggleBtn.addEventListener('click', toggleLanguageRedirect);
    
    inicializarMenuUsuario();
    
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    themeToggleBtn.textContent = savedTheme === 'light' ? '☀️ / 🌙' : '🌙 / ☀️';
    
    initializeFilterSystem();
    
    if (localityButtons.length > 0) {
        const defaultLocality = localityButtons[0].getAttribute('data-locality');
        localityButtons[0].classList.add('active');
        mostrarRestaurantes(defaultLocality);
    }
    
    mostrarSeccion('home');

    localityButtons.forEach(button => {
        button.addEventListener('click', () => {
            const localidad = button.getAttribute('data-locality');
            localityButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            mostrarRestaurantes(localidad);
            mostrarSeccion('home');
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (link.id === 'favorites-toggle') { 
                mostrarSeccion('favorites');
            } else {
                const target = link.getAttribute('href').substring(1); 
                if (target === 'home') {
                    mostrarSeccion('home');
                } else if (target === 'about') {
                    mostrarSeccion('about');
                }
            }
            
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('open');
                menuBtn.textContent = '☰';
            }
        });
    });
}

function showAppContent() {
    const loginScreen = document.getElementById('login-screen');
    const appContent = document.getElementById('app-content');
    
    loginScreen.style.display = 'none';
    appContent.style.display = 'block';
    inicializarAppContent(); 
}

// =================================================
// EXPORTS GLOBALES
// =================================================
window.AppManager = {
    showAppContent,
    inicializarAppContent,
    toggleFavorito,
    mostrarRestaurantes,
    mostrarFavoritos,
    mostrarSeccion,
    actualizarInfoUsuario,
    obtenerIniciales,
    inicializarMenuUsuario
};

window.toggleFavorito = toggleFavorito;

// =================================================
// BOTONES FLOTANTES DE REDES SOCIALES
// =================================================

function openInstagram() {
    const instagramUser = "dondecomo_bogota"; // Cambia por tu usuario
    const url = `https://www.instagram.com/${instagramUser}/`;
    window.open(url, '_blank', 'noopener,noreferrer');
}

function openFacebook() {
    const facebookPage = "dondecomo"; // Cambia por tu página
    const url = `https://www.facebook.com/${facebookPage}`;
    window.open(url, '_blank', 'noopener,noreferrer');
}

function openWhatsApp() {
    const phoneNumber = "573001234567"; // Cambia por tu número (código país + número)
    const message = "¡Hola! Me interesa conocer más sobre DóndeComo 🍽️";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
}