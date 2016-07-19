// 1. get zip codes from user
// 2. format user input to make an array of zip codes to feed to the api
// 3. Make api call, make an array or object to pass to the map, with each individual zip code's cord array
// 4. draw each zip code
// init() -> getZips() -> getCordsFromApi() -> drawOntoMap()

var scope = {}
    /*config defaults*/
scope.mapConfig = {
    mapSelector: "#map",
    zoom: 12,
    center: {
        lat: 39.7456423,
        lng: -104.9923426
    },
    mapTypeId: google.maps.MapTypeId.TERRAIN,
    strokeColor: 'gold',
    strokeOpacity: 1,
    strokeWeight: '5px',
    fillColor: 'black',
    fillOpacity: 1
}

function getCordsFromApi(arrayOfZipCodesFromUser) {
    //this is the object we're gonna return
    var coOrdsFromApi = {}

    //actually make the ajax call, takes individual zip codes
    function callApi(zipCode) {
        $.ajax({
                type: 'GET',
                url: 'http://boundaries.io/geographies/postal-codes?search=' + zipCode,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept-Encoding': 'gzip, deflate, sdch',
                    'Accept': 'application/json, text/javascript, */*; q=0.01'
                }

            })
            //if it works
            .success(response) {
                coOrdsFromApi.zipCode = proccessApiResponse(response);
            }
    }

    //take the dumb ass response and pull the coords for drawing out of it.
    function proccessApiResponse(response) {
        //return this when done
        var formatedCords = [];
        //reponse object where the coords are kept
        var responseCoords = d[0]['geometry']['coordinates'];

        //uhhhh this is copied from the protoype, needs to actually work.
        for (var i = 0; i < responseCoords.length; i++) {
            for (var k = 0; k < responseCoords[i].length; k++) {
                if (responseCoords.length > 1) {
                    for (var m = 0; m < responseCoords[i].length; m++) {
                        formatedCords.push({
                            lat: responseCoords[i][k][m][1],
                            lng: responseCoords[i][k][m][0]
                        });
                    }
                } else {
                    formatedCords.push({
                        lat: responseCoords[i][k][1],
                        lng: responseCoords[i][k][0]
                    });
                }

            }
        }

        //should just be a big old array full of {lat: 11111, lng: 22222}
        return formatedCords
    }

    //lets take our array of zip codes and call the api for each one.
    for (var i = 0; i < arrayOfZipCodesFromUser.length; i++) {
        callApi(arrayOfZipCodesFromUser[i]);
    }

    return coOrdsFromApi //something like this {'11111': [ {lat:222222, lng:33333}, {lat:222223, lng:33334} ]   } 
}

//get value from a form field and turn it into a list we can use
function getZips() {
    var userInputZipCodes = /*get value from a form field*/
        var arrayOfZipCodesFromUser = []; //array of ints or strings we return

    //comma, semi colon or newline delinated list
    function getZipCodes(userInputZipCodes) {
        arrayOfZipCodesFromUser.push( /*something goes in here*/ )
    }

    return arrayOfZipCodesFromUser
}

//actually draw it now
function drawOntoMap(coOrdsFromApi) {

    for (zips in coOrdsFromApi) {
        //draw

        /*placeholder*/
       var newPoints = new google.maps.Polygon({
            paths: zips, // This comes from the coOrdsFromApi object
            strokeColor: scope.mapConfig.strokeColor,
            strokeOpacity: scope.mapConfig.strokeOpacity,
            strokeWeight: scope.mapConfig.strokeWeight,
            fillColor: scope.mapConfig.fillColor,
            fillOpacity: scope.mapConfigfillOpacity
        });
    }
}

function init(config) {
    //set everything up???
    //show google map?   
    //config  

    /*placeholder*/
    //use jquery or force map to have an id or class?
    map = new google.maps.Map($(scope.mapConfig.mapSelector)[0], {
        zoom: scope.mapConfig.zoom,
        center: scope.mapConfig.center,
        mapTypeId: scope.mapConfig.mapTypeId

    });
}


init();
