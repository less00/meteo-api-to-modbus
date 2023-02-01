const modbusAdress = {
    "air.absolutePressure": 0,
    "air.dewPoint": 2,
    "air.relativeHumidity": 4,
    "air.temperature": 6,
    "alert.fog": 8,
    "alert.ice": 10,
    "alert.skid": 12,
    "alert.wind": 14,
    "precipitation.intensity": 16,
    "precipitation.visibility": 18,
    "precipitation.wmo": 20,
    "surface.freezingTemperature": 22,
    "surface.roadTemperature": 24,
    "surface.state": 26,
    "surface.waterThickness": 28,
    "wind.averageDirection": 30,
    "wind.averageSpeed": 32,
    "wind.maximumDirection": 34,
    "wind.maximumSpeed": 36
}

const modbusValue = {
    "Dry": 1,
    "MoistAndChemical": 2,
    "Moist": 3,
    "Wet": 4,
    "PossibleFrost": 5,
    "WetAndChemical": 6,
    "Frost": 7,
    "Snow": 8,
    "Ice": 9,
    "SnowOrIce": 10,
    "CriticallyWet": 11,
    "Slush": 12,
    "Undefined": 13,
    "Error": 14,
    "Unknown": 15,
    "False":16
}

module.exports.modbusAdress = modbusAdress
module.exports.modbusValue = modbusValue