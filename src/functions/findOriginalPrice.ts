export default function findOriginalPrice(discountedPrice: number, discountPercentage: number) {
    const originalPrice = discountedPrice / (1 - discountPercentage / 100);
    return originalPrice;
}