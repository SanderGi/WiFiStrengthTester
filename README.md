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

## Why scans don't always complete
"WiFi devices only transmit when they actually have some data or an 802.11 management/control packet to send, and then only after certain channel access conditions have been satisfied. Generally speaking the remainder of the time the radio is either listening to detect a potential new packet to receive, actively attempting to receive a detected packet, or (in the case in a client device) in a power-save state where the radio is temporarily disabled to help conserve the battery" (https://www.quora.com/Do-wifi-devices-non-router-like-laptops-ipads-transmit-a-signal-constantly).
* Here wifi devices refers to both client devices and routers/APs
* In other words, there is not always a signal to measure the strength of
* Instead of caching old values and reusing them, the program simply takes no measurement when the wlanapi.dll has no new information available within the current trial
* To get more complete scans, you can attempt more trials
* Also make sure to be connected to the relevant network

## Demo images
If correctly installed it should look something like this:
![image](https://user-images.githubusercontent.com/97496861/153332885-59c45192-06fa-4b46-a74b-d135fa4ca40b.png)
