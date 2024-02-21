export const converterData = (date: string): string => {
    const objDate = new Date(date.substring(0, 10));

    const dia = objDate.getUTCDate()
    const mes: string = `${(objDate.getUTCMonth() + 1)}`
    const ano = objDate.getUTCFullYear()


    return `${ano}-${mes.padStart(2, '0')}-${dia}`
}