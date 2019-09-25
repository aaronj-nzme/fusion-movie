/*
    The fetch property is an async function that, given a query object, should return JSON. 
    fetch is used as an alternative to resolve when your content source can not be completely derived from a single URL. 
    Starting in fusion release 2.2, all content sources (including those defined as fetch) are cached.
*/

import request from 'request-promise-native'
import { CONTENT_BASE } from 'fusion:environment'
import collectionFeed from './collection-feed'

const options = {
  gzip: true,
  json: true
}

// Add other required fields here which are not present above
const includedFields = [
  'additional_properties',
  'content_elements',
  'first_publish_date',
  'slug',
  'source'
].join()

const fetch = (query) => {
  return request({
    uri: `${CONTENT_BASE}${collectionFeed.resolve(query)}`,
    ...options
  }).then((collectionResp) => {
    const collectionResult = collectionFeed.transform(collectionResp, query)
    const {
      content_elements: contentElements = []
    } = collectionResult
    const ids = contentElements.map(({ _id }) => _id).join()
    const {
      website
    } = query

    return request({
      uri: `${CONTENT_BASE}/content/v4/ids?website=${website}&ids=${ids}&included_fields=${includedFields}`,
      ...options
    }).then((idsResp) => {
      const {
        content_elements: stories = []
      } = idsResp

      if (stories.length) {
        collectionResult.content_elements = collectionResult.content_elements.map((collectionStory) => {
          return {
            ...stories.find(({ _id }) => _id === collectionStory._id),
            ...collectionStory
          }
        })
      }

      return collectionResult
    })
  })
}

export default {
  fetch,
  /*
    schemaName is a string that identifies the name of a GraphQL schema. 
    This schema defines the shape of the JSON returned from the URL we produced in the resolve function. 
    While this schema is not required, it will be more difficult to query for particular values in the returned JSON without it.
  */
  schemaName: collectionFeed.schemaName,
  ttl: collectionFeed.ttl,
  /*
    The params property will contain a list of parameter names and data types that this content source needs to make a request. 
    For example, in this content source we only have 1 param that we can use to make a request: the movieTitle param. 
    Given either of these pieces of data (as part of the query object in our resolve method),
     we are able to craft a URL (in our resolve function) that gets us the data we want 
     (e.g https://www.omdbapi.com/?apikey=<apiKey>&t=Jurassic%20Park will get us the info for the movie Jurassic Park).
  */
  params: collectionFeed.params
  /*
    Another optional parameter that can be provided in the content source object is a transform function. 
    The purpose of this function is to transform the JSON response received from our endpoint, 
    in case you want to change the shape of the data somehow before applying a schema to it.
  */
  transform: (data) => {
    return Object.assign(
      data,
      //The transform function's only input is the data object it receives from the endpoint you defined, 
      // and its only expected output is an object that you want to query against later.
      { numPlotWords: data.Plot ? data.Plot.split(' ').length : 0 }
    )
  }
}