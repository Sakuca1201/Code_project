const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let time = 0;
let wave = [];

const modeSelect = document.getElementById("mode");
const waveSelect = document.getElementById("waveType");

const slider = document.getElementById("terms");
const sliderValue = document.getElementById("termsValue");

const customControls = document.getElementById("customControls");

slider.oninput = () => sliderValue.innerText = slider.value;

function epicycles(x,y,terms){

    let type = waveSelect.value;

    for(let n=1;n<=terms;n++){

        let prevx = x;
        let prevy = y;

        let radius;
        let freq;

        if(type==="square"){

            freq = n*2-1;
            radius = 80*(4/(freq*Math.PI));

        }

        else if(type==="triangle"){

            freq = n*2-1;
            radius = 80*(8/(Math.PI*Math.PI*freq*freq));

        }

        else if(type==="saw"){

            freq = n;
            radius = 80*(2/(freq*Math.PI))*(n%2===0?-1:1);

        }

        let angle = freq*time;

        x += radius*Math.cos(angle);
        y += radius*Math.sin(angle);

        ctx.beginPath();
        ctx.arc(prevx,prevy,Math.abs(radius),0,Math.PI*2);
        ctx.strokeStyle="#555";
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(prevx,prevy);
        ctx.lineTo(x,y);
        ctx.strokeStyle="white";
        ctx.stroke();
    }

    return {x,y};
}

function wavePacket(x,y,terms){

    const k0 = 8;
    const sigma = 3;

    for(let n=1;n<=terms;n++){

        let prevx = x;
        let prevy = y;

        let amplitude =
            Math.exp(-(n-k0)*(n-k0)/(2*sigma*sigma));

        let radius = amplitude*80;

        let angle = n*time;

        x += radius*Math.cos(angle);
        y += radius*Math.sin(angle);

        ctx.beginPath();
        ctx.arc(prevx,prevy,Math.abs(radius),0,Math.PI*2);
        ctx.strokeStyle="#555";
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(prevx,prevy);
        ctx.lineTo(x,y);
        ctx.strokeStyle="white";
        ctx.stroke();
    }

    return {x,y};
}

function draw(){

    ctx.fillStyle="black";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    let mode = modeSelect.value;

    let terms;

    if(mode==="classic"){

        terms = Math.floor(time*2)%40 + 1;
        customControls.style.display="none";

        var v = epicycles(200,220,terms);
    }

    else if(mode==="custom"){

        terms = slider.value;
        customControls.style.display="block";

        var v = epicycles(200,220,terms);
    }

    else if(mode==="packet"){

        terms = Math.floor(time*2)%40 + 1;
        customControls.style.display="none";

        var v = wavePacket(200,220,terms);
    }

    wave.unshift(v.y);

    ctx.beginPath();
    ctx.moveTo(v.x,v.y);
    ctx.lineTo(450,wave[0]);
    ctx.stroke();

    ctx.beginPath();

    for(let i=0;i<wave.length;i++){

        ctx.lineTo(450+i,wave[i]);

    }

    ctx.stroke();

    if(wave.length>500) wave.pop();

    time += 0.03;

    requestAnimationFrame(draw);
}

draw();