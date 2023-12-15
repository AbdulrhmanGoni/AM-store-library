export default function applyDiscount(price: number, discount: number) {
    if (discount) return price - price * discount;
    else return price;
}
