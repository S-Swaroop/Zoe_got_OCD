import {
    readData , 
    writeData
} from './Utils/index.js' ;

const main = async () => {

    let urls = await readData() ;
    await writeData(urls) ;

} ; 
main() ;