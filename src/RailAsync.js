import RetailRail from './RetailRailClass';

// ASYNC / AWAIT 

export async function AsyncFetchRail(url) {

    try {
        //  await until fetch has completed to assign the 'response' variable
          const response = await fetch(url)
        // await until response has been parsed into json before assigning tge 'data' variable
          const data = await response.json();
        // return response data
          return data;

      } catch(err) {
        console.log( new Error('Something went wrong with the AsyncFetchRail function call - check that the endpoint is valid', err));
      }
    }
    
    export var asyncRail = AsyncFetchRail('data.json');
    asyncRail.then(function(res) {
    return new RetailRail({
        parentContainer: res[0].parentContainer,
        title: 'This rail was pulled from data.json, using async/await',
        bodyText: res[0].bodyText,
        ctaText: res[0].ctaText,
        ctaHref: res[0].ctaHref,
        extraClasses: ['pink']
      })
    }).catch((err) => {printError(err, 'asyncRail')});

    function printError(err, funcName) {
      console.log(new Error('Something went wrong with the '+ funcName +' function call - check that all params are valid', err))
    }
