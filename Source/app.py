import eel
from wlanapiWrapper import get_BSSI
import time

eel.init('web')

@eel.expose
def collectWifiData(times, waittime):
    for i in range(0,times):
        eel.sleep(waittime)
        eel.displayWifiData(i, str(get_BSSI()))

eel.start('index.html', size=(1024, 768), position=(0,0))