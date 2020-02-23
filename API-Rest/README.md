# Instalar el pack json
npm i

# Cargar base de datos
npm run install_db

# Conectar servidor
npm run dev

### Filtros

    * Lista de anuncios
    http://localhost:3001/api/anuncios

    * Nombre
    http://localhost:3001/api/anuncios?name=(primeras letras o nombre completo)

    * Venta o busqueda
    http://localhost:3001/api/anuncios?sell=(true or false)

    * Limite
    http://localhost:3001/api/anuncios?limit=(numero)

    * Tag
    http://localhost:3001/api/anuncios?tags=(tag a buscar)

    * Precio
    http://localhost:3001/api/anuncios?price=(precio o rango de precio)
        -Mayores o iguales de: X-
        -Menores o iguales de: -X
        -Rango de precio: X-X
        -Precio unico: X
    * Orden
    http://localhost:3001/api/anuncios?sort=(parametro por el que colocar:nombre, precio,..)

    *Ejemplo:
    http://localhost:3001/api/anuncios?limit=4&sell=true&name=fo&tags=motor&sort=precio

    * Cargar imagenes
    http://localhost:3001/images/(nombre de la imagen)

# Login
    /POST http://localhost:3001/api/login
    Con el usuario:
        User: user@example.com  
        Password: 1234
    Recibimos un token con el que podremos acceder a la API:
    /POST http://localhost:3001/api/anuncios?token=..........

# Subida de imagenes
    Cuando creemos un anuncio nuevo, debermos hacerlo con un form-data, y el campo de la foto, expecificar que es de tipo archivo

# Desconexion del servidor
ctrl + C

#### Users ####

name: Firechicken
email: egg@example.com
password: 091fi

name: KickBill
email: ball@example.com
password: aaa23

name: Snowy
email: sun@example.com
password: lol11