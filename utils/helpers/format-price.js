const formatPrice = (_num, _decimals) => {
    let price = _num / `1e${_decimals}`

    const USformatedPrice = Intl.NumberFormat("en-US", { style: "decimal" })
    return USformatedPrice.format(price.toFixed(2))
}

module.exports = formatPrice
