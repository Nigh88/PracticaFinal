# Instalar el pack json
npm i

# Cargar base de datos
npm run install_db

# Conectar servidor
npm run dev

### Filtros

    * Lista de adverts
    http://localhost:3001/api/adverts

    * Nombre
    http://localhost:3001/api/adverts?name=(primeras letras o nombre completo)

    * Venta o busqueda
    http://localhost:3001/api/adverts?sell=(true or false)

    * Limite
    http://localhost:3001/api/adverts?limit=(numero)

    * Tag
    http://localhost:3001/api/adverts?tags=(tag a buscar)

    * Precio
    http://localhost:3001/api/adverts?price=(precio o rango de precio)
        -Mayores o iguales de: X-
        -Menores o iguales de: -X
        -Rango de precio: X-X
        -Precio unico: X
    * Orden
    http://localhost:3001/api/adverts?sort=(parametro por el que colocar:nombre, precio,..)

    *Ejemplo:
    http://localhost:3001/api/adverts?limit=4&sell=true&name=fo&tags=motor&sort=precio

    * Cargar imagenes
    http://localhost:3001/images/(nombre de la imagen)

# Login
    /POST http://localhost:3001/api/login
    Con el usuario:
        User: user@example.com  
        Password: 1234
    Recibimos un token con el que podremos acceder a la API:
    /POST http://localhost:3001/api/adverts?token=..........

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

#### Online Accsess

ec2-3-21-45-31.us-east-2.compute.amazonaws.com