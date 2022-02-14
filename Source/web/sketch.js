eel.expose(displayWifiData);
function displayWifiData(trial, string) {
    // parse information
    bssids = JSON.parse(string.replaceAll("'","\"").replaceAll("\"b","").replaceAll("\"\"","\""));

    // Write raw data to log
    for (const [key, value] of Object.entries(bssids)) {
        document.getElementById("log").innerHTML += `--${value[0]} (${key}): ${value[1]} dBm <br>`;
    }
    document.getElementById("log").innerHTML += "<br>"

    // Collect ssids
    ssids = {};
    for (const [key, value] of Object.entries(bssids)) {
        if (value[0] in ssids) {
            ssids[value[0]].push(parseInt(value[1]));
        } else {
            ssids[value[0]] = [parseInt(value[1])];
        }
    }

    // format data in table
    document.getElementById('ssids').innerHTML = '<option value="*all*">';
    $('table tr:last').css("border-bottom","2px solid black");
    for (const [ssid, rss] of Object.entries(ssids)) {
        // const average = (array) => array.reduce((a, b) => a + b) / array.length;
        document.getElementById('ssids').innerHTML += '<option value="'+ssid+'">';
        if (ssid != id && id != '*all*') continue;
        let tr = tbody.insertRow();
        let td = tr.insertCell();
        td.appendChild(document.createTextNode(`${trial}`));
        td = tr.insertCell();
        td.appendChild(document.createTextNode(`${ssid}`));
        td = tr.insertCell();
        td.appendChild(document.createTextNode(`${Math.max(...rss)} dBm`));
        td = tr.insertCell();
        td.appendChild(document.createTextNode(`${2 * (Math.max(...rss) + 100)} %`));
    }

    // display important stats
    for (const [ssid, rss] of Object.entries(ssids)) {
        if (id == ssid) {
            count++;
            let rssReading = Math.max(...rss);
            totalRSS += rssReading;
            minRSS = Math.min(rssReading, minRSS);
            maxRSS = Math.max(rssReading, maxRSS);
            let average = Math.round(totalRSS / count);
            document.getElementById("average").innerHTML = `Mean RSS: ${average} dBm`;
            document.getElementById("range").innerHTML = `RSS range: ${minRSS} to ${maxRSS} dBm`;
            document.getElementById("successes").innerHTML = "Complete Scans: " + count;
        }
    }

    // reenable button if all trials are complete
    if (trial == trialcount - 1) {
        document.getElementById("measure").disabled = false;
    }
}

let tbl = document.createElement('table');
let tbody;
function createTable() {
    let thead = tbl.createTHead();
    let row = thead.insertRow();
    let th = document.createElement("th");
    let text = document.createTextNode("Trial#");
    th.appendChild(text);
    row.appendChild(th);
    th = document.createElement("th");
    text = document.createTextNode("SSID (max access-point/bssid)");
    th.appendChild(text);
    row.appendChild(th);
    th = document.createElement("th");
    text = document.createTextNode("RSS (dBm)");
    th.appendChild(text);
    row.appendChild(th);
    th = document.createElement("th");
    text = document.createTextNode("Signal Quality (%)");
    th.appendChild(text);
    row.appendChild(th);
    tbody = tbl.createTBody();
    document.getElementById("trials").appendChild(tbl);
}

createTable();
let id = "alor873uw:#(*ug";
let minRSS = Infinity;
let maxRSS = -Infinity;
let totalRSS = 0;
let count = 0;
let trialcount = 0;
eel.collectWifiData(2, 2) // initial trial to find networks
function collectData() {
    document.getElementById("measure").disabled = true;
    document.getElementById("trials").innerHTML = "<h2>Data Table</h2>";
    tbl = document.createElement('table');
    createTable();
    trialcount = parseInt(document.getElementById("trialcount").value);
    let interval = parseInt(document.getElementById("interval").value);
    id = document.getElementById("ssid").value;
    minRSS = Infinity;
    maxRSS = -Infinity;
    totalRSS = 0;
    count = 0;
    eel.collectWifiData(trialcount, interval / trialcount);
}

let savedVal;
$('#ssid').on('click', function() {
    savedVal = $(this).val();
    $(this).val('');
});