import logging
import json
import azure.functions as func

def main(req: func.HttpRequest,
         inputDocument: func.DocumentList,
         outputDocument: func.Out[func.Document]) -> func.HttpResponse:
    """
    Increment the 'count' field in a Cosmos DB document (id=1, partitionKey=1)
    and return the updated count as JSON.
    """

    logging.info('Python HTTP trigger function processed a request.')

    if not inputDocument or len(inputDocument) == 0:
        return func.HttpResponse(
            "No document found to update!",
            status_code=400
        )

    # Grab the current count and increment
    current_count = inputDocument[0]['count']
    new_count = current_count + 1

    # Update the document
    inputDocument[0]['count'] = new_count

    # Write it back via output binding
    outputDocument.set(func.Document.from_json(inputDocument[0].to_json()))

    # Return JSON
    response_body = {"count": new_count}
    return func.HttpResponse(
        body=json.dumps(response_body),
        status_code=200,
        mimetype="application/json"
    )
