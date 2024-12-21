const salt = 98765; // A secret salt value
const multiplier = 739; // A prime multiplier to create unique patterns
const offset = 1000000; // A large offset to ensure varied output

// Encode the ID
export function encodeId(id: number) {
  const obfuscatedId = (id * multiplier + salt) ^ offset; // Scramble with multiplier, salt, and XOR
  return obfuscatedId.toString(36).split("").reverse().join(""); // Base36 encode and reverse
}

// Decode the ID
export function decodeId(encodedId: string) {
  const reversedId = encodedId.split("").reverse().join(""); // Reverse back
  const obfuscatedId = parseInt(reversedId, 36); // Decode from Base36
  return ((obfuscatedId ^ offset) - salt) / multiplier; // Reverse XOR, subtract salt, and divide by multiplier
}