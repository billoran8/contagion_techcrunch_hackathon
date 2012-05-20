import grails.converters.JSON

class ApiFilters {

	def filters = {
		wrapApi(controller: "api", action: "*") {
			before = {
				def body = request?.reader?.text
				println "Incoming API request with body: ${body}"
				if (body != null && body.trim().length() > 0) {
					request.json = JSON.parse(body)
				} else {
					request.json = params
				}

				return true
			}

			afterView = { Exception e ->
				if (e != null) {
					Map response = [
						success: false,
						message: e.getMessage()
					]
					render text: (response as JSON), contentType: "text/json"
					return false
				} else {
					return true
				}
			}
		}
	}
}

