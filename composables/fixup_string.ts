export const fixup_category_name = function (category_name: string) {
    const words = category_name.split('_');

    // Capitalize the first letter of each word
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));

    // Join the capitalized words with a space
    const formattedString = capitalizedWords.join(' ');

    return formattedString;
};
