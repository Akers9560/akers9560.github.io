//get the DOM elements
time = document.querySelector('#time1000');
greeting = document.querySelector('#greeting');
tabItems = document.querySelectorAll('.tab-item');
tabContentItems = document.querySelectorAll('.tab-content-item');
Quote = document.querySelector('#Quote');
Weather = document.querySelector('#Weather');

timer = null
clearTimeout(timer)


//show the actual time
function showTime(){
    let today = new Date()
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

    //Am or Pm?
    const amPm = hour >= 12 ? 'PM' : 'AM';
    //sets to 12 hours
    // hour = hour % 12 || 12;
    //print time
    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
    //Refresh every second
    timer = setTimeout(showTime, 1000)
}

//add zero to the time using terenary
function addZero(n){
    return (parseInt(n, 10) < 10 ? '0' : '') + n
}

//setting background image according to time
function setBackground() {
    let today = new Date(),
    hour = today.getHours();
        /*if(hour < 12){
            document.body.style.backgroundImage = "url('/img/time/morning.jpg')";
            greeting.textContent = "Guten Morgen!"
        } else if(hour < 18){
            document.body.style.backgroundImage = "url('/img/time/afterrnoon.jpg')";
            greeting.textContent = "Guten Tag!"
        } else{
            document.body.style.backgroundImage = "url('/img/time/night.jpg')";
            greeting.textContent = "Guten Abend!"
            document.body.style.color = '#FFFFFF'
        }*/
}

//Toggles between meme generator and main page
function selectItem(e){
    removeColor()
    removeShow()
    this.classList.add('color')
    console.log(this.item)
    let tabContentItem = document.querySelector(`#${this.id}-content`)
    tabContentItem.classList.add('show');
}




function removeShow() {
    tabContentItems.forEach(item => item.classList.remove('show'));
}

function removeColor() {
    tabItems.forEach(item => item.classList.remove('color'));
}

tabItems.forEach(item => item.addEventListener('click', selectItem));



//fetching data

fetchQuote = async () => {
    try{
        const res = await fetch('https://150000-quotes.p.rapidapi.com/random', {

        headers: {
            "x-rapidapi-host" : "150000-quotes.p.rapidapi.com",
            "x-rapidapi-key" : "7da1759178msh229dd905e210446p1bb084jsn5dd0818fa88c"
        }
    });
        const data = await res.json();
        const {message} = data
        Quote.textContent = `"${message}"`
    } catch (err){
        console.log(err);
        Quote.textContent = "Server Error"
    }
}


//fetching data for weather
fetchWeather = async () => {
    try{
        const res2 = await fetch(`https://api.seniverse.com/v3/weather/now.json?key=SzOUZCVYegf6dgGO-&location=beijing&language=zh-Hans&unit=c`)
        const data2 = await res2.json();
        const {apparentTemperature, summary} = data2.currently;
        Weather.textContent = `Current weather: ${apparentTemperature} Degrees F    ${summary}`
    } catch(err){
        console.log(err)
        Weather.textContent = "Server error"
    }
}


//fetching meme api
//const fetchMeme = async () => {
 //   try{
  //      const res3 = await fetch('https://ronreiter-meme-generator.p.rapidapi.com/meme?font=Impact&font_size=50&meme=Condescending-Wonka&top=Top%20text&bottom=Bottom%20text', {
   //         headers: {
    //            "method" : "GET",
     //           "x-rapidapi-host": "ronreiter-meme-generator.p.rapidapi.com",
	//	        "x-rapidapi-key": "7da1759178msh229dd905e210446p1bb084jsn5dd0818fa88c"
     //       }
      //  });
       // data = res3.json()
        //console.log(data)
        //document.getElementById("testt").src = 
    //} catch(err){
     //   console.log(err)
    //}
//}


//fetchMeme()
fetchWeather()
fetchQuote()
showTime()
setBackground()