// Define the city name, defaulted to Bojonegoro
if ( localStorage.getItem('city') == null ) {
    localStorage.setItem('city', 'Bojonegoro');
}
city = localStorage.getItem("city");

// OpenWeatherMap API Key
let APPID = "fd2c04ed7f9802656bd2cc23bddc7ad9";
let units = "metric";


// Looping function to update and set the clock every second
function jam() {
    let fulldate = new Date();

    // Jam 06.35
    let jamHTML = document.getElementById("time");
    let jam = fulldate.getHours();
    let menit = fulldate.getMinutes();

    if (jam < 10){
        jam = "0" + jam;
    }
    if (menit < 10){
        menit = "0" + menit;
    }

    jamHTML.innerHTML = jam + "." + menit;


    // Date, american format
    let tanda = "th";
    let tanggalHTML = document.getElementById("date");

    let namaBulan = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let namaHari = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let hari = fulldate.getDay();
    let bulan = fulldate.getMonth();
    let tanggal = fulldate.getDate() + ""; // to change into string data types
    let tahun = fulldate.getFullYear();

    bulan = namaBulan[bulan];
    hari = namaHari[hari];

    if (tanggal.length == 1) {
        if ( tanggal == 1 ) {
            tanda = "st";
        }
        if ( tanggal == 2 ) {
            tanda = "nd";
        }
        if ( tanggal == 3 ) {
            tanda = "rd";
        }
    }
    if (tanggal.length == 2) {
        let digitSatu = tanggal.substring(0, 1)
        let digitDua = tanggal.substring(1, tanggal.length)

        if (digitSatu != 1) {
            if ( digitDua == 1 ) {
                tanda = "st";
            }
            if ( digitDua == 2 ) {
                tanda = "nd";
            }
            if ( digitDua == 3 ) {
                tanda = "rd";
            }
        }
    }

    tanggalHTML.innerHTML = hari + ", " + bulan + " " + tanggal + tanda + " " + tahun;
}
setInterval(jam, 1000); //repeat this function in 1000ms


// City display
function kota() {
    document.getElementById("kota").innerHTML = city;
}
kota();

// Weather fetching, and display them (json object)
function weather() {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${APPID}&units=${units}`
    )
    .then((response) => response.json())
        .then((data) => {
            let suhu = Math.round(data.main.temp) + " °C";
            let keadaan = data.weather[0].description;
            let icon = data.weather[0].icon
            
            document.getElementById("suhu").innerHTML = suhu;
            document.getElementById("keadaan").innerHTML = keadaan;
    
            let iconUrl = "https://openweathermap.org/img/wn/" + icon + ".png"
            document.getElementById("gambar").src = iconUrl;
        });
}
weather();
    
// A button to change the city
function changeCity() {
    let edit = document.getElementById('changeCity');
    let done = document.getElementById('changeDone');
    let form = document.getElementById('city');
    let disp = document.getElementById('kota');

    edit.style.display = "none";
    disp.style.display = "none";
    done.style.display = "block";
    form.style.display = "block";

    form.focus();
}

// Changing is done, button
// if form is null, alerting user
function changeDone() {
    let edit = document.getElementById('changeCity');
    let done = document.getElementById('changeDone');
    let form = document.getElementById('city');
    let disp = document.getElementById('kota');

    let city = form.value;
    if (city != "") {
        localStorage.setItem('city', city);

        edit.style.display = "block";
        disp.style.display = "block";
        done.style.display = "none";
        form.style.display = "none";
    
        window.location.reload();
    } else {
        edit.style.display = "block";
        disp.style.display = "block";
        done.style.display = "none";
        form.style.display = "none";
    }
}

// Changing is done, ENTER
function clickPress(event){
    if (event.keyCode == 13) {
        changeDone();
    }
}

// Last updated for the weather
function lastup() {
    let lastup = document.getElementById('lastup')
    let date = new Date()

    let jam = date.getHours();
    let menit = date.getMinutes();

    if (jam < 10){
        jam = "0" + jam;
    }
    if (menit < 10){
        menit = "0" + menit;
    }

    lastup.innerHTML = "Last updated at " + jam + "." + menit;
}
lastup();

// COVID 19 IN INDONESIA
function covid() {
    fetch("https://apicovid19indonesia-v2.vercel.app/api/indonesia/more")
        .then((response) => response.json())
        .then((data) => {
            let positif = data.penambahan.positif;
            let sembuh = data.penambahan.sembuh;
            let dirawat = data.penambahan.dirawat;
            let meninggal = data.penambahan.meninggal;

            let fulldate = new Date(data.penambahan.created)
            let jam = fulldate.getHours();
            let menit = fulldate.getMinutes();
        
            if (jam < 10){
                jam = "0" + jam;
            }
            if (menit < 10){
                menit = "0" + menit;
            }
            
        
            // Date, american format
            let tanda = "th";
            let tanggalHTML = document.getElementById("date");
        
            let namaBulan = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        
            let bulan = fulldate.getMonth();
            let tanggal = fulldate.getDate() + ""; // to change into string data types
            let tahun = fulldate.getFullYear();
        
            bulan = namaBulan[bulan];
        
            if (tanggal.length == 1) {
                if ( tanggal == 1 ) {
                    tanda = "st";
                }
                if ( tanggal == 2 ) {
                    tanda = "nd";
                }
                if ( tanggal == 3 ) {
                    tanda = "rd";
                }
            }
            if (tanggal.length == 2) {
                let digitSatu = tanggal.substring(0, 1)
                let digitDua = tanggal.substring(1, tanggal.length)
        
                if (digitSatu != 1) {
                    if ( digitDua == 1 ) {
                        tanda = "st";
                    }
                    if ( digitDua == 2 ) {
                        tanda = "nd";
                    }
                    if ( digitDua == 3 ) {
                        tanda = "rd";
                    }
                }
            }
            waktu = `${bulan} ${tanggal}${tanda} ${tahun}, ${jam}:${menit}`;

            let positifDoc = document.getElementById('positif');
            let sembuhDoc = document.getElementById('sembuh');
            let dirawatDoc = document.getElementById('dirawat');
            let meninggalDoc = document.getElementById('meninggal');
            let updateDoc = document.getElementById('update');

            positifDoc.innerHTML = ":  +" + positif;
            sembuhDoc.innerHTML = ":  +" + sembuh;
            dirawatDoc.innerHTML = ":  +" + dirawat;
            meninggalDoc.innerHTML = ":  +" + meninggal;
            updateDoc.innerHTML = "updated on " + waktu;
        })
}
covid();

function vaksin() {
    fetch("https://cekdiri.id/vaksinasi/")
    .then((response) => response.json())
        .then((data) => {
            let vaksin1 = document.getElementById("vaksin1")
            let vaksin2 = document.getElementById("vaksin2")

            let terakhir = data.monitoring.length - 1;
            let vaksin1Data = data.monitoring[terakhir].cakupan.vaksinasi1;
            let vaksin2Data = data.monitoring[terakhir].cakupan.vaksinasi2;

            vaksin1.innerHTML = ":  " + vaksin1Data;
            vaksin2.innerHTML = ":  " + vaksin2Data;
        })
    
}
vaksin();

function refresh() {
    let reload = document.getElementById("reload")
    reload.style.animation = "rotation 1.5s";
    reload.style.animationIterationCount = 3;

    kota();
    weather();
    lastup();
    covid();
    vaksin();
}
