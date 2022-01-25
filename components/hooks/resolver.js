
function resolver(salt, scrambledeggs) {
	const standardize = (text) => text.split("").map((c) => c.charCodeAt(0));
	const harmonize = (code) => standardize(salt).reduce((a, b) => a ^ b, code);
	return scrambledeggs
	  .match(/.{1,2}/g)
	  .map((hex) => parseInt(hex, 16))
	  .map(harmonize)
	  .map((charCode) => String.fromCharCode(charCode))
	  .join("");
  };
  
  export default resolver;