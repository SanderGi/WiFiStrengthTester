# WiFiStrengthTester
A simple program with GUI to display the RSS in dBm of available networks. Contains functionality for averaging the RSS values over given time intervals.

## Download Options
1. Download the WiFiStrengthTester zipfile, unzip it, and run the app.exe file inside it
2. Alternatively, download the single file app.exe and disable your antivirus lol
3. Download the Source folder, make sure python 3.x.x and the necessary dependencies are installed, and run app.py

## Application notes
* Reads the RSS values directly using the Windows wlanapi.dll instead of deriving it from the signal quality (%)
* When multiple access points (BSSIDs) exist for the same SSID, the strongest connection is taken as measurement
* Occasionally a trial will not get a reading because new WiFi data is not available (this is potentially due to the routers not responding to too many requests in a short time frame). Connecting to the network being measured and keeping the sample rate (trials per time interval) low can lead to more complete scans
* Python spins up a webserver on localhost which talks to the electron app frontend (js, html, css) so having chrome or chromium installed is recommended

## Demo images
If correctly installed it should look something like this:
![image](https://user-images.githubusercontent.com/97496861/153332885-59c45192-06fa-4b46-a74b-d135fa4ca40b.png)
