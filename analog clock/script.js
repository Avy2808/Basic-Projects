function setTime(){
    const date=new Date();
    const h=date.getHours();
    const m=date.getMinutes();
    const s=date.getSeconds();
    const hrot=30*h+m/2;
    const mrot=6*m;
    const srot=6*s;

    const hour=document.querySelector(".hour");
    const min=document.querySelector(".min");
    const sec=document.querySelector(".sec");

    hour.style.transform=`rotate(${hrot}deg)`;
    min.style.transform=`rotate(${mrot}deg)`;
    sec.style.transform=`rotate(${srot}deg)`;
}
setInterval(setTime, 1000);