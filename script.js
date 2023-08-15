document.querySelector('.busca').addEventListener('submit', async (e)=>{
    e.preventDefault()

    let input = document.querySelector('#searchInput').value

    if(input !== ''){
        limparInfor()
        Loand('Carregando....')

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=5012f5d7a7c2bfe423cc7969627ad2e8&units=metric&lang=pt_br` // O encodeURL é a forma que a ulr deve se recebida, tipo eu quero pesquisar por Rio de janeiro, o nome dessa forma o navegador não entende, ai tem que colocar o encode

        let resultado = await fetch(url)
        let json = await resultado.json()


        if(json.cod === 200){
            ShowInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg

            })
        }else {
            limparInfor()
            Loand('Localização não encontrada ')
        }
    }else{
        limparInfor()
    }
})

function Loand(msg){
    document.querySelector('.aviso').innerHTML = msg
}

function ShowInfo(json){

    Loand('');

    document.querySelector('.resultado').style.display = 'block'

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>℃</sup>`
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)


    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`
}

function limparInfor(){
    Loand('')

    document.querySelector('.resultado').style.display = 'none'

}