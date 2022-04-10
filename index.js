import axios from 'axios' ;

import { authentication } from './Auth/auth.js' ;
import {
    WAPPALYZER_API_KEY , 
    SHOPIFY , 
    MAGENTO , 
    BIGCOMMERCE , 
    WOOCOMMERCE , 
    OTHERS , 
    NOT_WORKING,
    SHEETS_ID
} from './Utils/constants.js' ;

/**
 * @description : utility function to convert a given url into proper format
 */

export const getUrl = (url) => {
    if (url.startsWith("https://")) {
        return url ;
    } else {
        return ("https://" + url) ;
    }
}

/**
 *  @description : function to read data from a spreadsheet and categorize them
 */

const main = async () => {

    let urls = [] ; 
    
    try {

        const { sheets } = await authentication() ;

        const { data } = await sheets.spreadsheets.values.get({
            spreadsheetId: SHEETS_ID , 
            range: 'sheet1'
        }) ;

        await sheets.spreadsheets.values.clear({
            spreadsheetId: SHEETS_ID , 
            range: "sheet1"
        }) ;

        for (let i = 0 ; i < data.values.length ; i++) {

            urls[i] = new Array(2) ;

            urls[i][0] = getUrl(data.values[i][0]) ;

            const res = await axios.get(
                `https://api.wappalyzer.com/v2/lookup/?urls=${urls[i][0]}&recursive=false` , 
                {
                    headers : {
                        "x-api-key" : WAPPALYZER_API_KEY
                    }
                }
            ).then(res => res.data[0]) ;

            if (i !== 0 && res.technologies) {

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

            if (i == 0) {
                urls[i][0] = "Websites" ;
                urls[i][1] =  "Categories" ;
            }

            sheets.spreadsheets.values.append({
                spreadsheetId: SHEETS_ID , 
                range: 'sheet1' ,
                valueInputOption: "USER_ENTERED" , 
                resource : {
                    values : [[urls[i][0] , urls[i][1]]]  
                }
            }, (err) => {
                if (err) {
                    console.log(err) ;
                } 
            }) ; 
        }
    } catch (error) {
        console.error(error) ; 
    }
}

main() ;

// import { authentication } from './Auth/auth.js' ;

// const {sheets} = await authentication() ;

// const { data } = await sheets.spreadsheets.values.get({
//     spreadsheetId: SHEETS_ID , 
//     range: 'sheet1'
// }) ;

// for (let i = 0 ; i < 5 ; i++) {
//     data.values[i].push("fuck") ;
// }
// sheets.spreadsheets.values.append({
//     spreadsheetId: SHEETS_ID , 
//     range: 'sheet1' ,
//     valueInputOption: "USER_ENTERED" , 
//     resource : {
//         values : data.values
//     }
// }, (err) => {
//     if (err) {
//         console.log(err) ;
//     } 
// }) ; 