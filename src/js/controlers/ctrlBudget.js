export const formatNombre = function (nombre, type) {
	let num, numSplit, entier, decimal
	num = Math.abs(nombre)
	num = num.toFixed(2)
	numSplit = num.split('.')
	entier = numSplit[0]
	decimal = numSplit[1]
	if (entier.length > 3) {
		entier = entier.substr(0, entier.length - 3) + ' ' + entier.substr(entier.length - 3, 3)
	}
	return (type === 'dep' ? '-' : '+') + ' ' + entier + '.' + decimal
}