window.addEventListener('load', () => { 
    let lon, lat;
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition( posicion => { 
            console.log(posicion)
            lon = posicion.coords.longitude;
            lat = posicion.coords.latitude;
            let temperaturaValor = document.getElementById('temperatura-valor')
            let temperaturaDescripcion = document.getElementById('temperatura-descripcion')
            let ubicacion = document.getElementById('ubicacion')
            let iconoAnimado = document.getElementById('icono-animado')
            let dataExtra = document.getElementById('data-extra')
            let lugar = document.getElementById('lugar')
            let feels = document.getElementById('feels-like')
            let bdy = document.getElementById('bdy');
            let box1 = document.getElementById('box1');
            let box2 = document.getElementById('box2');
            let box3 = document.getElementById('box3');

            //Ubicacion MX
            const url = `https://api.openweathermap.org/data/2.5/weather?id=3530597&lang=es&units=metric&appid=ac5de3acf60fe9938c0c3d0701739303`
            
            fetch(url)
                .then(response => { return response.json() })
                .then(data => { 
                    //Temperatura actual
                    let tempRound = Math.round(data.main.temp)
                        temperaturaValor.textContent =` ${tempRound}° `
                    //Nombre de la ubicación actual
                    let ubicacionAct = data.name
                        lugar.textContent = `${ubicacionAct}`
                    //Estado actual atmosferico
                    let weather = data.weather[0].description
                        temperaturaDescripcion.innerHTML = `${weather}`
                    console.log(weather)
                    //Temperaturas máximas y minímas del día
                    let tempMax = Math.round(data.main.temp_max)                        
                    let tempMin = Math.round(data.main.temp_min)

                    feels.innerHTML = ` Temp max: <span id="spans">${tempMax}°</span> <br/><br/><br/> Temp min: <span id="spans">${tempMin}°</span>`

                    console.log(data.weather[0].main)
                    switch (data.weather[0].main){ 
                        case 'Thunderstorm':
                            iconoAnimado.src='animated/thunder.svg'
                                break;
                        case 'Drizzle':
                            iconoAnimado.src='animated/rainy-2.svg'
                                break;
                        case 'Rain': 
                            iconoAnimado.src='animated/rainy-7.svg'
                                break;
                        case 'Clear': 
                            iconoAnimado.src = 'animated/day.svg'
                                break;
                        case 'Atmosphere':
                            iconoAnimado.src='animated/weather.svg'
                                break;
                        case 'Clouds':
                            iconoAnimado.src='animated/cloudy.svg'
                                break;
                        default: console.log('vamos a ver xq no funciona esta fregadera')       
                    }

                    let refresh = document.getElementById('refresh');
                        refresh.addEventListener('click', _ => {
                                    location.reload();
                        })
                    

                })
                .catch( error => { console.log(error) })
        });
    }
}); 