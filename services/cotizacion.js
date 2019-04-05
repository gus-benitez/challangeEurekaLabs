'use strict'
const axios = require('axios')

const { config } = require('../config/index')

function getCotizDate (array) {
  const valCotiz = array[1]
  for (const posAux2 in valCotiz) {
    if (posAux2 === '4. close') {
      return valCotiz[posAux2]
    }
  }
}

const getCotization = async (query) => {
  const { companyCode } = query
  const jsonResponse = {}

  const response = await axios.get('https://www.alphavantage.co/query', {
    params: {
      function: 'TIME_SERIES_DAILY',
      symbol: companyCode,
      apikey: config.apikey
    }
  })

  for (const posAux1 in response.data) {
    if (posAux1 === 'Time Series (Daily)') {
      const arrayCotizByDate = Object.entries(response.data[posAux1])

      // Buscamos la cotización para la fecha actual
      const arrayCotizToday = arrayCotizByDate[0]
      const cotizToday = getCotizDate(arrayCotizToday)

      // Buscamos la cotización de cierre anterior
      const arrayCotizPrevious = arrayCotizByDate[1]
      const cotizPrevious = getCotizDate(arrayCotizPrevious)

      // Preparamos la respuesta
      const diffCotiz = (cotizToday - cotizPrevious).toFixed(4)
      let diffCotizPerc = ((1 - diffCotiz) / cotizPrevious * 100)
      diffCotizPerc = Math.round(diffCotizPerc * 100) / 100
      diffCotizPerc = Math.abs(diffCotizPerc)

      jsonResponse.symbol = companyCode
      jsonResponse.value = cotizToday
      jsonResponse.previous = cotizPrevious
      jsonResponse.change_percent = diffCotizPerc
      jsonResponse.change_value = diffCotiz
      jsonResponse.color_code = diffCotiz < 0 ? 'red' : 'green'
    }
  }

  return jsonResponse
}

module.exports = getCotization
