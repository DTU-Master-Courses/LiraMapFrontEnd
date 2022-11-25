
let Hostname = "";

if (process.env.NODE_ENV === "production") {
    Hostname = "se2-b.compute.dtu.dk";
} else {
    Hostname = "localhost"
}


export default Hostname;