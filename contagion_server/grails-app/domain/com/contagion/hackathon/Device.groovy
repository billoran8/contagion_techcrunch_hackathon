package com.contagion.hackathon

class Device {
	
	String deviceId
	
	def hasMany = [
		pictures : Picture
	]
	
	def belongsTo = [
		owner : User	
	]

    static constraints = {
		owner (nullable: true)
		deviceId (unique: true)
    }
}
