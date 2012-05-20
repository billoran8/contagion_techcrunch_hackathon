package com.contagion.hackathon

class DeviceService {

    static transactional = false
	
	def registerDevice(String deviceId) {
		
		if (deviceId == null) {
			throw new Exception("needs device id to register")
		}
		
		Device device = Device.findByDeviceId(deviceId)
		
		if (device == null) {
			device = new Device(deviceId: deviceId)
			device.save()
		}
		
		device	
	}
	
	
}
