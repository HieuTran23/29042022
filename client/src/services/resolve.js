export const resolve = async (promise) => {
    const resolved = {
      data: null,
      error: null
    };
  
    try {
      resolved.data = await promise;
    } catch(e) {
      console.log(e)
      resolved.error = e;
    }
  
    return resolved;
  }
  