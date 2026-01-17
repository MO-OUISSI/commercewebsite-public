/**
 * Formats price for display with currency and optional marketing effect.
 * @param {number|string} price - The original price.
 * @param {boolean} useMarketing - Whether to apply the marketing effect (e.g., 300 -> 299).
 * @returns {string} - Formatted price string.
 */
export const formatDisplayPrice = (price, useMarketing = false) => {
    if (price === undefined || price === null || price === '') return '';

    let displayValue = Number(price);

    // Marketing effect: 300 -> 299 (subtract 1 for whole numbers)
    if (useMarketing && Number.isInteger(displayValue) && displayValue > 0) {
        displayValue -= 1;
    }

    return `${displayValue} dh`;
};
