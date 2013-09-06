## Errors

SODA 2.0 follows the HTTP and REST standards for returning error codes, and in addition has a standard structure to return
additional error responses. The breakdown of error codes is:

|Code|Explaination|
|---|---|
|200 - 299|The request was successful (or at least did not fail yet).|
|300 - 399|The request requires the client to do additional work (like follow a redirect).|
|400 - 499|The request failed because there was something wrong with the request. There is probably a bug in your code.|
|500 - 599|The request failed because there is a problem on the server. There is probably a bug in Socrata's code.|

Each error will have a consistent error body returned with it. This error body contains the following fields:

|Field|Explaination|
|---|---|
|code|Canonical error definition used by API implementations to distinguish errors at a finer level than HTTP codes.|
|message|An error message in the language specified by the request’s Accept-Language header, or in English if we don’t have a translation for that language.|
|data|Data specific to the context of this error. This data may be a JSON structure instead of simply a string based on the errorCode field. This may be useful for displaying to the user or for intelligent agent recovery from an error.|

An example of a JSON error response would be:

    {
    "code" : "query.execution.queryTooComplex",
    "error" : true,
    "message" : "Only simple comparison filters are allowed",
    "data" : {
        "reason" : "validation.complex-filter"
        }
    }


