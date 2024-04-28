export default function rangeArray(start: number, end: number) {

    const array = [start];

    for (let i = 0; i < end - start; i++) {
        array.push(start + i + 1)
    }

    return array
}
