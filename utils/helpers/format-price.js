const formatPrice = (_num, _decimals) => {
    let price = _num / `1e${_decimals}`
    price.toFixed(2)

    const USformatedPrice = Intl.NumberFormat("en-US", { style: "decimal" })
    return USformatedPrice.format(price)
}

module.exports = formatPrice
