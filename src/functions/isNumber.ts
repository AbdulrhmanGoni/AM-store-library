export default function isNumber(n: string | number) {
    return !isNaN(parseInt(`${n}`))
}