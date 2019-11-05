const initialState = {
    article: {},
    sentiment: {},
    entities: {},
    keyPhrases: {}
}

const PASS_ARTICLE = 'PASS_ARTICLE'

export function passArticle(articleObj, sentimentObj, entitiesObj, keyPhrasesObj){
    console.log(articleObj, sentimentObj, entitiesObj, keyPhrasesObj)
    return{
        type: PASS_ARTICLE,
        payload: {
            articleObj,
            sentimentObj,
            entitiesObj,
            keyPhrasesObj
        }
    }
}

export default function chartReducer(state = initialState, action){
    const {type, payload} = action
    switch(type){
        case PASS_ARTICLE:
            const {articleObj, sentimentObj, entitiesObj, keyPhrasesObj} = payload
            return {
                ...state, 
                article: articleObj,
                sentiment: sentimentObj,
                entities: entitiesObj,
                keyPhrases: keyPhrasesObj
            }
        default:
            return state
    }
}