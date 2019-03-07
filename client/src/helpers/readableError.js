const readbleError = error => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    if (error.response.data.errmsg) {
      const { errmsg } = error.response.data;

      if (/email_1 dup key/.test(errmsg)) {
        return "You're already booked! You can check your booking on the main page.";
      }
    } else if (typeof error.response.data.errors === 'object') {
      return "Looks like that email address isn't valid. Did you use a lboro.ac.uk email address?";
    }
    return 'Erm...';
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    return 'Communication error with server.';
  } else {
    // Something happened in setting up the request that triggered an Error
    return "An error occurred. That's all I know really.";
  }
};

export default readbleError;
