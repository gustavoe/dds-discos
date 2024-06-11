const init = (db) => {
    const albums = db.albums;
    const generos = db.generos;

    function randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }
      

    albums.truncate();
    albums.bulkCreate([
        {artista: 'A-HA', album: 'Memorial Beach', genero: 'Rock', soporte: ' Vinilo ', precio: 1900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'A-HA', album: 'Cast In Steel', genero: 'Rock', soporte: ' Vinilo ', precio: 800, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'AC/DC', album: 'Who Made Who', genero: 'Rock', soporte: ' CD ', precio: 2900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'AC/DC', album: 'Fly On The Wall', genero: 'Rock', soporte: ' Vinilo ', precio: 500, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Arctic Monkeys', album: 'Whatever People Say That Im', genero: 'Rock', soporte: ' Vinilo ', precio: 300, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Badu Erykah', album: 'Mama´s Gun', genero: 'Rock', soporte: ' Cassette ', precio: 900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Badu Erykah', album: 'Baduizm', genero: 'Rock', soporte: ' CD ', precio: 900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Bjork', album: 'Selma Songs', genero: 'Rock', soporte: ' CD ', precio: 600, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Bjork', album: 'Biophilia', genero: 'Rock', soporte: ' Cassette ', precio: 1900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Chemical Brothers', album: 'We Are The Night', genero: 'Electronica', soporte: ' CD ', precio: 1700, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Chemical Brothers', album: 'Dig Your Own Hole', genero: 'Electronica', soporte: ' CD ', precio: 2900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Chet Baker', album: 'Complete Recordings', genero: 'Jazz', soporte: ' Vinilo ', precio: 1700, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Chet Baker', album: 'Chet Baker Sings', genero: 'Jazz', soporte: ' CD ', precio: 1900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Daft Punk', album: 'The Many Faces Of - 3 CDs', genero: 'Electronica', soporte: ' CD ', precio: 500, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Daft Punk', album: 'Random Access Memories', genero: 'Electronica', soporte: ' CD ', precio: 900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Davis Miles', album: 'Walkin', genero: 'Jazz', soporte: ' CD ', precio: 1500, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Davis Miles', album: 'In A Silent Way', genero: 'Jazz', soporte: ' Vinilo ', precio: 1500, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Divididos', album: 'Divididos', genero: 'Nacional', soporte: ' Vinilo ', precio: 900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Divididos', album: 'Otro Le Travaladna', genero: 'Nacional', soporte: ' CD ', precio: 1000, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'El Mató a un Policía Motorizado', album: 'Un Millón de Euros', genero: 'Nacional', soporte: ' Vinilo ', precio: 400, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'El Mató a un Policía Motorizado', album: 'Navidad de Reserva', genero: 'Nacional', soporte: ' Vinilo ', precio: 700, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'El Mató a un Policía Motorizado', album: 'El Mató a un Policía Motorizado', genero: 'Nacional', soporte: ' Cassette ', precio: 1500, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Foo Fighters', album: 'There Is Nothing Left To Lose', genero: 'Rock', soporte: ' CD ', precio: 900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Gorillaz', album: 'The Fall', genero: 'Rock', soporte: ' CD ', precio: 1000, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Gorillaz', album: 'The Now Now', genero: 'Rock', soporte: ' Cassette ', precio: 500, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Jimenez Carlitos La Mona', album: 'Cuarteto es la Mona', genero: 'Cuarteto', soporte: ' CD ', precio: 2500, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Jimenez Carlitos La Mona', album: 'El Agite', genero: 'Cuarteto', soporte: ' CD ', precio: 1200, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Jimenez Carlitos La Mona', album: 'El Vicio de la Mona', genero: 'Cuarteto', soporte: ' Vinilo ', precio: 900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Jimenez Carlitos La Mona', album: 'Selección Privada 72', genero: 'Cuarteto', soporte: ' CD ', precio: 1200, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Jovenes Pordioseros', album: 'Vicio', genero: 'Nacional', soporte: ' CD ', precio: 1900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Jovenes Pordioseros', album: 'Sangre', genero: 'Nacional', soporte: ' CD ', precio: 800, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Jovenes Pordioseros', album: 'Probame', genero: 'Nacional', soporte: ' CD ', precio: 500, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Motörhead', album: 'Bastards', genero: 'Metal', soporte: ' Vinilo ', precio: 500, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Mötorhead', album: 'Welcome to the Bear Trap', genero: 'Metal', soporte: ' Vinilo ', precio: 1500, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Mötorhead', album: 'Live at Brixton', genero: 'Metal', soporte: ' CD ', precio: 2500, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'New Order', album: 'Waiting For The Sirens Call', genero: 'Electronica', soporte: ' Vinilo ', precio: 3000, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'New Order', album: 'Brotherhood', genero: 'Electronica', soporte: ' Vinilo ', precio: 3500, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'New Order', album: 'Movement', genero: 'Electronica', soporte: ' Cassette ', precio: 3500, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Nirvana', album: 'Nevermind', genero: 'Rock', soporte: ' CD ', precio: 3500, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Nirvana', album: 'In Bloom Collection', genero: 'Rock', soporte: ' CD ', precio: 3900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Pandolfo Palo', album: 'Antojo', genero: 'Nacional', soporte: ' Cassette ', precio: 3500, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Pandolfo Palo', album: 'A traves de los sueños', genero: 'Nacional', soporte: ' CD ', precio: 2900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Patricio Rey Y Sus Redonditos De Ricota', album: 'Ultimo Bondi A Finisterre', genero: 'Nacional', soporte: ' CD ', precio: 3300, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Patricio Rey Y Sus Redonditos De Ricota', album: 'Momo Sampler', genero: 'Nacional', soporte: ' Vinilo ', precio: 1900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Pearl Jam', album: 'Binaural', genero: 'Rock', soporte: ' CD ', precio: 200, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Pearl Jam', album: 'Riot Act', genero: 'Rock', soporte: ' Vinilo ', precio: 400, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Pink Floyd', album: 'Obscured by Clouds', genero: 'Rock', soporte: ' Vinilo ', precio: 400, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Pixies', album: 'Trompe Le Monde', genero: 'Rock', soporte: ' CD ', precio: 500, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Primus', album: 'Green Naugahyde', genero: 'Rock', soporte: ' Vinilo ', precio: 700, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Rage Against The Machine', album: 'The Battle of L.A', genero: 'Rock', soporte: ' Vinilo ', precio: 500, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Ramones The', album: 'Mondo Bizarro', genero: 'Rock', soporte: ' Cassette ', precio: 3900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Ramones The', album: 'Pleasent Dreams', genero: 'Rock', soporte: ' CD ', precio: 1800, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Soda Stereo', album: 'Canción Animal', genero: 'Nacional', soporte: ' CD ', precio: 1900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Soda Stereo', album: 'Sueño Stereo', genero: 'Nacional', soporte: ' Cassette ', precio: 900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'ZZ Top', album: 'Eliminator', genero: 'Rock', soporte: ' CD ', precio: 2900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'ZZ Top', album: 'Tejas', genero: 'Rock', soporte: ' CD ', precio: 2900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'ZZ Top', album: 'Fandango', genero: 'Rock', soporte: ' Vinilo ', precio: 2900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},    ]);

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



