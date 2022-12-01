// Main Dev: PossibleNPC
// Supporting Devs: Gustav, johalexander, CookieNess
let HOSTNAME = "";

if (process.env.NODE_ENV === "production") {
  HOSTNAME = "se2-b.compute.dtu.dk";
} else {
  HOSTNAME = "localhost";
}

export default HOSTNAME;
