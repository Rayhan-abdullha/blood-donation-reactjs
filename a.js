let text = "Need A+ blood in Dhaka urgently";  
const bloodRegex = /(AB\+|A\+|B\+|O\+|AB-|A-|B-|O-)/i;

  // Location list
  const locations = ["Rangpur", "Dhaka", "Chittagong"];

  // Extract blood group
  const bloodMatch = text.match(bloodRegex);
  const bloodGroup = bloodMatch ? bloodMatch[0].toUpperCase() : null;

  // Extract location
  let foundLocation = null;
  for (let loc of locations) {
    if (text.toLowerCase().includes(loc.toLowerCase())) {
      foundLocation = loc;
      break;
    }
}
console.log("Extracted Blood Group:", bloodGroup);