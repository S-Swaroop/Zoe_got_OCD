import axios from 'axios' ;
import { authentication } from '../Auth/auth.js' ;
import {
    WAPPALYZER_API_KEY , 
    SHOPIFY , 
    MAGENTO , 
    BIGCOMMERCE , 
    WOOCOMMERCE , 
    OTHERS , 
    NOT_WORKING,
    SHEETS_ID
} from './constants.js' ;

/**
 * @description : utility function to create an n-dimensional array of given size
 */

const createArray = (row , col) => {
    var arr = new Array(row) ;
    for (var i = 0 ; i < row ; i++) {
        arr[i] = new Array(col) ;
    }
    var h = 0 ;
    for (var i = 0 ; i < col ; i++) {
        for (var j = 0 ; j < col ; j++) {
            arr[i][j] = h++ ;
        }
    }
    return arr ;
}

// const createArray = (length) => {
//     var arr = new Array(length || 0) , i = length ;
//     if (arguments.length > 1) {
//         var args = Array.prototype.slice.call(arguments, 1) ;
//         while(i--) arr[length-1 - i] = createArray.apply(this, args) ;
//     }
//     return arr ;
// }

/**
 * @description : utility function to convert a given url into proper format
 */

const getUrl = (url) => {
    if (url.startsWith("https://")) {
        return url ;
    } else {
        return ("https://" + url) ;
    }
}

/**
 *  @description : function to read data from a spreadsheet
 */

export const readData = async () => {
    let urls ; 
    try {
        const { sheets } = await authentication() ;

        const { data } = await sheets.spreadsheets.values.get({
            spreadsheetId: SHEETS_ID , 
            range: 'sheet1'
        }) ;
        urls = createArray(data.values.length , 2) ;
        for (let i = 1 ; i < data.values.length ; i++) {
            
            urls[i][0] = getUrl(data.values[i][0]) ;

            const res = await axios.get(
                `https://api.wappalyzer.com/v2/lookup/?urls=${urls[i][0]}&recursive=false` , 
                {
                    headers : {
                        "x-api-key" : WAPPALYZER_API_KEY
                    }
                }
            ).then(res => res.data[0]) ;

            if (res.technologies) {
                let found = false ; 
                for (let j = 0 ; j < res.technologies.length ; j++) {
                    switch (res.technologies[j].slug) {
                        case SHOPIFY.slug : {
                            urls[i][1] = SHOPIFY.category ; 
                            found = true ;
                            break ;
                        }
                        case MAGENTO.slug : {
                            urls[i][1] = MAGENTO.category ;
                            found = true ;
                            break ;
                        }
                        case WOOCOMMERCE.slug : {
                            urls[i][1] = WOOCOMMERCE.category ;
                            found = true ;
                            break ;
                        }
                        case BIGCOMMERCE.slug : {
                            urls[i][1] = BIGCOMMERCE.category ;
                            found = true ;
                            break ;
                        }
                        default : {
                            break ;
                        }
                    }
                    if (found) {
                        break ;
                    }
                }
                if (!found) {
                    urls[i][1] = OTHERS.category ; 
                }
            } else {
                urls[i][1] = NOT_WORKING.category ; 
            }
        }
    } catch (error) {
        console.error(error) ; 
    }
    return {
        urls
    }
}

/**
 *  @description : function to write data into a spreadsheet
 */

export const writeData = async (urls) => {
    try {
        console.log(urls) ;
        // urls[0][0] = 'Website' ;
        // urls[0][1] = 'Category' ;
        const { sheets } = await authentication() ;

        await sheets.spreadsheets.values.clear({
            spreadsheetId: SHEETS_ID , 
            range: 'sheet1'
        }) ;

        let resource = {
            values : urls
        } ;
        const data = await sheets.spreadsheets.values.append({
            spreadsheetId: SHEETS_ID , 
            range: 'sheet1' ,
            valueInputOption: "USER_ENTERED" , 
            resource 
        },
        (err, result) => {
            if (err) {
                console.log(err);
                response.end('An error occurd while attempting to save data. See console output.');
            } else {
                const responseText = `${result.data.updates.updatedCells} cells appended.`;
                console.log(responseText);
                response.end(responseText);
            }
        }
        ) ; 
    } catch (error) {
        console.error(error) ; 
    }
}