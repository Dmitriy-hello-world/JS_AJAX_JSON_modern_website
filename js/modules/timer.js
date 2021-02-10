function getZero(num) {
    if (num >= 0 && num < 10) {
        return "0" + num;
    } else {
        return num;
    }
}

function timer(classSelector,deadlineTime) {
    
    function getTime(deadlineTime) {
        const t = Date.parse(deadlineTime) - Date.parse(new Date()),
              days = Math.floor( t / (1000 * 60 * 60 * 24)),
              hours = Math.floor( (t / (1000 * 60 * 60)) % 24),
              minutes = Math.floor( (t / (1000 * 60)) % 60),
              seconds = Math.floor( (t / 1000) % 60);

        return {
            t: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    }

    function mainTimer(selector, deadlineTime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector("#days"),
              hours = timer.querySelector("#hours"),
              minutes = timer.querySelector("#minutes"),
              seconds = timer.querySelector("#seconds"),
              clockInterval = setInterval(updateClock,1000);

        updateClock();      

        function updateClock() {
            const obj = getTime(deadlineTime);

            days.innerHTML = getZero(obj.days);
            hours.innerHTML = getZero(obj.hours);
            minutes.innerHTML = getZero(obj.minutes);
            seconds.innerHTML = getZero(obj.seconds);

            if ( obj.t <= 0 ) {
                clearInterval(clockInterval);
            }
        }
    }

    mainTimer(classSelector, deadlineTime);
}

export default timer;
export {getZero};