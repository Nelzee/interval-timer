const hour = document.querySelector(".hours");
const minute = document.querySelector(".minutes");
const second = document.querySelector(".seconds");

function times(){
    const current = new Date();

    const hours = current.getHours();
    const minutes = current.getMinutes();
    const seconds = current.getSeconds();

    hour.textContent = hours;
    minute.textContent = minutes;
    second.textContent = seconds;

    hour.appendChild(hour);
    minute.appendChild(minute);
    second.appendChild(second);
}
setInterval(times, 1000);