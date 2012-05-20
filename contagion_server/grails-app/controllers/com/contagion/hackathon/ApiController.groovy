package com.contagion.hackathon

import grails.converters.JSON

class ApiController {

	def pictureService

	def uploadPicture = {
		Map response = [
			success: false
			]
		
		try {
			println "UPLOAD PICTURE ${request.json}"
			
			Picture picture = pictureService.createPicture(request.json)
			
			response.picture = picture.data
			response.success = true
		} catch (Exception e) {
			response.message = e.getMessage()
		}
		
		render (response as JSON)
	}
	
	def getPictures = {
		Map response = [
			success: false
		]
		
		try {
			List pictureList = pictureService.getPictures(request.json)
			response.pictures = pictureList
			response.timestamp = new Date().time
			response.success = true
		} catch (Exception e) {
			response.message = e.getMessage()
		}
		
		render (response as JSON)
	}
}
