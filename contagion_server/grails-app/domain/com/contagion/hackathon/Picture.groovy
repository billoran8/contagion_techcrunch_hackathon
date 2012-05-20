package com.contagion.hackathon

import java.util.Map;

class Picture {
	
	String url
	
	Date dateCreated
	Date lastUpdated
	
	def belongsTo = [
		device: Device
		]
	
	Map getData() {
		[
			url: url,
			dateCreated: dateCreated,
			lastUpdated: lastUpdated	
		]
	}
	
	static transients = [
		"data"
	]

    static constraints = {
		device (nullable: true)
		url (unique: true)
    }
}
