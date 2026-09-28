// Mirrors utils/translationHelper.js on the backend exactly — these are
// the only English string values the server's gender/country/ethnicity
// maps recognize. Anything else round-trips as-is (translateProfileFields
// falls back to the raw value when a key isn't found), which would
// silently break the Arabic display instead of erroring, so it's worth
// keeping this list in sync with the backend rather than inventing one.
export const GENDERS = ["Male", "Female"] as const;

export const ETHNICITIES = [
  "Asian or Pacific Islander",
  "Black or African American",
  "Hispanic or Latino",
  "Native American or Alaskan Native",
  "White or Caucasian",
  "Multoracial or Biracial",
  "A race/ethnicity not listed here",
] as const;

export const COUNTRIES = [
  "Afghanistan", "Åland Islands", "Albania", "Algeria", "American Samoa", "Andorra", "Angola",
  "Anguilla", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Ascension Island",
  "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados",
  "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia",
  "Bosnia and Herzegovina", "Botswana", "Brazil", "British Indian Ocean Territory",
  "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia",
  "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad",
  "Chile", "China", "Christmas Island", "Colombia", "Comoros", "Democratic Republic Congo",
  "Republic of Congo", "Cook Islands", "Costa Rica", "Côte d'Ivoire", "Croatia", "Cuba",
  "Curaçao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Egypt",
  "Dominican Republic", "Luxembourg", "Macau", "North Macedonia", "Madagascar", "Malawi",
  "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania",
  "Mauritius", "Mayotte", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia",
  "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar [Burma]", "Namibia", "Nauru",
  "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria",
  "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard and Jan Mayen", "Sweden", "Switzerland",
  "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tokelau", "Tonga",
  "Trinidad/Tobago", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu",
  "U.S. Virgin Islands", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
  "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
  "Wallis and Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe",
] as const;
