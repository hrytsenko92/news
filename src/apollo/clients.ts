import {ApolloClient, InMemoryCache} from '@apollo/client'

export const clientNews = new ApolloClient({
    uri: '',
    cache: new InMemoryCache(),
})

export const clientWeather = new ApolloClient({
    uri: '',
    cache: new InMemoryCache(),
})

export const clientCurrency = new ApolloClient({
    uri: '',
    cache: new InMemoryCache(),
})

export const clientRecipe = new ApolloClient({
    uri: '',
    cache: new InMemoryCache(),
})

export const clientHistoryFacts = new ApolloClient({
    uri: '',
    cache: new InMemoryCache(),
})

