const init = (db) => {
    const albums = db.albums;
    const generos = db.generos;

    function randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }
      
    albums.truncate();
    albums.bulkCreate([
        {artista: 'A-HA', titulo: 'Memorial Beach', genero: 'Rock', soporte: ' Vinilo ', precio: 1900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'A-HA', titulo: 'Cast In Steel', genero: 'Rock', soporte: ' Vinilo ', precio: 800, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'AC/DC', titulo: 'Who Made Who', genero: 'Rock', soporte: ' CD ', precio: 2900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'AC/DC', titulo: 'Fly On The Wall', genero: 'Rock', soporte: ' Vinilo ', precio: 500, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Arctic Monkeys', titulo: 'Whatever People Say That Im', genero: 'Rock', soporte: ' Vinilo ', precio: 300, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Badu Erykah', titulo: 'Mama´s Gun', genero: 'Rock', soporte: ' Cassette ', precio: 900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Badu Erykah', titulo: 'Baduizm', genero: 'Rock', soporte: ' CD ', precio: 900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Bjork', titulo: 'Selma Songs', genero: 'Rock', soporte: ' CD ', precio: 600, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Bjork', titulo: 'Biophilia', genero: 'Rock', soporte: ' Cassette ', precio: 1900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Chemical Brothers', titulo: 'We Are The Night', genero: 'Electronica', soporte: ' CD ', precio: 1700, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Chemical Brothers', titulo: 'Dig Your Own Hole', genero: 'Electronica', soporte: ' CD ', precio: 2900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Chet Baker', titulo: 'Complete Recordings', genero: 'Jazz', soporte: ' Vinilo ', precio: 1700, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Chet Baker', titulo: 'Chet Baker Sings', genero: 'Jazz', soporte: ' CD ', precio: 1900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Daft Punk', titulo: 'The Many Faces Of - 3 CDs', genero: 'Electronica', soporte: ' CD ', precio: 500, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Daft Punk', titulo: 'Random Access Memories', genero: 'Electronica', soporte: ' CD ', precio: 900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Davis Miles', titulo: 'Walkin', genero: 'Jazz', soporte: ' CD ', precio: 1500, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Davis Miles', titulo: 'In A Silent Way', genero: 'Jazz', soporte: ' Vinilo ', precio: 1500, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Divididos', titulo: 'Divididos', genero: 'Nacional', soporte: ' Vinilo ', precio: 900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Divididos', titulo: 'Otro Le Travaladna', genero: 'Nacional', soporte: ' CD ', precio: 1000, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'El Mató a un Policía Motorizado', titulo: 'Un Millón de Euros', genero: 'Nacional', soporte: ' Vinilo ', precio: 400, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'El Mató a un Policía Motorizado', titulo: 'Navidad de Reserva', genero: 'Nacional', soporte: ' Vinilo ', precio: 700, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'El Mató a un Policía Motorizado', titulo: 'El Mató a un Policía Motorizado', genero: 'Nacional', soporte: ' Cassette ', precio: 1500, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Foo Fighters', titulo: 'There Is Nothing Left To Lose', genero: 'Rock', soporte: ' CD ', precio: 900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Gorillaz', titulo: 'The Fall', genero: 'Rock', soporte: ' CD ', precio: 1000, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Gorillaz', titulo: 'The Now Now', genero: 'Rock', soporte: ' Cassette ', precio: 500, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Jimenez Carlitos La Mona', titulo: 'Cuarteto es la Mona', genero: 'Cuarteto', soporte: ' CD ', precio: 2500, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Jimenez Carlitos La Mona', titulo: 'El Agite', genero: 'Cuarteto', soporte: ' CD ', precio: 1200, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Jimenez Carlitos La Mona', titulo: 'El Vicio de la Mona', genero: 'Cuarteto', soporte: ' Vinilo ', precio: 900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Jimenez Carlitos La Mona', titulo: 'Selección Privada 72', genero: 'Cuarteto', soporte: ' CD ', precio: 1200, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Jovenes Pordioseros', titulo: 'Vicio', genero: 'Nacional', soporte: ' CD ', precio: 1900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Jovenes Pordioseros', titulo: 'Sangre', genero: 'Nacional', soporte: ' CD ', precio: 800, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Jovenes Pordioseros', titulo: 'Probame', genero: 'Nacional', soporte: ' CD ', precio: 500, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Motörhead', titulo: 'Bastards', genero: 'Metal', soporte: ' Vinilo ', precio: 500, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Mötorhead', titulo: 'Welcome to the Bear Trap', genero: 'Metal', soporte: ' Vinilo ', precio: 1500, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Mötorhead', titulo: 'Live at Brixton', genero: 'Metal', soporte: ' CD ', precio: 2500, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'New Order', titulo: 'Waiting For The Sirens Call', genero: 'Electronica', soporte: ' Vinilo ', precio: 3000, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'New Order', titulo: 'Brotherhood', genero: 'Electronica', soporte: ' Vinilo ', precio: 3500, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'New Order', titulo: 'Movement', genero: 'Electronica', soporte: ' Cassette ', precio: 3500, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Nirvana', titulo: 'Nevermind', genero: 'Rock', soporte: ' CD ', precio: 3500, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Nirvana', titulo: 'In Bloom Collection', genero: 'Rock', soporte: ' CD ', precio: 3900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Pandolfo Palo', titulo: 'Antojo', genero: 'Nacional', soporte: ' Cassette ', precio: 3500, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Pandolfo Palo', titulo: 'A traves de los sueños', genero: 'Nacional', soporte: ' CD ', precio: 2900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Patricio Rey Y Sus Redonditos De Ricota', titulo: 'Ultimo Bondi A Finisterre', genero: 'Nacional', soporte: ' CD ', precio: 3300, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Patricio Rey Y Sus Redonditos De Ricota', titulo: 'Momo Sampler', genero: 'Nacional', soporte: ' Vinilo ', precio: 1900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Pearl Jam', titulo: 'Binaural', genero: 'Rock', soporte: ' CD ', precio: 200, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Pearl Jam', titulo: 'Riot Act', genero: 'Rock', soporte: ' Vinilo ', precio: 400, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Pink Floyd', titulo: 'Obscured by Clouds', genero: 'Rock', soporte: ' Vinilo ', precio: 400, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Pixies', titulo: 'Trompe Le Monde', genero: 'Rock', soporte: ' CD ', precio: 500, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Primus', titulo: 'Green Naugahyde', genero: 'Rock', soporte: ' Vinilo ', precio: 700, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Rage Against The Machine', titulo: 'The Battle of L.A', genero: 'Rock', soporte: ' Vinilo ', precio: 500, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Ramones The', titulo: 'Mondo Bizarro', genero: 'Rock', soporte: ' Cassette ', precio: 3900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Ramones The', titulo: 'Pleasent Dreams', genero: 'Rock', soporte: ' CD ', precio: 1800, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Soda Stereo', titulo: 'Canción Animal', genero: 'Nacional', soporte: ' CD ', precio: 1900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Soda Stereo', titulo: 'Sueño Stereo', genero: 'Nacional', soporte: ' Cassette ', precio: 900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'ZZ Top', titulo: 'Eliminator', genero: 'Rock', soporte: ' CD ', precio: 2900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'ZZ Top', titulo: 'Tejas', genero: 'Rock', soporte: ' CD ', precio: 2900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'ZZ Top', titulo: 'Fandango', genero: 'Rock', soporte: ' Vinilo ', precio: 2900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
    ]);

    generos.truncate();
    generos.bulkCreate([
        {nombre: 'Cuarteto'},
        {nombre: 'Electrónica'},
        {nombre: 'Jazz'},
        {nombre: 'Metal'},
        {nombre: 'Nacional'},
        {nombre: 'Rock'}
    ]);
}

module.exports = init;



