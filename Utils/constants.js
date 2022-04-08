import dotenv from 'dotenv' ;

dotenv.config() ;

// KEYS AND IDs
export const WAPPALYZER_API_KEY = process.env.WAPPALYZER_API_KEY ;

export const SHEETS_ID = process.env.GOOGLE_SHEETS_ID ;

// SLUGS AND CATEGORIES
export const SHOPIFY = {
    slug : "shopify" ,
    category : "SHOPIFY"
}

export const MAGENTO = {
    slug : "magento" , 
    category : "MAGENTO"
}

export const WOOCOMMERCE = {
    slug : "woocommerce" , 
    category : "WOOCOMMERCE" 
} ;

export const BIGCOMMERCE = {
    slug : "bigcommerce" , 
    category : "BIGCOMMERCE"
} ;

export const OTHERS = {
    slug : "others" ,
    category : "OHTERS" 
} ;

export const NOT_WORKING = {
    slug : 'not-working' ,
    category : 'NOT WORKING'
} ;
