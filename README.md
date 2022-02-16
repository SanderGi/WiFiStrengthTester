# WiFiStrengthTester
A simple program with GUI to display the RSS in dBm of available networks. Contains functionality for averaging the RSS values over given time intervals.

## Recommended Installation Instructions (coming soon)
Go to the Microsoft Store and [install the program](https://www.microsoft.com/store/apps/9N3BV3RVGXDV). The application is currently still under review.

Make sure you have Edge, Chrome, and/or Chromium installed since the application use them to render the UI.

## Secondary Installation Instructions
* Download the installer (WiFi Strength Tester-x64.msix) from GitHub (can be found under Code or in Releases)
* To install the msix package you must add the package cert to the list of local machine trusted Certificate Authorities**
  1.	Right Click and select properties on the downloaded msix package
<br> ![image](https://user-images.githubusercontent.com/97496861/153541132-3f05b208-38af-4ac1-bc17-5b01214db9be.png)
  2.	On the properties tab, click Unblock and then click Apply.
  3.	On the Digital signatures tab, select the TestCert and Click Details.
<br> ![image](https://user-images.githubusercontent.com/97496861/153541341-997b87c2-5cec-486d-bbb3-43e43f7b936a.png)
  4.	Click  View Certificate
<br> ![image](https://user-images.githubusercontent.com/97496861/153541465-326f674c-50f9-4e92-ad10-9325009f14eb.png)
  5.	Click Install Certificate
<br> ![image](https://user-images.githubusercontent.com/97496861/153541485-163f3e5f-635b-46f0-8595-d334ef20cb1e.png)
  6.	Select Local Machine and Click Next*
<br> ![image](https://user-images.githubusercontent.com/97496861/153541501-a6f7b661-2cc2-4ddf-b6ff-06b36321c39e.png)
  7.	Click Yes in the User Account Control dialog
  8.	Click Place all certificates in the following store, click Browse
<br> ![image](https://user-images.githubusercontent.com/97496861/153541521-d1b59c22-2b3d-4ac5-a36d-04ec87f7ab43.png)
  9.	Select Trusted Root Certification Authorities and click OK.
<br> ![image](https://user-images.githubusercontent.com/97496861/153541561-eb5a8fe4-9dbc-445e-91fe-5f431d0fdefc.png)
  10.	Click Next
<br> ![image](https://user-images.githubusercontent.com/97496861/153541587-05aaa711-3791-4104-b29f-07884588e2c3.png)
  11.	Click Finish
<br> ![image](https://user-images.githubusercontent.com/97496861/153541613-0fa8b256-d3d1-4220-9255-5d118abdff7d.png)
  12.	Click OK to the dialog saying the import was successful.
<br> ![image](https://user-images.githubusercontent.com/97496861/153541646-5d1a0c77-6cc3-4e31-9a06-66aa48c945ec.png)
* Double click on the installer file and follow the instructions to install the application.
* At the end of the installer you can launch the WifiTester, or you can open the app from the start menu
<br> ![image](https://user-images.githubusercontent.com/97496861/153541679-70417363-6218-441c-b1d6-ed196ef11d23.png)
* Click Collect Data
<br> ![image](https://user-images.githubusercontent.com/97496861/153541702-aa14acb7-c2ed-40ff-96ac-5d015b3fa136.png)

\**You only need to do this once the first time you install one of my executables. I can't afford to buy an official certificate to sign the application, so bear with me on this one lol

## Alternative Download Options
1. Download the WiFiStrengthTester zipfile, unzip it, and run the app.exe file inside it
2. Download the single file app.exe and disable your antivirus lol
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

## Common Errors
* WinError 10048--Only one usage of each socket adress/port is normally permitted <br>
![issue 1589](https://user-images.githubusercontent.com/97496861/153745320-9edf044e-ecd8-40b6-8468-4f4c31f05915.png) <br>
**Fix:** You have some sort of unterminated process running on the port that WiFiTester uses (8080). Find it and kill it or compile the source code with a different port set in app.py

## Changelog
Updating using the msix installer is easy, you just download and run the new installer (no need to uninstall the program first).
### v1.0.1
- Removed extraneous entries in the data table for clarity
- Rounded mean RSS to the nearest integer to adhere to sig figs
- Disables the Collect Data! button when scanning to avoid multiple scans being started concurrently
- Changed the default Trial Count to 15 to get more complete scans for poorer connections
- UI improvements (drop-down to select available ssids, empty text boxes display a discription of what they do)
- Uses port 8080 exclusively
### v1.0.0
- Basic RSS reading capabilities
- Basic averaging functionality (mean, range, completed scans)
- Basic UI (control panel, data table)
- Logo's and other neat stuff
- Uses port 8000 (possibly 8080)
