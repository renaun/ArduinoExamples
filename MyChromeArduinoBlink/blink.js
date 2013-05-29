var connectionId = -1;
var readBuffer = "";

function setPosition(position) {
  var buffer = new ArrayBuffer(1);
  var uint8View = new Uint8Array(buffer);
  uint8View[0] = position;
  chrome.serial.write(connectionId, buffer, function() {});
};

function onRead(readInfo) {
  var uint8View = new Uint8Array(readInfo.data);
  var value = String.fromCharCode(uint8View[0]);
    
  if (value == "a") // Light on and off
  {
      console.log("CMD[a]: " + readBuffer);
      var opat = isNaN(parseInt(readBuffer)) ? 0 : parseInt(readBuffer);
      
      document.getElementById('image').style.opacity = (opat* 0.7) + 0.3;
      readBuffer = "";
  }
  else if (value == "b") // Return blink length value
  {
      readBuffer = "";
  }
  else if (value == "c") // Blink Count
  {
      console.log("CMD[c]: " + readBuffer);
      document.getElementById('blinkCount').innerText = readBuffer;
      readBuffer = "";
  }
  else
  {
    
    readBuffer += value;
  }
  // Keep on reading.
  chrome.serial.read(connectionId, 1, onRead);
};

function onOpen(openInfo) {
  connectionId = openInfo.connectionId;
  console.log("connectionId: " + connectionId);
  if (connectionId == -1) {
    setStatus('Could not open');
    return;
  }
  setStatus('Connected');

  setPosition(0);
  chrome.serial.read(connectionId, 1, onRead);
};

function setStatus(status) {
  document.getElementById('status').innerText = status;
}

function buildPortPicker(ports) {
  var eligiblePorts = ports.filter(function(port) {
    return !port.match(/[Bb]luetooth/) && port.match(/\/dev\/tty/);
  });

  var portPicker = document.getElementById('port-picker');
  eligiblePorts.forEach(function(port) {
    var portOption = document.createElement('option');
    portOption.value = portOption.innerText = port;
    portPicker.appendChild(portOption);
  });

  portPicker.onchange = function() {
    if (connectionId != -1) {
      chrome.serial.close(connectionId, openSelectedPort);
      return;
    }
    openSelectedPort();
  };
}

function openSelectedPort() {
  var portPicker = document.getElementById('port-picker');
  var selectedPort = portPicker.options[portPicker.selectedIndex].value;
  chrome.serial.open(selectedPort, onOpen);
}

onload = function() {

  document.getElementById('position-input').onchange = function() {
    setPosition(parseInt(this.value, 10));
  };

  chrome.serial.getPorts(function(ports) {
    buildPortPicker(ports)
    openSelectedPort();
  });
};
