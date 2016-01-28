var express = require("express");
var moment = require("moment");
var app = express();

app.use(express.static('public'));

app.get('/:time', function (request, response) {
    var rawTime = request.params.time;
    var date;
    
    if ( Number.isInteger(parseInt(rawTime)) ) {
        date = new Date(rawTime*1000); 
    } else {
        date = new Date(rawTime);
    }
    
    response.send(JSON.stringify({
        unix: date.getTime() / 1000,
        natural: moment(date).format('MMMM D, YYYY') === 'Invalid date' ? null : moment(date).format('MMMM D, YYYY')
    }));
});

app.get('/', function (request, response) {
    response.sendfile('index.html');
})

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function () {
    console.log('listening');
});