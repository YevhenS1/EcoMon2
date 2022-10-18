const mysql   = require('mysql');
const express = require("express");
const hbs = require("hbs");
const app = express();

app.use(express.static('public'));




app.set("view engine", "hbs");


const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Bodyspray345#',
    database : 'EcoMonitoring1'
});

connection.connect(function(err){
    if (err) {
        return console.error("Error-connect: " + err.message);
    }
    else{
        console.log("Connection to MySQL OK!");
    }
});



let AirPollutionLoad =  0;
let WAObjectsLoad  = 0;
let AirPollutantLoad = 0;
let WaterPollutionLoad = 0;
let WaterPollutantLoad = 0;
let SolidPollutantLoad = 0;
let SolidPollutionLoad = 0;
let RadioactivePollutantLoad = 0;
let RadioactivePollutionLoad = 0;
app.get("/", function(req, res){


    connection.query("SELECT * FROM AirPollution", function(err, data) {
        if(err) return console.log(err);
        AirPollutionLoad  = data
    });
    connection.query("SELECT * FROM WaterPollution", function(err, data8) {
        if(err) return console.log(err);
        WaterPollutionLoad  = data8
    });
    connection.query("SELECT * FROM WaterPollutant", function(err, data9) {
        if(err) return console.log(err);
        WaterPollutantLoad  = data9
    });

    connection.query("SELECT * FROM Objects", function(err, data2) {
        if(err) return console.log(err);
        WAObjectsLoad  = data2
    });

    connection.query("SELECT * FROM SolidPollutant", function(err, data4) {
        if(err) return console.log(err);
        SolidPollutantLoad  = data4
    });

    connection.query("SELECT * FROM SolidPollution", function(err, data5) {
        if(err) return console.log(err);
        SolidPollutionLoad  = data5
    });
    connection.query("SELECT * FROM RadioactivePollutant", function(err, data6) {
        if(err) return console.log(err);
        RadioactivePollutantLoad  = data6
    });
    connection.query("SELECT * FROM RadioactivePollution", function(err, data7) {
        if(err) return console.log(err);
        RadioactivePollutionLoad  = data7
    });

    connection.query("SELECT * FROM AirPollutant", function(err, data1) {
        if(err) return console.log(err);
        AirPollutantLoad = data1
        res.render("index.hbs", {

            AirPollution: AirPollutionLoad,
            AirPollutant: AirPollutantLoad,
            Objects : WAObjectsLoad,
            SolidPollutant : SolidPollutantLoad,
            SolidPollution : SolidPollutionLoad,
            RadioactivePollutant : RadioactivePollutantLoad,
            RadioactivePollution : RadioactivePollutionLoad,
            WaterPollutant : WaterPollutantLoad,
            WaterPollution : WaterPollutionLoad



        });

    });


});


hbs.registerHelper("AirPollutionTable", function(a, b, c){
    let result="";
    let tax;

        for(let i = 0; i < WAObjectsLoad.length; i++){
            if(a == WAObjectsLoad[i].ID){
                result += `<td class = "cell">${WAObjectsLoad[i].ObjectName} </td>`;
            }
        }

        for(let i = 0; i < AirPollutantLoad.length; i++){
            if(b == AirPollutantLoad[i].ID){
                result += `<td class = "cell">${AirPollutantLoad[i].PollutantName} </td>`;
                result += `<td class = "cell">${c} </td>`;
                result += `<td class = "cell">${AirPollutantLoad[i].Tax} </td>`;
                 tax = AirPollutantLoad[i].Tax * c;
                tax  = tax.toFixed(2);
                result += `<td class = "cell"> ${tax} </td>`;
            }
        }
    return new hbs.SafeString(`<tr class="row">${result}</tr>`);

});

hbs.registerHelper("WaterPollutionTable", function(a, b, c){
    let result="";
    let tax;
    for(let i = 0; i < WAObjectsLoad.length; i++){
        if(a == WAObjectsLoad[i].ID){
            result += `<td class = "cell">${WAObjectsLoad[i].ObjectName} </td>`;
        }
    }

    for(let i = 0; i < WaterPollutantLoad.length; i++){
        if(b == WaterPollutantLoad[i].ID){
            result += `<td class = "cell">${WaterPollutantLoad[i].PollutantName} </td>`;
            result += `<td class = "cell">${c} </td>`;
            result += `<td class = "cell">${WaterPollutantLoad[i].Tax} </td>`;
            tax = WaterPollutantLoad[i].Tax * c;
            tax  = tax.toFixed(2);
            result += `<td class = "cell"> ${tax} </td>`;
        }
    }
    return new hbs.SafeString(`<tr class="row">${result}</tr>`);

});

    hbs.registerHelper("SolidPollutionTable", function (a, b, c) {
        let result = "";
        let tax ;

        for (let i = 0; i < WAObjectsLoad.length; i++) {
            if (a == WAObjectsLoad[i].ID) {
                result += `<td class = "cell">${WAObjectsLoad[i].ObjectName} </td>`;
            }
        }

        for (let i = 0; i < SolidPollutantLoad.length; i++) {
            if (b == SolidPollutantLoad[i].ID) {
                result += `<td class = "cell">${SolidPollutantLoad[i].PollutantName} </td>`;
                result += `<td class = "cell">${c} </td>`;
                result += `<td class = "cell">${SolidPollutantLoad[i].Tax} </td>`;
                switch(SolidPollutantLoad[i].HazardClass){
                    case 1:
                        tax = SolidPollutantLoad[i].Tax * c;
                        break;
                    case 2 :
                        tax = SolidPollutantLoad[i].Tax * c;
                        break;
                    case 3 :
                        tax = SolidPollutantLoad[i].Tax * c;
                        break;
                    case 4 :
                        tax = SolidPollutantLoad[i].Tax * c;
                        break;
                }
                if(SolidPollutionLoad[i].Distance < 3){
                    tax = tax * 3;
                }

                tax  = tax.toFixed(2);
                result += `<td class = "cell"> ${tax} </td>`;
            }
        }


        return new hbs.SafeString(`<tr class="row">${result}</tr>`);

    });

hbs.registerHelper("RadioactivePollutionTable", function (a, b, d) {
    let result = "";
    let String = "";
    let tax;

    for(let i = 0; i < WAObjectsLoad.length; i++){
        if (a == WAObjectsLoad[i].ID) {
            result += `<td class = "cell">${WAObjectsLoad[i].ObjectName} </td>`;
        }
    }

    for (let i = 0; i < RadioactivePollutantLoad.length; i++) {
        if (b == RadioactivePollutantLoad[i].ID) {
            result += `<td class = "cell">${RadioactivePollutantLoad[i].PollutantName} </td>`;
            result += `<td class = "cell">${d} </td>`;
            if(RadioactivePollutantLoad[i].WasteCategory == 1){
                String = "Високоактивні";
                result += `<td class = "cell">${String} </td>`;
            }else{
                String = "Низькоактивні";
                result += `<td class = "cell">${String} </td>`;
            }

            result += `<td class = "cell">0,0133 * ${RadioactivePollutantLoad[i].TaxCoefStorage} </td>`;
            tax = 0.0133 * RadioactivePollutantLoad[i].TaxCoefStorage * d;
            tax  = tax.toFixed(2);
            result += `<td class = "cell"> ${tax} </td>`;

        }
    }

    return new hbs.SafeString(`<tr class="row">${result}</tr>`);
});

hbs.registerHelper("RadioactivePollutionTable1", function (a, b, c, d) {
    let result = "";
    let tax;
    for(let i = 0; i < WAObjectsLoad.length; i++){
        if (a == WAObjectsLoad[i].ID) {
            result += `<td class = "cell">${WAObjectsLoad[i].ObjectName} </td>`;
        }
    }


    for (let i = 0; i < RadioactivePollutantLoad.length; i++) {
        if (b == RadioactivePollutantLoad[i].ID) {
            result += `<td class = "cell">${RadioactivePollutantLoad[i].PollutantName} </td>`;
            result += `<td class = "cell">${c} </td>`;
            result += `<td class = "cell">${d} </td>`;

            result += `<td class = "cell">${RadioactivePollutantLoad[i].TaxCoefProd} </td>`;
            tax = RadioactivePollutantLoad[i].TaxCoefProd * c * RadioactivePollutionLoad[i].CalendarQuarter;
            tax  = tax.toFixed(2);
            result += `<td class = "cell"> ${tax} </td>`;
        }
    }


    return new hbs.SafeString(`<tr class="row">${result}</tr>`);
});




const port = 3307;
app.listen(port, () =>
    console.log(`App listening on port ${port}`)
);