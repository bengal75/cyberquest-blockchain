const getChar = () => {
    return Math.floor(Math.random() * 16).toString(16);
};

let tick = 0;

const draw = () => {
    tick++;

    let width = window.innerWidth / 8;
    let height = window.innerHeight / 16;
    if (tick % 8 !== 0) {
        window.requestAnimationFrame(draw);
        return;
    }

    let out = "";

    let x, y;
    for (y = 0; y < height; y++) {
        for (x = 0; x < width; x++) {
            out += getChar();
        }
        out += "<br/>";
    }

    document.querySelector(".cyberquest-background").innerHTML = out;

    window.requestAnimationFrame(draw);
};

const backgroundClass = () => {
    window.addEventListener("resize", () => {
        tick = 0;
    });

    draw();
};

export default backgroundClass;
