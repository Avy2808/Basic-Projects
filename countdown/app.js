const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway=document.querySelector(".giveaway");
const deadline=document.querySelector(".deadline");
const items=document.querySelectorAll(".deadline-format h4");

let futureDate=new Date(2022,11,31,23,59,59);
const year=futureDate.getFullYear();
const hour=futureDate.getHours();
const mins=futureDate.getMinutes();
const secs=futureDate.getSeconds();
const date=futureDate.getDate();
const day=weekdays[futureDate.getDay()];
let month=months[futureDate.getMonth()];
giveaway.textContent=`giveaway ends on ${day}, ${date} ${month} ${year} ${hour}:${mins}:${secs}pm`;

const futureTime=futureDate.getTime();

function getRemaining(){
  const today=new Date().getTime();
  const t=futureTime-today;  //in milliseconds
  const oneDay=60*60*24*1000;
  const oneHour=60*60*1000;
  const oneMin=60*1000;

  let days=Math.floor(t/oneDay);
  let hours=Math.floor((t%oneDay)/oneHour);
  let min=Math.floor((t%oneHour)/oneMin);
  let sec=Math.floor((t%oneMin)/1000);

  const values=[days, hours, min, sec];

  function format(item){
    if(item<10){
      return `0${item}`;
    }
    return item;
  }
  items.forEach(function(item, index){
    item.innerHTML=format(values[index]);
  });
  if(t<0){
    clearInterval(countdown);
    deadline.innerHTML=`<h4 class="expired">sorry, this giveaway has expired</h4>`;
  }
}
const countdown=setInterval(getRemaining, 1000);
getRemaining();