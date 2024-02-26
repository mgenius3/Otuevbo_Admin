module.exports = {
  reactStrictMode: false,
  onError: (error) => {
    // Log the error
    console.error('Build error occurred:', error);

    // Return false to continue the build process
    return false;
  },
};
