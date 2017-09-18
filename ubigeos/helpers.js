export const replaceQuotes = (str) => str.replace(/(\")/g,'');

export const toLines = (str) => str.split('\n');

export const removeEmptyLines = (lines) => lines.filter( line => line.trim() !== ''); 
