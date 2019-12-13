module.exports = {
  getDataForm(userInfo) {
    return {
      userName: userInfo.userGivenName,
      userEmail: userInfo.userEmail,
      userPassword: userInfo.userPassword,
      termsAndConditions: userInfo.termsAndConditions,
      image: userInfo.image || ''
    };
  }
};
