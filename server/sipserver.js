//Need to set a verified email
//Meteor.users.update({"emails.address": "adminemail@someplace.com"}, {$set: {"emails.0.verified": true}})


Meteor.methods({
  "sip-workflow/setBilling": function (cartid) {
    check(cartid, String)
	var shipping = [
		{
			"shipmentQuotes" : [
				{
					"carrier" : "Flat Rate",
					"method" : {
						"name" : "Free",
						"label" : "Free Shipping",
						"group" : "Ground",
						"enabled" : true,
						"rate" : 0,
						"validLocales" : [
							{
								"deliveryBegin" : 2,
								"deliveryEnd" : 7
							}
						],
						"validRanges" : [
							{
								"begin" : 50
							}
						],
						"_id" : "8c7aJnqxHugCzayA6",
						"handling" : 0
					},
					"rate" : 0,
					"shopId" : "J8Bhq3uTtdgwZx3rz"
				},
				{
					"carrier" : "Flat Rate",
					"method" : {
						"name" : "Standard",
						"label" : "Standard",
						"group" : "Ground",
						"enabled" : true,
						"rate" : 2.99,
						"validLocales" : [
							{
								"deliveryBegin" : 2,
								"deliveryEnd" : 7
							}
						],
						"_id" : "PL2JNihodnbizbeDb",
						"handling" : 0
					},
					"rate" : 2.99,
					"shopId" : "J8Bhq3uTtdgwZx3rz"
				},
				{
					"carrier" : "Flat Rate",
					"method" : {
						"name" : "Priority",
						"label" : "Priority",
						"group" : "Priority",
						"enabled" : true,
						"rate" : 6.99,
						"validLocales" : [
							{
								"deliveryBegin" : 1,
								"deliveryEnd" : 3
							}
						],
						"_id" : "RCirf7xRARJQQ6uLr",
						"handling" : 0
					},
					"rate" : 6.99,
					"shopId" : "J8Bhq3uTtdgwZx3rz"
				}
			],
			"_id" : "EwKpmFXRc2TZoPLSL",
			"shipmentMethod" : {
				"_id" : "TpSaNAmBbFvjNFLoN"
			},
			"address" : {
				"country" : "US",
				"fullName" : "Full name",
				"address1" : "Address",
				"postal" : "90210",
				"city" : "City",
				"region" : "CA",
				"phone" : "5555555555",
				"isShippingDefault" : true,
				"isBillingDefault" : true,
				"isCommercial" : false,
				"_id" : "ewK25zSuKHypCPrYz"
			}
		}
	]
    ReactionCore.Collections.Cart.update({_id: cartid}, {$set: {"shipping": shipping}})
    ReactionCore.Collections.Cart.update({_id: cartid}, {$set: {"billing": [{"address" : { "country" : "US", "fullName" : "Full name", "address1" : "Address", "postal" : "90210", "city" : "City", "region" : "CA", "phone" : "5555555555", "isShippingDefault" : true, "isBillingDefault" : true, "isCommercial" : false, "_id" : "nCWXyCMfFnFZjbZB5" }, "_id" : "PcGZEsib2G6YkBx84"}]}})
  },
  mainnumber: function (userid) {
    return Meteor.users.findOne({_id: userid}).username
//    return Meteor.users.findOne({_id: userid}).phones[0].phone
  },
  didnumber: function (insecureusername) {
    check (insecureusername, String)
//try {
    var url = 'https://backoffice.voipinnovations.com/Services/APIService.asmx?op=getDIDs'
//    var areacode = Meteor.users.findOne({_id: userid}).phones[0].phone.substr(0,3)
//    var areacode = Meteor.users.findOne({_id: userid}).username.substr(0,3)
console.log('insecureusername is ' + insecureusername)
var areacode = insecureusername.substr(0,3)
console.log("areacode is " + areacode)
    var username = ''
    var password = ''
    var envelope = '<?xml version="1.0" encoding="utf-8"?>' +
                   '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
                   '  <soap:Body>' +
                   '    <getDIDs xmlns="http://tempuri.org/">' +
                   '      <login>' + username + '</login>' +
                   '      <secret>' + password + '</secret>' +
                   '      <state></state>' +
                   '      <lata></lata>' +
                   '      <rateCenter></rateCenter>' +
                   '      <npa>' + areacode + '</npa>' +
                   '      <nxx></nxx>' +
                   '      <tier>0</tier>' +
                   '      <t38></t38>' +
                   '      <cnam></cnam>' +
                   '      <sms></sms>' +
                   '      <network></network>' +
                   '    </getDIDs>' +
                   '  </soap:Body>' +
                   '</soap:Envelope>'
    response =  HTTP.call("POST", url, {content: envelope, headers: {'Content-Type': 'text/xml'}})
    var result = xml2js.parseStringSync(response.content)["soap:Envelope"]["soap:Body"][0].getDIDsResponse[0].getDIDsResult[0]
    if (result.responseCode == 100) {
      var didsuggestion = result.DIDLocators[0].DIDLocator[0].tn[0]
      return didsuggestion
    } else if (result.responseCode == 101) {
      var informationalresponse = result
      return result.responseMessage
      return "result was " + Object.keys(result)
    } else if (result.responseCode == 902) {
      return "error 902: " + result.responseMessage
    } else {
      return "guru meditation: " + result.responseCode
    }
  },
})
