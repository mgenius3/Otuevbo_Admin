export function cutString(str, length) {
  // Split the string into an array of words
  const words = str.split(/\s+/);

  console.log(str.length);
  // Check if the number of words is greater than 10
  if (str.length > length) {
    // Splice the array to keep only the first 10 words
    const cutWords = str.slice(0, length);
    console.log(cutWords);

    // // Join the words back into a string
    // const cutString = cutWords.join(' ');
    // console.log(cutString);
    return cutWords + '...'; // Add ellipsis to indicate that the string was cut
  }

  console.log(words.length, length);
  // If the number of words is 10 or fewer, return the original string
  return str;
}
