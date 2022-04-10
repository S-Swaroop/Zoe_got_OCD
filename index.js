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
 * @description : function to write data into a sheet
 */

const writeData = async (data) => {

    const { sheets } = await authentication() ;

    sheets.spreadsheets.values.append({
        spreadsheetId: SHEETS_ID , 
        range: 'sheet2' ,
        valueInputOption: "USER_ENTERED" , 
        resource : {
            values : data
        }
    }, (err) => {
        if (err) {
            console.log(err) ;
        } 
    }) ; 

}

/**
 *  @description : function to read data from a spreadsheet and categorize them
 */

const main = async () => {
    
    try {

        const { sheets } = await authentication() ;

        const { data } = await sheets.spreadsheets.values.get({
            spreadsheetId: SHEETS_ID , 
            range: 'sheet1'
        }) ;

        const len = data.values.length ;

        for (let i = 0 ; i < len ; i++) {

            if (i == 0) {
                data.values[i].push("CATEGORIES") ;
                continue ;
            }

            const res = await axios.get(
                `https://api.wappalyzer.com/v2/lookup/?urls=${getUrl(data.values[i][0])}&recursive=false` , 
                {
                    headers : {
                        "x-api-key" : WAPPALYZER_API_KEY
                    }
                }
            )
            .then(res => res.data[0]) ;

            let category = OTHERS.category ;

            if (i !== 0 && res.technologies) {

                for (let j = 0 ; j < res.technologies.length ; j++) {
                    switch (res.technologies[j].slug) {
                        case SHOPIFY.slug : {
                            category = SHOPIFY.category ;
                            break ;
                        }
                        case MAGENTO.slug : {
                            category = MAGENTO.category ;
                            break ;
                        }
                        case WOOCOMMERCE.slug : {
                            category = WOOCOMMERCE.category ;
                            break ;
                        }
                        case BIGCOMMERCE.slug : {
                            category = BIGCOMMERCE.category ;
                            break ;
                        }
                        default : {
                            break ;
                        }
                    }
                }

                data.values[i].push(category) ;
            
            } else {
            
                data.values[i].push(NOT_WORKING.category) ;
            
            }

            

        }

        await writeData(data.values) ;

    } catch (error) {

        console.error(error) ; 
    
    }
}

main() ;
