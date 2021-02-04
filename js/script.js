const minute = document.querySelector(".minutes");
const second = document.querySelector(".seconds");
const deadline = document.querySelector('.counter_container');
const items = document.querySelectorAll('.count_down h4');
const status = document.querySelector(".container h2");
const start = document.querySelector(".start");
const toggleBtn = document.querySelector(".sidebar-toggle");
const closeBtn = document.querySelector(".close-btn");
const sidebar = document.querySelector(".sidebar");
const currentSet = document.querySelector(".currentSet");
const sets = document.querySelector(".sets")
const rest = document.querySelector(".rest")
const scnds = document.querySelector(".scnds")
const mnts = document.querySelector(".mnts")
const restsecs = document.querySelector(".restSecs");
const restSecsTitle = document.querySelector(".restSecs h3")
const restSeconds = document.querySelector(".restSeconds");
const inputs = document.querySelectorAll('.controlls input');

// variables
let currentSets = 1;
let mins = 1;
let scs = 0;
let scsRest = 0;
let sts = 1;
let crrntst = 0;
let totalTime = 0;
let getReady = 0;
let eachSet = 0;
let intrvl = 0;
let restIntrvl = 0;
let breather = 0;

toggleBtn.addEventListener("click", function () {
  sidebar.classList.toggle("show-sidebar");
});

closeBtn.addEventListener("click", function () {
  sidebar.classList.remove("show-sidebar");
});



function handleUpdate() {
    this.name.innerHTML = this.value;
    if(this.name === "sets"){
        sets.innerHTML = this.value;
        sts = parseInt(this.value);
    }
    else if(this.name === "rest"){
        rest.innerHTML = this.value;
        scsRest = parseInt(this.value);
    }
    else if(this.name === "seconds"){
        scnds.innerHTML = this.value;
        scs = parseInt(this.value);
        console.log(scs);
    }
    else{
        mnts.innerHTML = this.value;
        mins = parseInt(this.value);
    }
}

inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));

start.addEventListener('click', function(){
  min = mins * 60;
  crrntst = sts;
  currentSets = sts;
  totalTime = sts * (scs + min + scsRest + 2) + 1;
  console.log(totalTime);
  eachSet = scs + min;
  getReady = 3
  intrvl = eachSet;
  breather = scsRest;
  restIntrvl = breather;
  console.log(totalTime, eachSet, scs, min);
  sidebar.classList.toggle("show-sidebar"); 
  getRemaindingTime();
});

function format(item) {
    if (item < 10) {
      return (item = `0${item}`);
    }
    return item;
  }

function getRemaindingTime() {
  let t = totalTime;
  
  // set values array
  const oneDay = 24 * 60 * 60 ;
  const oneHour = 60 * 60 ;
  const oneMinute = 60;

  // calculate all values
  let hours = Math.floor((intrvl % oneDay) / oneHour);
  let minutes = Math.floor((intrvl % oneHour) / oneMinute);
  let seconds = Math.floor(intrvl % oneMinute);
  const values = [hours, minutes, seconds];
  if(totalTime >= 0){
    items.forEach(function (item, index) {
      item.innerHTML = format(values[index]);
    });
    if(currentSets === crrntst && getReady > 0){
      restsecs.classList.add("show_rest");
      restSecsTitle.innerHTML = "Get Ready"
      restSeconds.innerHTML = getReady;
      getReady -= 1;
    }
    else if(intrvl > 0){
      if(restsecs.classList.contains("show_rest")){
        restsecs.classList.remove("show_rest");
      }
      intrvl -= 1;
      console.log(intrvl);
    } 
    else if (intrvl <= 0 && restIntrvl >= 0){
      if(!restsecs.classList.contains("show_rest") &&restIntrvl > 0){
        restSecsTitle.innerHTML = "Rest";
        restsecs.classList.add("show_rest");
      }
    restSeconds.innerHTML = restIntrvl;
    restIntrvl -= 1;
    console.log(restIntrvl);
    } 
    else {
      currentSets -= 1;
      intrvl = eachSet;
      restIntrvl = breather;
  }
  }
  currentSet.innerHTML = currentSets;
  totalTime -= 1;
  
}
// countdown;
  setInterval(getRemaindingTime, 1000);
