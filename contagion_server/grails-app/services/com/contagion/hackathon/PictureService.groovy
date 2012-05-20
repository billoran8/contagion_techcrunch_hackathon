package com.contagion.hackathon

class PictureService {

    static transactional = true
	
	def deviceService
	
	def createPicture(Map data) throws Exception {
		
		if (data.id == null) {
			throw new Exception("needs photo id")
		}
		
		if (data.deviceId == null) {
			throw new Exception("needs device id")
		}
		
		String url = "http://stat.mobli.com/media_stills/media_${data.id}.jpg"

		Picture picture = Picture.findByUrl(url)
	
		if (picture == null) {
			picture = new Picture(
				url: url
				)
			
			picture.save()
			
			Device device = deviceService.registerDevice(data.deviceId)
			device.save()
			
			picture.device = device
			
		}
		
		picture
		
	}
	
	def getPictures(def data) throws Exception {
		
		if (data.time == null) {
			data.time = new Date().time
		}
		
		List pictures = Picture.findAllByDateCreatedBetween(new Date(data.time - 3000), new Date(data.time + 3000))
		
		if (pictures == null) {
			pictures = []
		}
		
		pictures
	}
	
}
