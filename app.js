// Module dependencies
var express  = require("express"),
 http     = require("http"),
 mongoose = require("mongoose"),
 config   = require("./config.json");
 path     = require("path");
 
// Mongoose settings
mongoose.Promise = global.Promise;

// Connect to MongoDB Atlas
let connectionString = `${config.server.database.protocol}://${config.server.database.user}:${config.server.database.password}@${config.server.database.host}/${config.server.database.database}` 

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("[>] Connected to MongoDB Atlas.");
}).catch(err => {
  console.log("[x] Failed to connect to MongoDB Atlas", err);
});

mongoose.connection.on("error", err => {
    console.log(`[x] MongoDB Atlas Connection Error: ${err}`);
});

// Init express
const app = express();

// View engine setup
app.set("port", config.server.port);
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "jade");
app.use(express.json())
app.use(config.server.publicUrl, express.static(config.server.public))
console.log("[>] Express server initialized.");

// Init API routing
for (const router of config.server.routers) {
  console.log(`\t > (${router.module}) -> {${router.url}}`);
  app.use(router.url, require(router.module));
}
console.log("[>] Express routers initialized."); 

// Start server
var server = http.createServer(app);

server.listen(app.get("port"), () => {
  console.log("[>] Server running on port: " + config.server.port);
  console.log("━━━━━━━━━━━━━━━━━━━ Runtime logs ━━━━━━━━━━━━━━━━━━━");
});