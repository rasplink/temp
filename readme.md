> An IOT project for displaying Temperature and Humidity `wirelessly`

### Requirements:
- Hardware:
    - A raspberry pi (used: v4 model B)
    - Power bank (5V, 3A) for raspberry pi 4 or a charger with the same current and voltage
    - DHT22 Temperature and Humidity sensor
    - Jumper wires
    - Constant resistor min: 220 ohm

- Software:
    - Any code editor (used: vs code)
    - python3 
    - pip3 

### Setting up the pi with os and configs
- download [Raspberry Pi Imager](https://www.raspberrypi.com/software/)
- add your configs including your wifi network in the Imager settings
- after booting the os on the pi it should be connected automatically on your wifi network

### Wiring
- connect GIO pin 4 (Physical pin 7) of raspberry pi with the const resistor and then connect that const resistor to data pin of DHT22 sensor (GPIO4-->resistor-->sensor)
- connect the 3.3v pin of raspberry pi to +ve pin of sensor
- connect any gnd pin of raspberry pi to -ve pin of sensor
- plug-in the 5v 3a power bank/charger to the pi


### Connecting to PI via ssh
- open your terminal and run `ssh userName@xxx.xxx.x.xx` (replace userName with pi userName and xxx with pi ip)
- copy this project to pi via `scp -r path/to/project piUserName@piIp:path/to/desired/dir/on/pi
`

### Installing python3 modules on the PI

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install python3-dev python3-pip

python3 -m pip install --upgrade pip setuptools wheel
pip3 install adafruit-circuitpython-dht
pip3 install multiprocess
pip3 install websockets
```
> This is the [current working adafruit](https://github.com/adafruit/Adafruit_CircuitPython_DHT) module for DHT22


#### Development server 
```bash
python3 index.py
```

