
/** 
 *  HttpErrorResponse(null)
 * 
*   if (username Exists) {
        set HttpErrorResponse("User with the same username already exists")
    }

    if (email Exists) {
        set HttpErrorResponse("User with the same email already exists")
    }
 * 
 *  If (academyName Exists) {
 *      set HttpErrorResponse("Academy name already exists")
 *  }
 * 
 * 
 * if (HttpResponse != Null) {
 *     throw CreateHttpError(409, HttpErrorResponse)
 * }
 *  
 * 
 */