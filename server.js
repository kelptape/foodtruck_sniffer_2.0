const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const app = express();
const db = require("./models");
const twitterWebhook = require('twitter-webhooks');
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }
// Add routes, both API and view
app.use(routes);


//Config for Twitter Webhook	
const webhook = twitterWebhook.userActivity({
  serverUrl: 'https://foodtrucksniffer.herokuapp.com',
route: '/webhook/twitter',	
  consumerKey: process.env.TWITTER_API_KEY,	
  consumerSecret: process.env.TWITTER_API_SECRET,	
  accessToken: process.env.TWITTER_ACCESS_TOKEN,	
  accessTokenSecret: process.env.TWITTER_ACCESS_SECRET,	
  environment: process.env.TWITTER_WEBHOOK_ENV	
});	

 //Checks for registered webhook. Registers & subscribes if none is found.	
webhook.getWebhook().then(data => {	
  if (!data[0].valid) {	
    webhook.register();	
     webhook.subscribe({	
      userId: process.env.TWITTER_USER_ID,	
      accessToken: process.env.TWITTER_ACCESS_TOKEN,	
      accessTokenSecret: process.env.TWITTER_ACCESS_SECRET	
    });	
  }	
});	
 //On Twitter event, update the database with new address.	
webhook.on('event', (event, userId, data) => {	
  const arr = data.text.split('|')[0];	
  const address = arr	
    .split(' ')	
    .slice(1)	
    .join(' ');
    const lat = convertAddressLat(address);
    const lng = convertAddressLong(address);

   db.FoodTruck.update(	
    {	
      address: address,	
      lat: lat,
      long: lng,
      addressUpdated: data.created_at	
    },	
    {	
      where: {	
        twitterId: `@${data.user.screen_name}`	
      }	
    }	
  ).then(udpatedLocation => console.log(udpatedLocation));	
});	
 // Routes	
app.use('/', webhook);


const syncOptions = { force: false };

// Start the API server
db.sequelize.sync(syncOptions).then(() => {
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
});