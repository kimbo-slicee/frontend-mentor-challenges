const ValidationService=(()=> {
     const MAX_SIZE=500;
     const REGEX_PATTERNS={}
    /*check file is more then 500KB*/
    const isValidSize=(file)=>{
        const sizeInKB = (file.size / 1024).toFixed(2);
        return MAX_SIZE >= sizeInKB;
    }
    return {isValidSize};
})();
export default ValidationService;

